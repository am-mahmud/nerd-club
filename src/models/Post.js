// import mongoose from "mongoose";

// const PostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Title is required"],
//     trim: true
//   },
//   description: {
//     type: String,
//     required: [true, "Description is required"],
//     trim: true
//   }
// }, { 
//   timestamps: true
// });

// export default mongoose.models.Post || mongoose.model("Post", PostSchema);


// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
//     password: {
//       type: String,
//       required: false
//     },
//     provider: {
//       type: String,
//       enum: ['credentials', 'google'],
//       default: 'credentials'
//     },
//     googleId: {
//       type: String,
//       sparse: true, 
//       unique: true
//     }
//   },
//   { 
//     timestamps: true 
//   }
// );

// export default mongoose.models.User || mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },

  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  voteCount: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
