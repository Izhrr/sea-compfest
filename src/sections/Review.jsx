import React from "react";
import {
  ReviewCardEnhanced,
  Carousel,
  TestimonialForm
} from "../components";
import {
  reviews as enhancedReviews,
  carouselConfig,
  getApprovedReviews,
  getAverageRating,
  getTotalReviewsCount
} from "../constants";

const Review = () => {
 
  const displayReviews = getApprovedReviews();
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviewsCount();


  const renderReviewItem = (review) => (
    <ReviewCardEnhanced review={review} />
  );

  // nanti integrate dengan db
  const handleNewTestimonial = (form) => {
    // demo aja, blm integrate db
    alert(`Testimonial terkirim:\n${JSON.stringify(form, null, 2)}`);
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
      {/* Carousel */}
      <div className="w-full max-w-6xl">
        {displayReviews.length > 0 ? (
          <Carousel
            items={displayReviews}
            renderItem={renderReviewItem}
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
      <div className="w-full max-w-xl mt-8">
        <TestimonialForm onSubmit={handleNewTestimonial} />
      </div>
    </section>
  );
};

export default Review;