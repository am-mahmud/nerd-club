import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Post from '@/models/Post';

export async function GET(req, context) {
  await dbConnect();

  try {
    // Await params in Next.js 15
    const { id } = await context.params;

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  await dbConnect();

  try {
    // Await params in Next.js 15
    const { id } = await context.params;

    const { title, description } = await req.json();

    const updated = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    // Await params in Next.js 15
    const { id } = await context.params;

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}