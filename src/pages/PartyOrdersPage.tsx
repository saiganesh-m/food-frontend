import React from 'react';
import MealList from '../components/meals/MealList';
import { meals } from '../data/meals';

const PartyOrdersPage: React.FC = () => {
  return (
    <div className="pt-24">
      <MealList 
        meals={meals.filter(meal => meal.category === 'party-orders')}
        category="party-orders"
        onFilterChange={() => {}}
        activeFilter="all"
      />
    </div>
  );
};

export default PartyOrdersPage;