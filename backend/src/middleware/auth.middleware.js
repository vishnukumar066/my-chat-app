import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ApiError from "../utils/ApiError.js";
import { ENV } from "../config/env.js";
import User from "../modules/user/user.model.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
     return next(new ApiError(401, "Unauthenticated, please login"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!decoded) {
      return next(new ApiError(401, "Token verification failed, please login again"));
    }

    const user = await User.findById(decoded.id);
    req.user = user;
    next();
})