import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateEmail, sanitizeInput } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(request) {
  await dbConnect();
  const { email, password } = await request.json();

  if (!email || !password)
    return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  if (!validateEmail(email))
    return NextResponse.json({ message: "Invalid email format" }, { status: 400 });

  const user = await User.findOne({ email: sanitizeInput(email) });
  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  const response = NextResponse.json({ message: "Login success", user: { email: user.email, fullName: user.fullName, role: user.role } });
  response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60*60*24*7, sameSite: "lax" });
  return response;
}