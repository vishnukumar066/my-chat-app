import express from "express";
import {
  getUser,
  login,
  logout,
  register,
  updateProfile,
} from "./user.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout",isAuthenticated, logout);
userRouter.get("/me",isAuthenticated, getUser);
userRouter.put("/update-profile",isAuthenticated, updateProfile);

export default userRouter;
