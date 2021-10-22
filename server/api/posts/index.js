import express from "express";
import * as postsCtrl from "./posts.ctrl.js";
import checkLoggedIn from "../../lib/checkLoggedIn.js";

const posts = express.Router();

posts.get("/", postsCtrl.list);
posts.post("/", checkLoggedIn, postsCtrl.write);

posts.get("/:id", postsCtrl.getPostById, postsCtrl.read);
posts.patch(
  "/:id",
  postsCtrl.getPostById,
  checkLoggedIn,
  postsCtrl.checkOwnPost,
  postsCtrl.update
);
posts.delete(
  "/:id",
  postsCtrl.getPostById,
  checkLoggedIn,
  postsCtrl.checkOwnPost,
  postsCtrl.remove
);

export default posts;
