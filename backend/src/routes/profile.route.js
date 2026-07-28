import express from "express";
import { ROUTES } from "../constants/routes.js";
import { injectedProfileController } from "../di/profile.di.js";

export default class ProfileRoute {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.post(ROUTES.PROFILE.CREATE, (req, res, next) => {
      injectedProfileController.createProfile(req, res, next);
    });

    this.router.get(ROUTES.PROFILE.GET_PROFILES, (req, res, next) => {
      injectedProfileController.fetchProfiles(req, res, next);
    });
  }
}
