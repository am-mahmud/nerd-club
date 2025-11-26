import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name, email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already used" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name: name || email.split("@")[0], email, password: hashed });
  await user.save();

  return NextResponse.json({ ok: true, userId: user._id });
}
