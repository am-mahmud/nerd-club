import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Post from '@/models/Post';

export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const { title, description } = await req.json();
        const post = await Post.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        return NextResponse.json({ success: true, post });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}