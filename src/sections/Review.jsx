"use client";
import React, { useState } from "react";
import {
  ReviewCardEnhanced,
  Carousel,
  TestimonialForm
} from "../components";
import {
  carouselConfig,
  getApprovedReviews,
  getAverageRating,
  getTotalReviewsCount
} from "../constants";
import { reviewAPI } from "@/services/api";

const Review = () => {
  
  const displayReviews = getApprovedReviews();
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviewsCount();


  const [formStatus, setFormStatus] = useState("");

  // Handler submit testimonial ke API (tetap ke DB)
  const handleNewTestimonial = async (form) => {
    setFormStatus("loading");
    try {
      const response = await reviewAPI.create(form);
      if (response.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus(""), 2500);
    }
  };

  return (
    <section className="flex flex-col gap-4 items-center">
      {/* Header */}
      <div className="text-center max-w-4xl">
        <h1 className="font-heading text-h1 text-primary mb-4">
          What our customers say
        </h1>
        {/* Review Statistics */}
        <div className="flex items-center justify-center gap-6 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < Math.floor(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="font-heading text-lg text-paragraph-black">
              {averageRating}/5
            </span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <p className="font-paragraph text-paragraph-black">
            Based on {totalReviews} customer reviews
          </p>
        </div>
      </div>

      {/* Carousel pakai review dummy/local */}
      <div className="w-full max-w-6xl">
        {displayReviews.length > 0 ? (
          <Carousel
            itemsPerView={carouselConfig.itemsPerView}
            autoplay={carouselConfig.autoplay}
            navigation={carouselConfig.navigation}
            className="reviews-carousel"
          >
            {displayReviews.map((review) => (
              <ReviewCardEnhanced key={review.id} review={review} />
            ))}
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="font-paragraph text-gray-500 text-lg">
              No reviews available yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </div>

      {/* Form Testimonial */}
      <div className="w-full max-w-xl mt-8">
        <TestimonialForm onSubmit={handleNewTestimonial} />
        {formStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            Thank you! Your review has been submitted.
          </div>
        )}
        {formStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            Failed to submit review. Please try again.
          </div>
        )}
      </div>
    </section>
  );
};

export default Review;