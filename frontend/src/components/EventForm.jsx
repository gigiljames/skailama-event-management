import { useEffect, useState } from "react";
import "./EventForm.css";
import ProfileDropdown from "./ProfileDropdown.jsx";
import TimezoneDropdown from "./TimezoneDropdown";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { createEvent, updateEvent } from "../services/eventService.js";
import toast from "react-hot-toast";
import { TIMEZONES } from "../constants/timezones.js";

function EventForm({ mode, event, setIsOpen }) {
  const [selectedProfiles, setSelectedProfile] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONES[0].value);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    function setEvent() {
      if (event) {
        const timezone = event.timezone;
        const startAt = dayjs(event.startAt).tz(timezone);
        const endAt = dayjs(event.endAt).tz(timezone);
        const SDate = startAt.format("YYYY-MM-DD");
        const STime = startAt.format("HH:mm");
        const EDate = endAt.format("YYYY-MM-DD");
        const ETime = endAt.format("HH:mm");
        setSelectedProfile(event.profiles.map((profile) => profile.id));
        setSelectedTimezone(timezone);
        setStartDate(SDate);
        setStartTime(STime);
        setEndDate(EDate);
        setEndTime(ETime);
      }
    }
    setEvent();
  }, [event]);

  function handleSubmit() {
    const eventData = {
      profiles: selectedProfiles,
      timezone: selectedTimezone,
      startAt: new Date(`${startDate}T${startTime}`),
      endAt: new Date(`${endDate}T${endTime}`),
    };
    if (mode === "create") {
      createEvent(eventData).then((response) => {
        if (response.success) {
          toast.success(response.message);
          setSelectedProfile([]);
          setSelectedTimezone(TIMEZONES[0].value);
          setStartDate("");
          setStartTime("");
          setEndDate("");
          setEndTime("");
        } else {
          toast.error(response.message);
        }
      });
    } else if (mode === "edit") {
      console.log(event);
      updateEvent(event.id, eventData).then((response) => {
        if (response.success) {
          toast.success(response.message);
          setSelectedProfile([]);
          setSelectedTimezone(TIMEZONES[0].value);
          setStartDate("");
          setStartTime("");
          setEndDate("");
          setEndTime("");
          setIsOpen(false);
        } else {
          toast.error(response.message);
        }
      });
    }
  }
  return (
    <>
      <div className="event-form">
        <label className="event-form__input-label">
          <span>Profiles</span>
          <ProfileDropdown
            selectedProfiles={selectedProfiles}
            setSelectedProfile={setSelectedProfile}
          />
        </label>
        <label className="event-form__input-label">
          <span>Timezone</span>
          <TimezoneDropdown
            selectedTimezone={selectedTimezone}
            setSelectedTimezone={setSelectedTimezone}
          />
        </label>
        <label className="event-form__input-label">
          <span>Start Date & Time</span>
          <div className="flex event-form__date-time">
            <input
              type="date"
              placeholder="Select profiles"
              className="event-form__input event-form__date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={dayjs().format("YYYY-MM-DD")}
            />
            <div className="event-form__time-input">
              <input
                type="time"
                placeholder="Select profiles"
                className="event-form__input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
        </label>
        <label className="event-form__input-label">
          <span>End Date & Time</span>
          <div className="flex event-form__date-time">
            <input
              type="date"
              placeholder="Select profiles"
              className="event-form__input event-form__date-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || dayjs().format("YYYY-MM-DD")}
            />
            <div className="event-form__time-input">
              <input
                type="time"
                placeholder="Select profiles"
                className="event-form__input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </label>
        <button className="event-form__button" onClick={handleSubmit}>
          {mode === "create" && <>Create Event</>}
          {mode === "edit" && "Update Event"}
        </button>
      </div>
    </>
  );
}

export default EventForm;
