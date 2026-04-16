import { ENV } from "../../config/env.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import ApiError from "../../utils/ApiError.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary.util.js";
import { generateJwtToken } from "../../utils/jwtToken.js";
import User from "./user.model.js";
import { compare, hash } from "./user.services.js";

// register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, "All fields are required"));
  }

  if (password.length < 8) {
    return next(new ApiError(400, "Password must be atleast 9 character"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new ApiError(400, "User already exist"));
  }

  const hashedPassword = await hash(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "",
      url: "",
    },
  });

  generateJwtToken(user, "User register seccessfully", 201, res);
});

// Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, "All fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  const ok = await compare(password, user.password);
  if (!ok) {
    return next(new ApiError(400, "Paasword incorrect"));
  }

  generateJwtToken(user, "login seccessfully", 201, res);
});

// Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development" ? true : false,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
});

// get user details
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (name.trim().length === 0 || email.trim().length === 0) {
    return next(new ApiError(400, "Please fill all the field"));
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  const avatar = req?.files?.avatar;
  if (avatar) {
    // Upload to cloudinary
    const result = await uploadToCloudinary(avatar.tempFilePath, {
      folder: "chat-avatars",
      width: 300,
      height: 300,
    });

    // Delete old avatar
    if (user?.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    // Save new avatar
    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  user.name = name;
  user.email = email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    user
  });
});
