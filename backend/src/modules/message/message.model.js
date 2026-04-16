import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
    media: String,
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
