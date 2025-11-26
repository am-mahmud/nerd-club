import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
  googleId: { type: String, sparse: true, unique: true }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
