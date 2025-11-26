// import { NextResponse } from 'next/server';
// import Post from '@/models/Post';
// import dbConnect from '@/lib/mongo';

// export async function POST(req) {
//   await dbConnect();

//   try {
//     const { title, description } = await req.json();

//     const post = await Post.create({ title, description });

//     return NextResponse.json({ success: true, post });

//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   await dbConnect();

//   try {

//     // const { id } = await params;
//     const posts = await Post.find({});
//     const total = await Post.countDocuments();

//     return NextResponse.json({
//       success: true,
//       posts,
//       totalPosts: total,     
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import dbConnect from '@/lib/mongo';

export async function POST(req) {
  await dbConnect();

  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    const post = await Post.create({ 
      title: title.trim(), 
      description: description.trim()
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

export async function GET() {
  await dbConnect();

  try {
    // Sort by createdAt descending (newest first)
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
    const total = await Post.countDocuments();

    console.log("Fetched posts:", posts.length);

    return NextResponse.json({
      success: true,
      posts,
      totalPosts: total,     
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}