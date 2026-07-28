import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    timezone: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
