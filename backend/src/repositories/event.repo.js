import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import eventModel from "../models/event.model.js";
import { CustomError } from "../utils/custom.error.js";

export default class EventRepository {
  constructor() {}

  async fetchEvents(profileId, timezone) {
    const query = { profiles: profileId };
    if (timezone) {
      query.timezone = timezone;
    }
    const eventDocs = await eventModel.find(query).populate("profiles");
    const events = eventDocs.map((doc) => ({
      id: doc._id.toString(),
      profiles: doc.profiles.map((pDoc) => ({
        id: pDoc._id.toString(),
        name: pDoc.name,
      })),
      timezone: doc.timezone,
      startAt: doc.startAt,
      endAt: doc.endAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
    return events;
  }

  async fetchEvent(eventId) {
    const eventDoc = await eventModel.findById(eventId).populate("profiles");
    if (!eventDoc) {
      throw new CustomError(
        HTTP_STATUS_CODES.NOT_FOUND,
        MESSAGES.EVENT.NOT_FOUND,
      );
    }
    const event = {
      id: eventDoc._id.toString(),
      profiles: eventDoc.profiles.map((pDoc) => ({
        id: pDoc._id.toString(),
        name: pDoc.name,
      })),
      timezone: eventDoc.timezone,
      startAt: eventDoc.startAt,
      endAt: eventDoc.endAt,
      createdAt: eventDoc.createdAt,
      updatedAt: eventDoc.updatedAt,
    };
    return event;
  }

  async createEvent(event) {
    const newEventDoc = await eventModel.create({
      profiles: event.profiles,
      timezone: event.timezone,
      startAt: event.startAt,
      endAt: event.endAt,
    });
    await newEventDoc.populate("profiles");
    const newEvent = {
      id: newEventDoc._id.toString(),
      profiles: newEventDoc.profiles.map((pDoc) => ({
        id: pDoc._id.toString(),
        name: pDoc.name,
      })),
      timezone: newEventDoc.timezone,
      startAt: newEventDoc.startAt,
      endAt: newEventDoc.endAt,
      createdAt: newEventDoc.createdAt,
      updatedAt: newEventDoc.updatedAt,
    };
    return newEvent;
  }

  async updateEvent(eventId, event) {
    const updatedEventDoc = await eventModel.findByIdAndUpdate(
      eventId,
      {
        profiles: event.profiles,
        timezone: event.timezone,
        startAt: event.startAt,
        endAt: event.endAt,
      },
      { returnDocument: "after" },
    );
    if (!updatedEventDoc) {
      throw new CustomError(
        HTTP_STATUS_CODES.NOT_FOUND,
        MESSAGES.EVENT.NOT_FOUND,
      );
    }
    await updatedEventDoc.populate("profiles");
    const updatedEvent = {
      id: updatedEventDoc._id.toString(),
      profiles: updatedEventDoc.profiles.map((pDoc) => ({
        id: pDoc._id.toString(),
        name: pDoc.name,
      })),
      timezone: updatedEventDoc.timezone,
      startAt: updatedEventDoc.startAt,
      endAt: updatedEventDoc.endAt,
      createdAt: updatedEventDoc.createdAt,
      updatedAt: updatedEventDoc.updatedAt,
    };
    return updatedEvent;
  }
}
