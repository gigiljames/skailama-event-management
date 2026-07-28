import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const profileModel = mongoose.model("Profile", profileSchema);

export default profileModel;
