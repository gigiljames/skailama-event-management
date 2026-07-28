import "./EditEventModal.css";
import EventForm from "./EventForm";
import { IoCloseOutline } from "react-icons/io5";

function EditEventModal({ event, setIsEditOpen }) {
  return (
    <div className="edit-event-modal__container flex items-center justify-center">
      <div className="edit-event-modal__inner-container flex flex-col">
        <IoCloseOutline
          onClick={() => setIsEditOpen(false)}
          className="edit-event-modal__close-icon"
        />
        <h3>Edit Event</h3>
        <EventForm mode={"edit"} event={event} setIsOpen={setIsEditOpen} />
      </div>
    </div>
  );
}

export default EditEventModal;
