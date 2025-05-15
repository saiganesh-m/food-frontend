import React from 'react';
import MealList from '../components/meals/MealList';
import { meals } from '../data/meals';

const CloudKitchenPage: React.FC = () => {
  return (
    <div className="pt-24">
      <MealList 
        meals={meals.filter(meal => meal.category === 'cloud-kitchen')}
        category="cloud-kitchen"
        onFilterChange={() => {}}
        activeFilter="all"
      />
    </div>
  );
};

export default CloudKitchenPage;