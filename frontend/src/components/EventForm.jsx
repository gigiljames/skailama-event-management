import "./EventForm.css";

function EventForm({ mode }) {
  return (
    <>
      <form className="event-form">
        <label htmlFor="profile-input" className="event-form__input-label">
          Profiles
          <input
            type="text"
            id="profile-input"
            placeholder="Select profiles"
            className="event-form__input"
          />
        </label>
        <label htmlFor="profile-input" className="event-form__input-label">
          Timezone
          <input
            type="text"
            id="profile-input"
            placeholder="Select profiles"
            className="event-form__input"
          />
        </label>
        <label htmlFor="profile-input" className="event-form__input-label">
          Start Date & Time
          <input
            type="text"
            id="profile-input"
            placeholder="Select profiles"
            className="event-form__input"
          />
        </label>
        <label htmlFor="profile-input" className="event-form__input-label">
          End Date & Time
          <input
            type="text"
            id="profile-input"
            placeholder="Select profiles"
            className="event-form__input"
          />
        </label>
        <button className="event-form__button">
          {mode === "create" && <>Create Event</>}
          {mode === "edit" && ""}
        </button>
      </form>
    </>
  );
}

export default EventForm;
