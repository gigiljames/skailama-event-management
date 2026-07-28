import EventController from "../controllers/event.controller.js";
import EventRepository from "../repositories/event.repo.js";
import LogRepository from "../repositories/log.repo.js";
import EventService from "../services/event.service.js";

const eventRepository = new EventRepository();
const logRepository = new LogRepository();
const eventService = new EventService(eventRepository, logRepository);

export const injectedEventController = new EventController(eventService);
