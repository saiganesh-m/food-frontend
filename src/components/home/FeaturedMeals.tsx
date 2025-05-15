import React from 'react';
import MealCard from '../meals/MealCard';
import { Meal } from '../../types';

interface FeaturedMealsProps {
  meals: Meal[];
}

const FeaturedMeals: React.FC<FeaturedMealsProps> = ({ meals }) => {
  const featuredMeals = meals.filter(meal => meal.featured);

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-orange-500 text-lg font-medium mb-4 px-4 py-2 border border-orange-200 rounded-full bg-orange-50">
            Featured Selection
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Meals</h2>
          <p className="text-xl text-gray-600">
            Discover our most popular and authentic Indian dishes, crafted with love and tradition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMeals;