import EventCard from "./EventCard";
import "./Events.css";

function Events() {
  const event = {
    profiles: ["user1", "user2"],
    startAt: new Date(),
  };
  return (
    <>
      <div className="events__container">
        <div className="events__inner-container">
          <h3>Events</h3>
          <label htmlFor="profile-input" className="events__input-label">
            View in Timezone
            <input
              type="text"
              id="profile-input"
              placeholder="Select profiles"
              className="events__input"
            />
          </label>
          <div className="events__event-container">
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
