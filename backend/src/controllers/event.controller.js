import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { CustomError } from "../utils/custom.error.js";
import { HttpResponseBuilder } from "../utils/response.builder.js";
import { eventSchema } from "../validators/event.validator.js";

export default class EventController {
  constructor(eventService) {
    this.eventService = eventService;
  }

  async fetchEvents(req, res, next) {
    try {
      const profileId = req.params.profileId;
      if (!profileId) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          MESSAGES.BAD_REQUEST,
        );
      }
      const timezone = req.query.timezone || "";
      const events = await this.eventService.fetchEvents(profileId, timezone);
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.EVENT.FETCHED_EVENTS,
        events,
      );
    } catch (e) {
      next(e);
    }
  }

  async createEvent(req, res, next) {
    try {
      const result = eventSchema.safeParse(req.body);
      if (!result.success) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          result.error.issues[0].message,
        );
      }
      const newEvent = await this.eventService.createEvent(result.data);
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.EVENT.CREATED,
        newEvent,
      );
    } catch (e) {
      next(e);
    }
  }

  async updateEvent(req, res, next) {
    try {
      const eventId = req.params.eventId;
      if (!eventId) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          MESSAGES.BAD_REQUEST,
        );
      }
      const result = eventSchema.safeParse(req.body);
      if (!result.success) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          result.error.issues[0].message,
        );
      }
      const updatedEvent = await this.eventService.updateEvent(
        eventId,
        result.data,
      );
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.EVENT.UPDATED,
        updatedEvent,
      );
    } catch (e) {
      next(e);
    }
  }

  async fetchEventLogs(req, res, next) {
    try {
      const eventId = req.params.eventId;
      if (!eventId) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          MESSAGES.BAD_REQUEST,
        );
      }
      const logs = await this.eventService.fetchEventLogs(eventId);
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.EVENT.FETCHED_EVENT_LOGS,
        logs,
      );
    } catch (e) {
      next(e);
    }
  }
}
