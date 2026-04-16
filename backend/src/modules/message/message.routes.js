import express from "express";
import { getAllUsers, getMessages, sendMessage } from "./message.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", isAuthenticated, getAllUsers);
messageRouter.get("/get-messages/:id", isAuthenticated, getMessages);
messageRouter.post("/send-message/:id", isAuthenticated, sendMessage);

export default messageRouter;
