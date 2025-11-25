// import { NextResponse } from "next/server";
// import Post from "@/models/Post";
// import dbConnect from "@/lib/mongo";

// export async function POST(req, { params }) {
//     await dbConnect();

//     const { id } = params;
//     const { voteType } = await req.json();

//     const post = await Post.findById(id);
//     if (!post) return NextResponse.json({ error: "Post not found" });

//     if (voteType === "up") post.votes += 1;
//     if (voteType === "down") post.votes -= 1;
//     if (voteType === "remove") post.votes -= 1;  // undo
//     if (voteType === "switchToUp") post.votes += 2;
//     if (voteType === "switchToDown") post.votes -= 2;

//     await post.save();

//     return NextResponse.json({ message: "Vote updated", votes: post.votes });
// }



// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function POST(req, { params }) {
//   await dbConnect();

//   // require auth
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = String(session.user.id);
//   const { id } = params;
//   const { voteType } = await req.json(); // "up" | "down" | "remove"

//   const post = await Post.findById(id);
//   if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

//   // previous vote (1/-1) or undefined
//   const prev = post.userVotes?.get(userId) ?? 0;

//   // compute new vote value
//   let newVote = 0;
//   if (voteType === "up") newVote = (prev === 1) ? 0 : 1;
//   else if (voteType === "down") newVote = (prev === -1) ? 0 : -1;
//   else if (voteType === "remove") newVote = 0;
//   else return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });

//   // compute delta to apply to post.votes
//   const delta = (newVote) - (prev || 0); // prev may be 0

//   // update in memory
//   post.votes = (post.votes || 0) + delta;

//   if (newVote === 0) {
//     // remove mapping
//     if (post.userVotes && post.userVotes.has(userId)) post.userVotes.delete(userId);
//   } else {
//     if (!post.userVotes) post.userVotes = new Map();
//     post.userVotes.set(userId, newVote);
//   }

//   await post.save();

//   return NextResponse.json({
//     ok: true,
//     votes: post.votes,
//     userVote: newVote
//   });
// }


// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function POST(req, { params }) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;
//   const { id } = params;
//   const { voteType } = await req.json();

//   // Vote value mapping
//   const VOTE = {
//     up: 1,
//     down: -1,
//     remove: 0,
//   };

//   const newVote = VOTE[voteType];
//   if (newVote === undefined) {
//     return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
//   }

//   // Fetch previous vote (needed for delta)
//   const post = await Post.findById(id).select("userVotes votes");
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   const prev = post.userVotes?.get(userId) || 0;
//   const delta = newVote - prev; // +1, -1, +2, -2, etc.

//   // ----- Atomic MongoDB update -----
//   const update = {
//     $inc: { votes: delta }, // atomic vote change
//   };

//   if (newVote === 0) {
//     update.$unset = { [`userVotes.${userId}`]: "" };
//   } else {
//     update.$set = { [`userVotes.${userId}`]: newVote };
//   }

//   const updatedPost = await Post.findOneAndUpdate(
//     { _id: id },
//     update,
//     { new: true } // return updated document
//   );

//   return NextResponse.json({
//     ok: true,
//     votes: updatedPost.votes,
//     userVote: newVote,
//   });
// }


// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function POST(req, { params }) {
//   await dbConnect();

//   // FIX: Must pass req to getServerSession in App Router
//   const session = await getServerSession(authOptions, req);

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;
//   const { id } = params;
//   const { voteType } = await req.json();

//   const VOTE = {
//     up: 1,
//     down: -1,
//     remove: 0
//   };

//   const newVote = VOTE[voteType];
//   if (newVote === undefined) {
//     return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
//   }

//   const post = await Post.findById(id).select("userVotes votes");
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   const prev = post.userVotes?.get(userId) || 0;
//   const delta = newVote - prev;

//   const update = { $inc: { votes: delta } };

//   if (newVote === 0) {
//     update.$unset = { [`userVotes.${userId}`]: "" };
//   } else {
//     update.$set = { [`userVotes.${userId}`]: newVote };
//   }

//   const updatedPost = await Post.findOneAndUpdate(
//     { _id: id },
//     update,
//     { new: true }
//   );

//   return NextResponse.json({
//     ok: true,
//     votes: updatedPost.votes,
//     userVote: newVote
//   });
// }

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function POST(req, { params }) {
//   await dbConnect();

//   // IMPORTANT FIX — pass req
//   const session = await getServerSession(authOptions, req);

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;
//   const { id } = params;
//   const { voteType } = await req.json();

//   const VOTE = { up: 1, down: -1, remove: 0 };
//   const newVote = VOTE[voteType];

//   if (newVote === undefined) {
//     return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
//   }

//   const post = await Post.findById(id).select("userVotes votes");
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   const prev = post.userVotes?.get(userId) || 0;
//   const delta = newVote - prev;

//   const update = { $inc: { votes: delta } };

//   if (newVote === 0) {
//     update.$unset = { [`userVotes.${userId}`]: "" };
//   } else {
//     update.$set = { [`userVotes.${userId}`]: newVote };
//   }

//   const updatedPost = await Post.findOneAndUpdate(
//     { _id: id },
//     update,
//     { new: true }
//   );

//   return NextResponse.json({
//     ok: true,
//     votes: updatedPost.votes,
//     userVote: newVote
//   });
// }



// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";
// import { auth } from "@/lib/auth";
//   // <-- NEW

// export async function POST(req, { params }) {
//   await dbConnect();

//   // ✔ Works in App Router without req/res
//   const session = await auth();

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;
//   const { id } = params;

//   const { voteType } = await req.json();

//   const VOTE = { up: 1, down: -1, remove: 0 };
//   const newVote = VOTE[voteType];

//   if (newVote === undefined) {
//     return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
//   }

//   const post = await Post.findById(id).select("userVotes votes");

//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   const prev = post.userVotes?.get(userId) || 0;
//   const delta = newVote - prev;

//   const update = {
//     $inc: { votes: delta },
//   };

//   if (newVote === 0) {
//     update.$unset = { [`userVotes.${userId}`]: "" };
//   } else {
//     update.$set = { [`userVotes.${userId}`]: newVote };
//   }

//   const updatedPost = await Post.findOneAndUpdate(
//     { _id: id },
//     update,
//     { new: true }
//   );

//   return NextResponse.json({
//     ok: true,
//     votes: updatedPost.votes,
//     userVote: newVote,
//   });
// }

// import { auth } from "@/lib/auth";
// import dbConnect from "@/lib/mongo";
// import Post from "@/models/Post";

// export async function POST(req, { params }) {
//   console.log("SESSION CHECK START");

//   try {
//     await dbConnect();
//     console.log("auth function:", auth);

//     const session = await auth();
//     console.log("session result:", session);

//     if (!session || !session.user) {
//       return Response.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const { type } = await req.json();
//     const { id } = params;

//     if (!["upvote", "downvote"].includes(type)) {
//       return Response.json({ error: "Invalid vote type" }, { status: 400 });
//     }

//     const update =
//       type === "upvote" ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };

//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: id },
//       update,
//       { new: true }
//     );

//     if (!updatedPost) {
//       return Response.json({ error: "Post not found" }, { status: 404 });
//     }

//     return Response.json({ success: true, votes: updatedPost.votes });
//   } catch (err) {
//     console.error("Vote API Error:", err);
//     return Response.json(
//       { error: "Server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }
