import express from "express";
import { ROUTES } from "../constants/routes.js";
import { injectedEventController } from "../di/event.di.js";

export default class EventRoute {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.get(ROUTES.EVENT.GET_EVENTS, (req, res, next) => {
      injectedEventController.fetchEvents(req, res, next);
    });

    this.router.get(ROUTES.EVENT.GET_EVENT_LOGS, (req, res, next) => {
      injectedEventController.fetchEventLogs(req, res, next);
    });

    this.router.post(ROUTES.EVENT.CREATE, (req, res, next) => {
      injectedEventController.createEvent(req, res, next);
    });

    this.router.patch(ROUTES.EVENT.UPDATE, (req, res, next) => {
      injectedEventController.updateEvent(req, res, next);
    });
  }
}
