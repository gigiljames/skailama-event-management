import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const logModel = mongoose.model("Log", logSchema);

export default logModel;
