import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  nameIdMap: {},
  currentProfile: "",
};

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setProfiles(state, action) {
      const profiles = action.payload;
      state.profiles = profiles;
      for (const val of profiles) {
        state.nameIdMap[val.id] = val.name;
      }
    },
    addProfile(state, action) {
      const profile = action.payload;
      state.profiles.push(profile);
      state.nameIdMap[profile.id] = profile.name;
    },
    setCurrentProfile(state, action) {
      state.currentProfile = action.payload;
    },
  },
});

export const { setProfiles, addProfile, setCurrentProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
