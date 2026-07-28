import { useEffect, useState } from "react";
import "./ProfileDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { LuChevronsUpDown } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { createProfile } from "../services/profileService.js";
import { addProfile } from "../state/profileSlice.js";

function ProfileDropdown({
  selectedProfiles,
  setSelectedProfile,
  multiselect = true,
}) {
  const { profiles, nameIdMap } = useSelector((state) => state.profiles);
  const [localProfiles, setLocalProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileName, setProfileName] = useState("");
  const dispatch = useDispatch();

  function handleAddProfile() {
    if (profileName && profileName.trim()) {
      createProfile(profileName).then((response) => {
        if (response.success) {
          const profile = response.data;
          dispatch(addProfile({ id: profile.id, name: profile.name }));
          setIsAddOpen(false);
          setProfileName("");
        }
      });
    }
  }

  useEffect(() => {
    function handleSearch() {
      setLocalProfiles(
        profiles.filter((profile) => profile.name.includes(search)),
      );
    }
    handleSearch();
  }, [search, profiles]);
  return (
    <>
      <div
        className="profile-dropdown__input"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setSearch("");
        }}
      >
        {" "}
        {!multiselect &&
          (selectedProfiles ? (
            nameIdMap[selectedProfiles]
          ) : (
            <p className="profile-dropdown__placeholder">
              Select current profile...
            </p>
          ))}
        {multiselect &&
          (selectedProfiles.length === 0 ? (
            <p className="profile-dropdown__placeholder">Select profiles...</p>
          ) : selectedProfiles.length === 1 ? (
            `${nameIdMap[selectedProfiles[0]]}`
          ) : (
            `${selectedProfiles.length} profiles selected`
          ))}
        <div className="profile-dropdown__icon">
          <LuChevronsUpDown />
        </div>
        {isOpen && (
          <div
            className="profile-dropdown__container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-dropdown__search-bar flex flex-row">
              <div className="profile-dropdown__option-icon">
                <FiSearch />
              </div>
              <input
                type="text"
                placeholder={
                  multiselect
                    ? "Search profiles..."
                    : "Search current profile..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="profile-dropdown__options">
              {localProfiles.length === 0 && (
                <p className="profile-dropdown__no-profiles">
                  No profile found.
                </p>
              )}
              {localProfiles.map((profile) => (
                <div
                  className="profile-dropdown__option flex flex-row items-center"
                  onClick={() => {
                    if (!multiselect) {
                      setSelectedProfile(profile.id);
                      setIsOpen(false);
                      return;
                    }
                    setSelectedProfile((state) => {
                      const temp = [...state];
                      let index = -1;
                      for (let i = 0; i < temp.length; i++) {
                        if (temp[i] === profile.id) {
                          index = i;
                        }
                      }
                      if (index === -1) {
                        temp.push(profile.id);
                      } else {
                        temp.splice(index, 1);
                      }
                      return temp;
                    });
                  }}
                >
                  <div className="profile-dropdown__option-icon">
                    {selectedProfiles.includes(profile.id) && <IoMdCheckmark />}
                  </div>
                  {profile.name}
                </div>
              ))}
            </div>
            <div className="flex">
              {isAddOpen ? (
                <>
                  <input
                    type="text"
                    placeholder="Profile name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <button onClick={handleAddProfile}>Add</button>
                </>
              ) : (
                <button onClick={() => setIsAddOpen(true)}>Add profile</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileDropdown;
