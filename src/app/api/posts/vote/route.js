import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import Post from "@/models/Post";

export async function POST(req) {
  await dbConnect();
  const { postId, userId, voteType } = await req.json();

  const post = await Post.findById(postId);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const alreadyUp = post.upvoters.includes(userId);
  const alreadyDown = post.downvoters.includes(userId);

  if (voteType === "") {
    if (alreadyUp) {
      post.upvoters.pull(userId);
      post.voteCount -= 1;
    } else if (alreadyDown) {
      post.downvoters.pull(userId);
      post.voteCount += 1;
    }
  } 
  else if (voteType === "up") {
    if (alreadyUp) {
      post.upvoters.pull(userId);
      post.voteCount -= 1;
    } else {
      if (alreadyDown) {
        post.downvoters.pull(userId);
        post.voteCount += 1;
      }
      post.upvoters.addToSet(userId);
      post.voteCount += 1;
    }
  } 
  else if (voteType === "down") {
    if (alreadyDown) {
      post.downvoters.pull(userId);
      post.voteCount += 1;
    } else {
      if (alreadyUp) {
        post.upvoters.pull(userId);
        post.voteCount -= 1;
      }
      post.downvoters.addToSet(userId);
      post.voteCount -= 1;
    }
  }

  await post.save();
  return NextResponse.json({ success: true, post });
}
