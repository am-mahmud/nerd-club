import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    votes: {
        type: Number,
        default: 0,
    }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
