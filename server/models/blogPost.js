const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commenterName: { type: String, required: true },
  comment: { type: String, required: true }
});

const blogPostSchema = new mongoose.Schema({
  authorId: { type: String, required: true },

  authorName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentImage: { type: String, required: true },
  comments: [commentSchema]  // Array of comment objects
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
