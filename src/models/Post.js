// models/Post.js

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  votes: { type: Number, default: 0 },
  userVotes: {
    type: Map,
    of: Number, // 1 for upvote, -1 for downvote
    default: {}
  }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
