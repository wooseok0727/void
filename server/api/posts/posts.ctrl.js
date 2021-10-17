// POSTS CONTROLLER
import Post from "../../models/post.js";
import moment from "moment";
import mongoose from "mongoose";
import Joi from "joi";

const { ObjectId } = mongoose.Types;

export const checkObjectId = (req, res, next) => {
  const { id } = req.params;
  !ObjectId.isValid(id) ? res.sendStatus(400) : next();
};

/*
    GET /api/posts
*/
export const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    console.log(page);
    const postCount = await Post.countDocuments();
    const lastPage = Math.ceil(postCount / 10);

    if (page < 1 || page > lastPage || isNaN(page)) {
      return res.sendStatus(400);
    }
    const posts = await Post.find({})
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean();

    res.header("Last-Page", lastPage);

    const postsSlice = posts.map((post) => ({
      ...post,
      content:
        post.content.length < 200
          ? post.content
          : `${post.content.slice(0, 200)}...`,
    }));

    res.json(postsSlice);
  } catch (err) {
    next(err);
  }
};

/*
    GET /api/posts/:id
*/
export const read = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    !post ? res.sendStatus(404) : res.json(post);
  } catch (err) {
    next(err);
  }
};

/*
    POST /api/posts
*/
export const write = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const { title, content, tags } = req.body;
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

  const post = new Post({
    title,
    content,
    tags,
    createdAt,
  });
  try {
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

/*
    PATCH /api/posts/:id
*/
export const update = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !post ? res.sendStatus(404) : res.json(post);
  } catch (err) {
    next(err);
  }
};

/*
    DELETE /api/posts/:id
*/
export const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndRemove(id);
    !post ? res.sendStatus(404) : res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
