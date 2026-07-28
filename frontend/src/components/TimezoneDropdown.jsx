import { useEffect, useState } from "react";
import "./TimezoneDropdown.css";
import { LuChevronsUpDown } from "react-icons/lu";
import { TIMEZONES } from "../constants/timezones";
import { FiSearch } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

function TimezoneDropdown({ selectedTimezone, setSelectedTimezone }) {
  const [selectedTimezoneLabel, setSelectedTimezoneLabel] = useState(
    TIMEZONES.find((tz) => tz.value === selectedTimezone)?.label || "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tzones, setTzones] = useState(TIMEZONES);

  useEffect(() => {
    function setLabel() {
      if (selectedTimezone) {
        setSelectedTimezoneLabel(
          TIMEZONES.find((tz) => tz.value === selectedTimezone)?.label,
        );
      }
    }
    setLabel();
  }, [selectedTimezone]);

  useEffect(() => {
    function filterTimezones() {
      const regExp = new RegExp(search, "i");
      const filteredTzones = TIMEZONES.filter((tz) => regExp.test(tz.label));
      setTzones(filteredTzones);
    }
    filterTimezones();
  }, [search]);
  return (
    <div
      className="timezone-dropdown__input"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {selectedTimezone ? (
        selectedTimezoneLabel
      ) : (
        <p className="timezone-dropdown__placeholder">Select timezone...</p>
      )}
      <div className="timezone-dropdown__icon">
        <LuChevronsUpDown />
      </div>
      {isOpen && (
        <div
          className="timezone-dropdown__container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="timezone-dropdown__search-bar flex flex-row">
            <div className="timezone-dropdown__option-icon">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search timezone..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="timezone-dropdown__options">
            {tzones.length === 0 && (
              <p className="timezone-dropdown__no-profiles">
                No timezone found.
              </p>
            )}
            {tzones.map((tz) => (
              <div
                className="timezone-dropdown__option flex flex-row items-center"
                key={tz.value}
                onClick={() => {
                  setSelectedTimezone(tz.value);
                  setIsOpen(false);
                }}
              >
                <div className="timezone-dropdown__option-icon">
                  {selectedTimezone === tz.value && <IoMdCheckmark />}
                </div>
                {tz.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimezoneDropdown;
