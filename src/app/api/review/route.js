import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    if (!body.customerName || !body.reviewMessage || !body.rating) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const review = await Review.create(body);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}