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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [eventsReload, setEventsReload] = useState(0);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONES[0].value);
  const currentProfile = useSelector((state) => state.profiles.currentProfile);
  useEffect(() => {
    function fetchEvents() {
      if (currentProfile) {
        getEvents(currentProfile)
          .then((response) => {
            if (response.success) {
              setEvents(response.data);
            } else {
              toast.error(response.message);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong.");
          });
      }
    }
    fetchEvents();
  }, [currentProfile, selectedTimezone, eventsReload]);

  return (
    <>
      {isEditOpen && (
        <EditEventModal
          event={event}
          setIsEditOpen={setIsEditOpen}
          setEventsReload={setEventsReload}
        />
      )}
      {isLogsOpen && event && (
        <LogsModal
          eventId={event.id}
          setIsLogsOpen={setIsLogsOpen}
          timezone={selectedTimezone}
        />
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
                timezone={selectedTimezone}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
