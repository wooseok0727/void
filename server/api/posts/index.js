import express from "express";
import * as postsCtrl from "./posts.ctrl.js";

const posts = express.Router();

posts.get("/", postsCtrl.list);
posts.post("/", postsCtrl.write);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);
posts.patch("/:id", postsCtrl.checkObjectId, postsCtrl.update);
posts.delete("/:id", postsCtrl.checkObjectId, postsCtrl.remove);

export default posts;
