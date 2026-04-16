import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import ApiError from "../../utils/ApiError.js";
import { uploadToCloudinary } from "../../utils/cloudinary.util.js";
import { getReceiverSocketId, io } from "../../utils/socket.js";
import User from "../user/user.model.js";
import Message from "./message.model.js";

// for getting all contacts
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const filteredUsers = await User.find({ _id: { $ne: user } }).select(
    "-password",
  );

  res.status(200).json({
    success: true,
    users: filteredUsers,
  });
});

// for getting all messages
export const getMessages = catchAsyncError(async (req, res, next) => {
  const receiverId = req.params.id;
  const myId = req.user._id;

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return next(new ApiError(400, "Receiver not found"));
  }

  const messages = await Message.find({
    $or: [
      {
        senderId: myId,
        receiverId: receiverId,
      },
      {
        senderId: receiverId,
        receiverId: myId,
      },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    messages,
  });
});

// for sending messages
export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  const media = req?.files?.media;

  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return next(new ApiError(400, "Receiver not found"));
  }

  const senitizedText = text?.trim() || "";

  if (!senitizedText && !media) {
    return next(new ApiError(400, "Please enter somthing to send message"));
  }

  let mediaUrl = "";

  if (media) {
    const result = await uploadToCloudinary(media.tempFilePath, {
      folder: "chat-messages",
      width: 1080,
      height: 1080,
    });

    mediaUrl = result?.secure_url;
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text: senitizedText,
    media: mediaUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(200).json({
    success: true,
    message: newMessage,
  });
});
