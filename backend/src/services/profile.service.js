export default class ProfileService {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async createProfile(name) {
    const newProfile = await this.profileRepository.createProfile(name);
    return newProfile;
  }

  async fetchProfiles() {
    const profiles = await this.profileRepository.fetchProfiles();
    return profiles;
  }
}
