import React from 'react';

const ReviewCardEnhanced = ({ review }) => {
  // Star sesuai rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="flex flex-col gap-4 items-start p-8 bg-white shadow-lg rounded-2xl h-full min-h-[240px] hover:shadow-2xl transition-shadow duration-300">
      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {renderStars(review.rating)}
        <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
      </div>
      {/* Review Message */}
      <p className="font-paragraph text-p3 leading-p3 text-paragraph-black flex-grow">
        "{review.reviewMessage || review.feedback}"
      </p>
      {/* Customer Info */}
      <div className="mt-auto pt-4 border-t border-gray-100 w-full">
        <p className="font-heading text-p2 leading-p2 text-paragraph-black">
          - {review.customerName || review.reviewer}
        </p>
      </div>
    </div>
  );
};

export default ReviewCardEnhanced;