import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Post from '@/models/Post';

export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;

    const { title, description } = await req.json();

    const updated = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;  

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}