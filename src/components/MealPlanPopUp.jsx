import React from 'react';

const MealPlanPopUp = ({ mealPlan, isOpen, onClose }) => {
  if (!isOpen || !mealPlan) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-[1000] p-4 ">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-heading text-h3 text-paragraph-black">
            {mealPlan.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-paragraph-black cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img 
              src={mealPlan.image} 
              alt={mealPlan.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <h3 className="font-heading text-h5 text-paragraph-black mb-2">Price</h3>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-h4 text-paragraph-black">
                {mealPlan.price}
              </span>
              <span className="font-paragraph text-p3 text-paragraph-black">
                {mealPlan.pricePerWeek}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-heading text-h5 text-paragraph-black mb-2">Description</h3>
            <p className="font-paragraph text-p3 text-paragraph-black leading-p3">
              {mealPlan.description}
            </p>
          </div>

          {/* Key Features & Benefits */}
          <div className="mb-6">
            <h3 className="font-heading text-h5 text-paragraph-black mb-4">Key Features & Benefits</h3>
            <ul className="space-y-2">
              {mealPlan.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-p3 text-paragraph-black">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dietary Information */}
          <div>
            <h3 className="font-heading text-h5 text-paragraph-black mb-4">Dietary Information</h3>
            <ul className="space-y-2">
              {mealPlan.dietaryInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-p3 text-paragraph-black">
                    {info}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPopUp;