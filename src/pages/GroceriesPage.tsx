import React from 'react';
import GroceryList from '../components/groceries/GroceryList';
import { groceries } from '../data/groceries';

const GroceriesPage: React.FC = () => {
  return (
    <div className="pt-24">
      <GroceryList groceries={groceries} />
    </div>
  );
};

export default GroceriesPage;