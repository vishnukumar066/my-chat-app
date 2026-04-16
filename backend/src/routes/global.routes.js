import express from "express";
import userRouter from "../modules/user/user.routes.js";
import messageRouter from "../modules/message/message.routes.js";


const globalRouter = express.Router();

globalRouter.use("/user", userRouter);
globalRouter.use("/message", messageRouter);

export default globalRouter;
