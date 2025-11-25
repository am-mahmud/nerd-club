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



import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import Post from "@/models/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req, { params }) {
  await dbConnect();

  // require auth
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = String(session.user.id);
  const { id } = params;
  const { voteType } = await req.json(); // "up" | "down" | "remove"

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // previous vote (1/-1) or undefined
  const prev = post.userVotes?.get(userId) ?? 0;

  // compute new vote value
  let newVote = 0;
  if (voteType === "up") newVote = (prev === 1) ? 0 : 1;
  else if (voteType === "down") newVote = (prev === -1) ? 0 : -1;
  else if (voteType === "remove") newVote = 0;
  else return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });

  // compute delta to apply to post.votes
  const delta = (newVote) - (prev || 0); // prev may be 0

  // update in memory
  post.votes = (post.votes || 0) + delta;

  if (newVote === 0) {
    // remove mapping
    if (post.userVotes && post.userVotes.has(userId)) post.userVotes.delete(userId);
  } else {
    if (!post.userVotes) post.userVotes = new Map();
    post.userVotes.set(userId, newVote);
  }

  await post.save();

  return NextResponse.json({
    ok: true,
    votes: post.votes,
    userVote: newVote
  });
}
