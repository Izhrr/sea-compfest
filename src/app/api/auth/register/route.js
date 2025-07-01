import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { validateEmail, sanitizeInput } from "@/lib/auth";

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export async function POST(request) {
  await dbConnect();
  const { fullName, email, password } = await request.json();

  if (!fullName || !email || !password)
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  if (!validateEmail(email))
    return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
  if (!validatePassword(password))
    return NextResponse.json({ message: "Password must be at least 8 chars, contain uppercase, lowercase, number, and special char." }, { status: 400 });

  const existing = await User.findOne({ email });
  if (existing)
    return NextResponse.json({ message: "Email already registered" }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName: sanitizeInput(fullName),
    email: sanitizeInput(email),
    passwordHash
  });

  return NextResponse.json({ message: "User registered", user: { email: user.email, fullName: user.fullName } });
}