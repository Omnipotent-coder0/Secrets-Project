import mongoose from "mongoose";

const secretSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    visibility: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Secret = mongoose.model("Secret", secretSchema);
