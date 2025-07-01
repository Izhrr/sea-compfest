import { NextResponse } from 'next/server';

// Mock testimonials storage
let testimonials = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    reviewMessage: 'Absolutely love the variety and freshness of the meals! Perfect for my busy lifestyle.',
    rating: 5,
    isApproved: true,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    reviewMessage: 'Great service and delicious healthy meals. Highly recommend!',
    rating: 5,
    isApproved: true,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET all approved testimonials
export async function GET() {
  try {
    const approvedTestimonials = testimonials.filter(t => t.isApproved && t.isVisible);
    
    return NextResponse.json({
      success: true,
      data: approvedTestimonials
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    }, { status: 500 });
  }
}

// POST create testimonial
export async function POST(request) {
  try {
    const { customerName, reviewMessage, rating } = await request.json();

    // Validasi input
    if (!customerName || !reviewMessage || !rating) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required'
      }, { status: 400 });
    }

    if (customerName.length < 2 || customerName.length > 50) {
      return NextResponse.json({
        success: false,
        message: 'Customer name must be between 2 and 50 characters'
      }, { status: 400 });
    }

    if (reviewMessage.length < 5 || reviewMessage.length > 500) {
      return NextResponse.json({
        success: false,
        message: 'Review message must be between 5 and 500 characters'
      }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({
        success: false,
        message: 'Rating must be between 1 and 5'
      }, { status: 400 });
    }

    const testimonial = {
      id: Date.now().toString(),
      customerName,
      reviewMessage,
      rating: Number(rating),
      isApproved: false, // Requires approval
      isVisible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    testimonials.push(testimonial);

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: testimonial
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    }, { status: 500 });
  }
}