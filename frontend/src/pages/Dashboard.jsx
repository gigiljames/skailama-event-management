import { useEffect, useState } from "react";
import CreateEvent from "../components/CreateEvent";
import Events from "../components/Events";
import "./Dashboard.css";
import { getProfiles } from "../services/profileService.js";
import { useDispatch, useSelector } from "react-redux";
import { setProfiles, setCurrentProfile } from "../state/profileSlice.js";
import ProfileDropdown from "../components/ProfileDropdown.jsx";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    getProfiles().then((response) => {
      dispatch(setProfiles(response.data));
      console.log(response.data);
    });
  }, [dispatch]);
  const currentProfile = useSelector((state) => state.profiles.currentProfile);
  const setSelectedProfile = (value) => {
    dispatch(setCurrentProfile(value));
  };

  return (
    <>
      <div className="dashboard__main-container flex flex-col">
        <div className="dashboard__heading-container flex">
          <div className="dashboard__heading-text flex flex-col">
            <h1 className="dashboard__main-heading">Event Management</h1>
            <h3 className="dashboard__subheading">
              Create and manage events across multiple timezones
            </h3>
          </div>
          <div className="dashboard__heading-action">
            <ProfileDropdown
              selectedProfiles={currentProfile}
              setSelectedProfile={setSelectedProfile}
              multiselect={false}
            />
          </div>
        </div>
        <section className="dashboard__main-section flex">
          <CreateEvent />
          <Events />
        </section>
      </div>
    </>
  );
}

export default Dashboard;
