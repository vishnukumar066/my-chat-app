import "./config/dotenv.js";
import dbConnection from "./config/dbConnection.js";
import fileUpload from "express-fileupload";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import globalRouter from "./routes/global.routes.js";
import { initSocket } from "./utils/socket.js";

import http from "http";

const app = express();
dbConnection();


app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./temp/"
}));

// all modules routes global routes
app.use("/api/v1", globalRouter)

// error handler
app.use(errorMiddleware);

// server for socket
const server = http.createServer(app);
initSocket(server);

const PORT = ENV.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
