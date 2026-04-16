import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateJwtToken = async (user, message, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    ENV.JWT_SECRET_KEY,
    {
      expiresIn: ENV.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    },
  );

  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: ENV.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development" ? true : false,
    })
    .json({
      success: true,
      message,
      token,
    });
};
