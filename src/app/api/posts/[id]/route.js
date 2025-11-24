import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Post from '@/models/Post';

export async function PUT(req, context) {
    await dbConnect();
    
    try {
        const params = await context.params;  
        const id = params.id;
        console.log("PARAM ID =", id);

        const body = await req.json();
        console.log("BODY =", body);

        const { title, description } = body;

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
