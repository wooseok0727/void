import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: String,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
