import profileModel from "../models/profile.model.js";

export default class ProfileRepository {
  constructor() {}

  async fetchProfiles() {
    const profileDocs = await profileModel.find();
    const profiles = profileDocs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
    }));
    return profiles;
  }

  async createProfile(name) {
    const newProfileDOc = await profileModel.create({
      name,
    });
    const newProfile = {
      id: newProfileDOc._id.toString(),
      name: newProfileDOc.name,
      createdAt: newProfileDOc.createdAt,
    };
    return newProfile;
  }
}
