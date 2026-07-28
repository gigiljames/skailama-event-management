import "./EventCard.css";
import { LuUsers, LuCalendar, LuClock4 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

function EventCard({
  event,
  setIsEditOpen,
  setIsLogsOpen,
  setEvent,
  timezone,
}) {
  return (
    <>
      <div className="event-card__container flex flex-col">
        <div className="flex items-center event-card__profiles">
          <div className="event-card__user-icon">
            <LuUsers />
          </div>
          <p className="">
            {event.profiles.map((profile) => profile.name).join(", ")}
          </p>
        </div>
        <div className="event-card__row flex items-center">
          <div className="event-card__calendar-icon">
            <LuCalendar />
          </div>
          <div className="flex flex-col event-card__date-group">
            <p className="event-card__date">
              Start: {dayjs(event.startAt).tz(timezone).format("MMM D, YYYY")}
            </p>
            <p className="event-card__time flex items-center">
              <div className="event-card__time-icon">
                <LuClock4 />
              </div>
              {dayjs(event.startAt).tz(timezone).format("hh:mm A")}
            </p>
          </div>
        </div>
        <div className="event-card__row flex">
          <div className="event-card__calendar-icon">
            <LuCalendar />
          </div>
          <div className="flex flex-col event-card__date-group">
            <p className="event-card__date">
              Start: {dayjs(event.endAt).tz(timezone).format("MMM D, YYYY")}
            </p>
            <p className="event-card__time flex items-center">
              <div className="event-card__time-icon">
                <LuClock4 />
              </div>
              {dayjs(event.endAt).tz(timezone).format("hh:mm A")}
            </p>
          </div>
        </div>
        <div className="event-card__hr"></div>
        <div className="event-card__info-group flex flex-col">
          <p>
            Created:{" "}
            {dayjs(event.createdAt)
              .tz(timezone)
              .format("MMM D, YYYY [at] hh:mm A")}
          </p>
          <p>
            Updated:{" "}
            {dayjs(event.updatedAt)
              .tz(timezone)
              .format("MMM D, YYYY [at] hh:mm A")}
          </p>
        </div>
        <div className="event-card__hr"></div>
        <div className="event-card__button-group flex">
          <button
            className="flex justify-center items-center"
            onClick={() => {
              setIsEditOpen(true);
              setEvent(event);
            }}
          >
            <div className="event-card__icon-container">
              <FiEdit />
            </div>
            Edit
          </button>
          <button
            className="flex justify-center items-center"
            onClick={() => {
              setIsLogsOpen(true);
              setEvent(event);
            }}
          >
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
