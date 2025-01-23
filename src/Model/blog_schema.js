//model for blogs database collections
import mongoose from "mongoose";
const bloggerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const blogSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      trim: true,
    },
    author_name: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail_image: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Blogger =
  mongoose.models.Blogger || mongoose.model("Blogger", bloggerSchema);
const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export {Blogs,Blogger};
