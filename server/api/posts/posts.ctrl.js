// POSTS CONTROLLER
import Post from "../../models/post.js";
import moment from "moment";
import mongoose from "mongoose";
import Joi from "joi";
import sanitizeHtml from "sanitize-html";

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(400);
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    res.locals.post = post;
    return next();
  } catch (err) {
    next(err);
  }
};

export const checkOwnPost = (req, res, next) => {
  const { user, post } = res.locals;
  if (post.user._id.toString() !== user._id) {
    return res.sendStatus(403);
  }
  return next();
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/*
    GET /api/posts
*/
export const list = async (req, res, next) => {
  try {
    const { tag, username } = req.query;
    const query = {
      ...(username ? { "user.username": username } : {}),
      ...(tag ? { tags: tag } : {}),
    };

    const page = parseInt(req.query.page || "1", 10);
    const postCount = await Post.countDocuments(query);
    const lastPage = Math.ceil(postCount / 10);

    if (page < 1 || page > lastPage || isNaN(page)) {
      return res.sendStatus(400);
    }

    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean();

    res.header("Last-Page", lastPage);

    const postsSlice = posts.map((post) => ({
      ...post,
      content: removeHtmlAndShorten(post.content),
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
  res.json(res.locals.post);
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
    content: sanitizeHtml(content, sanitizeOption),
    tags,
    createdAt,
    user: res.locals.user,
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

  const nextData = { ...req.body };
  if (nextData.content) {
    nextData.content = sanitizeHtml(nextData.content, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
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
