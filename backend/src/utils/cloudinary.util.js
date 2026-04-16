import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../config/env.js";


cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (filePath, options = {}) => {
  const { folder = "general", width, height, crop = "fill" } = options;

  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",  // fetch automatically image/video
    transformation: width && height ? [{ width, height, crop }] : undefined,
  });
};

export const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};
