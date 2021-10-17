import express from "express";
import posts from "./posts/index.js";
import auth from "./auth/index.js";

const api = express.Router();

api.use("/posts", posts);
api.use("/auth", auth);

export default api;
