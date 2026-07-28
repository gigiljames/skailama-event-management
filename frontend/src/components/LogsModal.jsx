import { IoCloseOutline } from "react-icons/io5";
import "./LogsModal.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEventLogs } from "../services/eventService.js";
import toast from "react-hot-toast";
import { LuClock4 } from "react-icons/lu";

function LogsModal({ eventId, setIsLogsOpen }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getEventLogs(eventId)
      .then((response) => {
        if (response.success) {
          setLogs(response.data);
        } else {
          toast.error(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An unexpected error occurred.");
      });
  }, [eventId]);

  return (
    <div className="logs-modal__container flex items-center justify-center">
      <div className="logs-modal__inner-container flex flex-col">
        <IoCloseOutline
          onClick={() => setIsLogsOpen(false)}
          className="logs-modal__close-icon"
        />
        <h3>Event Update History</h3>
        {logs.length === 0 ? (
          "No logs found."
        ) : (
          <div className="logs-modal__log-list flex flex-col">
            {logs.map((log) => (
              <div className="flex flex-col logs-modal__log-card">
                <div className="flex items-center logs-modal__log-time">
                  <LuClock4 className="logs-modal__log-time-icon" />
                  {dayjs(log.createdAt).format("MMM D, YYYY [at] hh:mm A")}
                </div>
                <div className="logs-modal__message">{log.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LogsModal;
