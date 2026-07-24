import "./EventCard.css";
import { LuUsers, LuCalendar, LuClock4 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

function EventCard({ event }) {
  return (
    <>
      <div className="event-card__container">
        <div>
          <div className="event-card__icon-container">
            <LuUsers className="event-card__user-icon" />
          </div>
        </div>
        <div>
          <div className="event-card__icon-container">
            <LuCalendar />
          </div>
          <div>
            <LuClock4 />
          </div>
        </div>
        <div className="event-card__button-group flex">
          <button className="flex justify-center items-center">
            <div className="event-card__icon-container">
              <FiEdit />
            </div>
            Edit
          </button>
          <button className="flex justify-center items-center">
            <div className="event-card__icon-container">
              <FiFileText />
            </div>
            View Logs
          </button>
        </div>
      </div>
    </>
  );
}

export default EventCard;
