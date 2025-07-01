import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactUs from "@/models/ContactUs";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();

    // Validasi sederhana
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const contact = await ContactUs.create(body);

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}