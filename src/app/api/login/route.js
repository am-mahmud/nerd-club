import dbConnect from "@/lib/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
