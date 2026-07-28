import ProfileController from "../controllers/profile.controller.js";
import ProfileRepository from "../repositories/profile.repo.js";
import ProfileService from "../services/profile.service.js";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);

export const injectedProfileController = new ProfileController(profileService);
