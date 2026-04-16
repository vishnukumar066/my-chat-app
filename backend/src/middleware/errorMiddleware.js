import ApiError from "../utils/ApiError.js";


export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  console.log("Error in error,js file; ", err);

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ApiError(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    err = new ApiError(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired error. Try Again!!!";
    err = new ApiError(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate Key Error. Resource already exists!!! ${Object.keys(err.keyValue)}`;
    err = new ApiError(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

