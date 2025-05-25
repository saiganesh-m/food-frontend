import React from 'react';
import MealCard from './MealCard';
import { Meal, MealType } from '../../types';
import { motion } from 'framer-motion';

interface MealListProps {
  meals: Meal[];
  category: string;
  onFilterChange: (type: MealType | 'all') => void;
  activeFilter: MealType | 'all';
}

const MealList: React.FC<MealListProps> = ({ 
  meals, 
  category, 
  onFilterChange,
  activeFilter
}) => {
  const filteredMeals = category === 'all' 
    ? meals 
    : meals.filter(meal => meal.category === category);

  const displayMeals = activeFilter === 'all' 
    ? filteredMeals 
    : filteredMeals.filter(meal => 
        activeFilter === 'chicken' 
          ? meal.type === 'chicken' || meal.type === 'egg'
          : meal.type === activeFilter
      );

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'vegetarian', label: 'Veg' },
    { id: 'chicken', label: 'Non-Veg & Egg' },
  ];

  const getCategoryTitle = () => {
    switch(category) {
      case 'lunch-box':
        return 'Lunch Box';
      case 'cloud-kitchen':
        return 'Cloud Kitchen';
      case 'party-orders':
        return 'Party Orders';
      case 'groceries':
        return 'Home Made Groceries';
      default:
        return 'All Categories';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our selection of authentic Indian dishes, prepared with love and tradition
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id as MealType | 'all')}
              className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
        
        {displayMeals.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayMeals.map((meal) => (
              <motion.div key={meal.id} variants={itemVariants}>
                <MealCard meal={meal} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No meals found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealList;