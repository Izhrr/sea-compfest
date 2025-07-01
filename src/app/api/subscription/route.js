import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { getUserFromRequest, validatePhone, sanitizeInput } from "@/lib/auth";

export async function POST(request) {
  await dbConnect();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  // Validasi & sanitasi
  if (!body.name || !body.phoneNumber || !body.selectedPlan || !body.mealTypes?.length || !body.deliveryDays?.length)
    return NextResponse.json({ success: false, message: "All required fields must be provided" }, { status: 400 });
  if (!validatePhone(body.phoneNumber))
    return NextResponse.json({ success: false, message: "Invalid phone number format" }, { status: 400 });

  const subscription = await Subscription.create({
    ...body,
    name: sanitizeInput(body.name),
    phoneNumber: sanitizeInput(body.phoneNumber),
    allergies: sanitizeInput(body.allergies || ""),
    userId: user.userId,
    status: "pending",
  });

  return NextResponse.json({ success: true, message: "Subscription created successfully", data: subscription }, { status: 201 });
}

export async function GET(request) {
  await dbConnect();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let subscriptions;
  if (user.role === "admin") {
    subscriptions = await Subscription.find().sort({ createdAt: -1 });
  } else {
    subscriptions = await Subscription.find({ userId: user.userId }).sort({ createdAt: -1 });
  }
  return NextResponse.json({ success: true, data: subscriptions });
}