import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";

// POST: create new subscription
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();

    // Simple validation
    if (!body.name || !body.phoneNumber || !body.selectedPlan || !body.mealTypes?.length || !body.deliveryDays?.length) {
      return NextResponse.json({
        success: false,
        message: 'All required fields must be provided'
      }, { status: 400 });
    }

    const subscription = await Subscription.create({
      ...body,
      status: "pending"
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// GET: get all subscriptions (opsional)
export async function GET() {
  await dbConnect();
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}