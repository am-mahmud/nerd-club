import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  }
}, { 
  timestamps: true
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);