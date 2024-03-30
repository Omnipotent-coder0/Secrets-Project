import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    displayName: {
      type: String,
      require: true,
    },
    secrets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Secret" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
