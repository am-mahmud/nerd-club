import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorEmail: { type: String, required: true },

  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  voteCount: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
