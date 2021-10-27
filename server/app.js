import dotenv from "dotenv";
import createError from "http-errors";
import express from "express";
import path from "path";
const __dirname = path.resolve();
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";

import jwtMiddleware from "./lib/jwtMiddleware.js";
import api from "./api/index.js";

dotenv.config();

const { MONGO_URI } = process.env;
const dbConn = mongoose.connection;

mongoose.connect(MONGO_URI);
dbConn.once("open", () => {
  console.log("MongoDB OK");
});
dbConn.on("error", (error) => {
  console.error("MogoDB error", error);
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(jwtMiddleware);
app.use("/api", api);
app.use("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error("에러스택", err.stack);
  console.error("에러메시지", err.message);
  console.error("에러코드", err.status);

  res.status(err.status || 500).send();
});

export default app;
