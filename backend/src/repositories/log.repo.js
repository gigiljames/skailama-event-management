import logModel from "../models/log.model.js";

export default class LogRepository {
  constructor() {}

  async fetchEventLogs(eventId) {
    const logDocs = await logModel.find({ eventId });
    const logs = logDocs.map((doc) => ({
      id: doc._id.toString(),
      eventId: doc.eventId,
      message: doc.message,
      createdAt: doc.createdAt,
    }));
    return logs;
  }

  async addLog(log) {
    const newLogDoc = await logModel.create({
      eventId: log.eventId,
      message: log.message,
    });
    const newLog = {
      id: newLogDoc._id.toString(),
      eventId: newLogDoc.eventId.toString(),
      message: newLogDoc.message,
      createdAt: newLogDoc.createdAt,
    };
    return newLog;
  }
}
