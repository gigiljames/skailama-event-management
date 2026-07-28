import { ROUTES } from "../constants/routes.js";
import axiosInstance from "./axios.js";

export const getProfiles = async () => {
  const response = await axiosInstance.get(ROUTES.PROFILE.GET_PROFILES);
  return response.data;
};

export const createProfile = async (name) => {
  const response = await axiosInstance.post(ROUTES.PROFILE.CREATE, { name });
  return response.data;
};
