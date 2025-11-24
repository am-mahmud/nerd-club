import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import dbConnect from '@/lib/mongo';

export async function POST(req) {
  await dbConnect();

  try {
    const { title, description } = await req.json();

    const post = await Post.create({ title, description });

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();        

    try {  
        const posts = await Post.find({});
        return NextResponse.json({ success: true, posts });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
    
}

export async function DELETE(req) {
  await dbConnect();

    try {
        const { id } = await req.json();
        await Post.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

