import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // check if email exists
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "User Registered", user });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
