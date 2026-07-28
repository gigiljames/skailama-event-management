import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { CustomError } from "../utils/custom.error.js";
import { HttpResponseBuilder } from "../utils/response.builder.js";

export default class ProfileController {
  constructor(profileService) {
    this.profileService = profileService;
  }

  async fetchProfiles(req, res, next) {
    try {
      const profiles = await this.profileService.fetchProfiles();
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.PROFILE.FETCHED,
        profiles,
      );
    } catch (e) {
      next(e);
    }
  }

  async createProfile(req, res, next) {
    try {
      const name = req.body.name;
      if (!name || !name.trim()) {
        throw new CustomError(
          HTTP_STATUS_CODES.BAD_REQUEST,
          MESSAGES.BAD_REQUEST,
        );
      }
      const newProfile = await this.profileService.createProfile(name);
      HttpResponseBuilder.buildSuccessResponse(
        req,
        res,
        HTTP_STATUS_CODES.OK,
        MESSAGES.PROFILE.CREATED,
        newProfile,
      );
    } catch (e) {
      next(e);
    }
  }
}
