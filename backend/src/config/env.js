import "./dotenv.js";

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,

  FRONTEND_URL: process.env.FRONTEND_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  // ACCESS_TTL: process.env.ACCESS_TTL,
  // REFRESH_TTL: process.env.REFRESH_TTL,
  COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
  NODE_ENV: process.env.NODE_ENV,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};