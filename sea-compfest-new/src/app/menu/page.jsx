import React, { useState } from 'react';
import { MealPlanCard, MealPlanPopUp } from '../components';
import { mealPlans } from '../constants';

const MenuPage = () => {
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreInfo = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMealPlan(null);
  };

  return (
    <section id="menu" className="flex flex-col gap-15 py-20">

      <div className="text-center">
        <h1 className="font-heading text-h1 text-primary">
          Our Meal Plans
        </h1>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {mealPlans.map((mealPlan) => (
          <MealPlanCard
            key={mealPlan.id}
            mealPlan={mealPlan}
            onMoreInfo={handleMoreInfo}
          />
        ))}
      </div>

      <MealPlanPopUp
        mealPlan={selectedMealPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default MenuPage;