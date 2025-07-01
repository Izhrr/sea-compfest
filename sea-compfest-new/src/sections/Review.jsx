"use client";
import React, { useState, useEffect } from 'react';
import { Carousel, TestimonialForm } from '../components'; 
import { testimonialAPI } from '../services/api';        
import { carouselConfig } from '../constants';             


const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};


const Review = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleNewTestimonial = (newTestimonial) => {
    console.log('New testimonial submitted:', newTestimonial);
  };

  const renderTestimonialCard = (testimonial) => (
    <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col justify-between">
      <div>
        <StarRating rating={testimonial.rating || 5} />
        <blockquote className="font-paragraph text-paragraph-black mt-4 text-lg">
          "{testimonial.quote || 'No comment provided.'}"
        </blockquote>
      </div>
      <div className="mt-6 flex items-center">
        <div>
          <p className="font-bold text-primary">{testimonial.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">{testimonial.position || 'Valued Customer'}</p>
        </div>
      </div>
    </div>
  );


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
        {/* ... (kode header Anda sudah benar) ... */}
        <div className="text-center mb-16">
            <h2 className="font-heading text-h2 text-primary mb-4">
                What Our Customers Say
            </h2>
            <p className="font-paragraph text-paragraph-black max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
            </p>
        </div>

        {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="text-center">{error}</p>
            </div>
        )}

        <div className="mb-16">
          {testimonials && testimonials.length > 0 ? (
            <Carousel
              items={testimonials}
              renderItem={renderTestimonialCard}
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

        <div className="w-full max-w-xl mx-auto">
          <TestimonialForm onSubmit={handleNewTestimonial} />
        </div>
      </div>
    </section>
  );
};

export default Review;