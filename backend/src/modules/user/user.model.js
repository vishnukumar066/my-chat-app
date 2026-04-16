import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Please provide email."],
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: true,
    },

    avatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
