import { NextResponse } from "next/server";
import Post from "@/models/Post";
import dbConnect from "@/lib/mongo";

export async function POST(req, { params }) {
    await dbConnect();

    const { id } = params;
    const { voteType } = await req.json();

    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ error: "Post not found" });

    if (voteType === "up") post.votes += 1;
    if (voteType === "down") post.votes -= 1;
    if (voteType === "remove") post.votes -= 1;  // undo
    if (voteType === "switchToUp") post.votes += 2;
    if (voteType === "switchToDown") post.votes -= 2;

    await post.save();

    return NextResponse.json({ message: "Vote updated", votes: post.votes });
}
