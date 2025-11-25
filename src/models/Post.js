import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  votes: { type: Number, default: 0 },

  // Map of userId (string) -> vote value (1 or -1)
  userVotes: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
