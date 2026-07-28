import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { CustomError } from "../utils/custom.error.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

function validateStartEndTime(startAt, endAt) {
  const current = dayjs();
  // if (dayjs(startAt).isBefore(current)) {
  //   throw new CustomError(
  //     HTTP_STATUS_CODES.BAD_REQUEST,
  //     MESSAGES.EVENT.START_TIME_IN_PAST,
  //   );
  // }
  // if (dayjs(endAt).isBefore(current)) {
  //   throw new CustomError(
  //     HTTP_STATUS_CODES.BAD_REQUEST,
  //     MESSAGES.EVENT.END_TIME_IN_PAST,
  //   );
  // }
  if (!dayjs(endAt).isAfter(dayjs(startAt))) {
    throw new CustomError(
      HTTP_STATUS_CODES.BAD_REQUEST,
      MESSAGES.EVENT.END_BEFORE_START,
    );
  }
}

export default class EventService {
  constructor(eventRepository, logRepository) {
    this.eventRepository = eventRepository;
    this.logRepository = logRepository;
  }

  async fetchEvents(profileId, timezone) {
    const events = await this.eventRepository.fetchEvents(profileId, timezone);
    return events;
  }

  async createEvent(event) {
    validateStartEndTime(event.startAt, event.endAt);
    const newEvent = await this.eventRepository.createEvent(event);
    await this.logRepository.addLog({
      eventId: newEvent.id,
      message: "Event created.",
    });
    return newEvent;
  }

  async updateEvent(eventId, event) {
    validateStartEndTime(event.startAt, event.endAt);
    const existingEvent = await this.eventRepository.fetchEvent(eventId);
    if (!existingEvent) {
      throw new CustomError(
        HTTP_STATUS_CODES.NOT_FOUND,
        MESSAGES.EVENT.NOT_FOUND,
      );
    }
    const updatedEvent = await this.eventRepository.updateEvent(eventId, event);
    let existingProfiles = [...existingEvent.profiles];
    let newProfiles = [...updatedEvent.profiles];
    existingProfiles.sort((a, b) => a.id.localeCompare(b.id));
    newProfiles.sort((a, b) => a.id.localeCompare(b.id));
    let changes = "";
    if (existingProfiles.length !== newProfiles.length) {
      changes += `Profiles changed: ([${existingEvent.profiles.map((p) => p.name).join(", ")}] -> [${updatedEvent.profiles.map((p) => p.name).join(", ")}])\n`;
    } else {
      let changed = false;
      for (let i = 0; i < existingProfiles.length; i++) {
        if (existingProfiles[i].id !== newProfiles[i].id) {
          changed = true;
          break;
        }
      }
      if (changed) {
        changes += `Profiles changed: ([${existingEvent.profiles.map((p) => p.name).join(", ")}] -> [${updatedEvent.profiles.map((p) => p.name).join(", ")}])\n`;
      }
    }
    if (updatedEvent.timezone !== existingEvent.timezone) {
      changes += `Timezone changed: (${existingEvent.timezone} -> ${updatedEvent.timezone})\n`;
    }
    const oldStartAt = dayjs(existingEvent.startAt);
    const newStartAt = dayjs(updatedEvent.startAt);
    const oldEndAt = dayjs(existingEvent.endAt);
    const newEndAt = dayjs(updatedEvent.endAt);
    if (newStartAt.valueOf() !== oldStartAt.valueOf()) {
      changes += `Start time changed: (${oldStartAt.tz(existingEvent.timezone).format("MMM D, YYYY [at] hh:mm A")} -> ${newStartAt.tz(updatedEvent.timezone).format("MMM D, YYYY [at] hh:mm A")})\n`;
    }
    if (newEndAt.valueOf() !== oldEndAt.valueOf()) {
      changes += `End time changed: (${oldEndAt.tz(existingEvent.timezone).format("MMM D, YYYY [at] hh:mm A")} -> ${newEndAt.tz(updatedEvent.timezone).format("MMM D, YYYY [at] hh:mm A")})\n`;
    }
    if (changes) {
      await this.logRepository.addLog({
        eventId: updatedEvent.id,
        message: changes,
      });
    }
    return updatedEvent;
  }

  async fetchEventLogs(eventId) {
    const logs = await this.logRepository.fetchEventLogs(eventId);
    return logs;
  }
}
