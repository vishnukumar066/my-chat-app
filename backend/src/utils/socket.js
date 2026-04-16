import { Server } from "socket.io";
import { ENV } from "../config/env.js";

const userSocketMap = {};

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [ENV.FRONTEND_URL],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected to server successfully", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user disconnected to server", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};


export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}


export { io };