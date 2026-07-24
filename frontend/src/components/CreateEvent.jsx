import "./CreateEvent.css";
import EventForm from "./EventForm";

function CreateEvent() {
  return (
    <>
      <div className="create-event__container">
        <div className="create-event-inner__container">
          <h3>Create Event</h3>
          <EventForm mode={"create"} />
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
