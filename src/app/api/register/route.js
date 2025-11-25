// import dbConnect from "@/lib/mongo";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { name, email, password } = await req.json();

//     // check if email exists
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return Response.json({ error: "Email already exists" }, { status: 400 });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return Response.json({ message: "User Registered", user });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }



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
