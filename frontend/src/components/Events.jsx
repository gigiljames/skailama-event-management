import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./Events.css";
import TimezoneDropdown from "./TimezoneDropdown";
import LogsModal from "./LogsModal";
import EditEventModal from "./EditEventModal";
import { useSelector } from "react-redux";
import { getEvents } from "../services/eventService.js";
import toast from "react-hot-toast";
import { TIMEZONES } from "../constants/timezones.js";

function Events() {
  // const ev = {
  //   id: 1,
  //   profiles: [
  //     { id: 1, name: "User1" },
  //     { id: 2, name: "User2" },
  //   ],
  //   timezone: "Asia/Kolkata",
  //   startAt: new Date(),
  //   endAt: new Date(),
  //   createdAt: new Date(),
  //   updatesAt: new Date(),
  // };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONES[0].value);
  const currentProfile = useSelector((state) => state.profiles.currentProfile);
  useEffect(() => {
    function fetchEvents() {
      if (currentProfile && selectedTimezone) {
        getEvents(currentProfile, selectedTimezone)
          .then((response) => {
            if (response.success) {
              setEvents(response.data);
            }
          })
          .catch((e) => {
            console.log(e);
            toast.error("An unexpected error occured.");
          });
      }
    }
    fetchEvents();
  }, [currentProfile, selectedTimezone]);

  return (
    <>
      {isEditOpen && (
        <EditEventModal event={event} setIsEditOpen={setIsEditOpen} />
      )}
      {isLogsOpen && event && (
        <LogsModal eventId={event.id} setIsLogsOpen={setIsLogsOpen} />
      )}
      <div className="events__container">
        <div className="events__inner-container flex flex-col">
          <h3>Events</h3>
          <label htmlFor="profile-input" className="events__input-label">
            <span>View in Timezone</span>
            <TimezoneDropdown
              selectedTimezone={selectedTimezone}
              setSelectedTimezone={setSelectedTimezone}
            />
          </label>
          <div className="events__event-container flex flex-col">
            {events.length === 0 && <p>No events found</p>}
            {events.map((ev) => (
              <EventCard
                event={ev}
                setIsEditOpen={setIsEditOpen}
                setIsLogsOpen={setIsLogsOpen}
                setEvent={setEvent}
                key={ev.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
