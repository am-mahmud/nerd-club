import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import dbConnect from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title: title.trim(),
      description: description.trim(),
      author: session.user.id,
      authorEmail: session.user.email
    });

    console.log("Created post:", post);

    return NextResponse.json({ success: true, post });

  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const userOnly = searchParams.get('userOnly') === 'true';

    let query = {};

    if (userOnly) {
      if (!session?.user?.email) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        );
      }
      query = { authorEmail: session.user.email };
    }

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;

    const skip = (page - 1) * limit;

    const posts = await Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const total = await Post.countDocuments(query);

    console.log("Fetched posts:", posts.length, "Query:", query);

    return NextResponse.json({
      success: true,
      posts,
      totalPosts: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}