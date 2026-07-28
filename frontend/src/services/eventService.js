import { ROUTES } from "../constants/routes.js";
import axiosInstance from "./axios.js";

export const createEvent = async (event) => {
  const response = await axiosInstance.post(ROUTES.EVENT.CREATE, event);
  return response.data;
};

export const getEvents = async (profileId) => {
  const response = await axiosInstance.get(
    `${ROUTES.EVENT.GET_EVENTS.replace(":profileId", profileId)}`,
  );
  return response.data;
};

export const updateEvent = async (eventId, event) => {
  const response = await axiosInstance.patch(
    ROUTES.EVENT.UPDATE.replace(":eventId", eventId),
    event,
  );
  return response.data;
};

export const getEventLogs = async (eventId) => {
  const response = await axiosInstance.get(
    ROUTES.EVENT.GET_EVENT_LOGS.replace(":eventId", eventId),
  );
  return response.data;
};
