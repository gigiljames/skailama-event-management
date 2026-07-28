export const MESSAGES = {
  EVENT: {
    CREATED: "Event created successfully.",
    UPDATED: "Event updated successfully.",
    FETCHED_EVENTS: "Events fetched successfully.",
    FETCHED_EVENT_LOGS: "Event logs fetched successfully.",
    NOT_FOUND: "Event not found",
    START_TIME_IN_PAST: "Start time cannot be in the past.",
    END_TIME_IN_PAST: "End time cannot be in the past.",
    END_BEFORE_START: "End time must be after start time.",
  },
  PROFILE: {
    CREATED: "Profile created successfully.",
    NOT_FOUND: "Profile not found.",
    FETCHED: "Profiles fetched successfully.",
  },
  ENV: {
    PORT_ERROR: "ENV Error: Port is not defined.",
    NODE_ENV_ERROR: "ENV Error: Node env is not defined.",
    FRONTEND_URL_ERROR: "ENV Error: Frontend url is not defined.",
    DB_URL_ERROR: "ENV Error: Database url is not defined.",
    INVALID_ENV: "ENV Error: Invalid environment variables.",
  },
  BAD_REQUEST: "Bad request.",
};
