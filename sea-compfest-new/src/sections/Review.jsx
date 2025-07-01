"use client";
import React, { useState, useEffect } from 'react';
import { Carousel, TestimonialForm } from '../components';
import { testimonialAPI } from '../services/api';
import { carouselConfig } from '../constants';

const Review = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load testimonials from API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await testimonialAPI.getAll();
        if (response.success) {
          setTestimonials(response.data);
        } else {
          throw new Error(response.message || 'Failed to load testimonials');
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setError(error.message || 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Handle new testimonial submission
  const handleNewTestimonial = (newTestimonial) => {
    // Testimonial will be added to database but won't appear immediately
    // since it needs approval first
    console.log('New testimonial submitted:', newTestimonial);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-h2 text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="font-paragraph text-paragraph-black max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with SEA Catering.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-center">{error}</p>
          </div>
        )}

        {/* Testimonials Carousel */}
        <div className="mb-16">
          {testimonials && testimonials.length > 0 ? (
            <Carousel
              items={testimonials}
              itemsPerView={carouselConfig.itemsPerView}
              autoplay={carouselConfig.autoplay}
              navigation={carouselConfig.navigation}
              className="reviews-carousel"
            />
          ) : (
            <div className="text-center py-12">
              <p className="font-paragraph text-gray-500 text-lg">
                No reviews available yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>

        {/* Form Testimonial */}
        <div className="w-full max-w-xl mx-auto">
          <TestimonialForm onSubmit={handleNewTestimonial} />
        </div>
      </div>
    </section>
  );
};

export default Review;