import { NextResponse } from 'next/server';

// This is a mock implementation since we don't have a database setup
// In a real app, you would connect to a database here

let subscriptions = []; // Mock storage

// GET all subscriptions
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching subscriptions',
      error: error.message
    }, { status: 500 });
  }
}

// POST create subscription
export async function POST(request) {
  try {
    const {
      name,
      phoneNumber,
      selectedPlan,
      mealTypes,
      deliveryDays,
      allergies,
      totalPrice
    } = await request.json();

    // Validasi input
    if (!name || !phoneNumber || !selectedPlan || !mealTypes || !deliveryDays) {
      return NextResponse.json({
        success: false,
        message: 'All required fields must be provided'
      }, { status: 400 });
    }

    const subscription = {
      id: Date.now().toString(), // Simple ID generation
      name,
      phoneNumber,
      selectedPlan,
      mealTypes,
      deliveryDays,
      allergies: allergies || '',
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    subscriptions.push(subscription);

    return NextResponse.json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating subscription',
      error: error.message
    }, { status: 500 });
  }
}