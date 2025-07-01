import Image from 'next/image';
import { Button } from ".";

const MealPlanCard = ({ mealPlan, onMoreInfo }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      {/* Image Section */}
      <div className="h-64 overflow-hidden">
        <Image 
          src={mealPlan.image} 
          alt={mealPlan.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4 flex-grow">
        {/* Title */}
        <h3 className="font-heading text-h4 text-paragraph-black">
          {mealPlan.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-h4 text-paragraph-black">
            {mealPlan.price}
          </span>
          <span className="font-paragraph text-p3 text-paragraph-black">
            {mealPlan.pricePerWeek}
          </span>
        </div>
        
        {/* Description */}
        <p className="font-paragraph text-p3 text-paragraph-black leading-p3 flex-grow">
          {mealPlan.description}
        </p>
        
        {/* Button */}
        <div className="mt-4">
          <Button 
            label="More Information"
            onClick={() => onMoreInfo(mealPlan)}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;