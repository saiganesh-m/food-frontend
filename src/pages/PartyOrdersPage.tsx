import React, { useState } from 'react';
import MealList from '../components/meals/MealList';
import { meals } from '../data/meals';
import { MealType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const PartyOrdersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<MealType | 'all'>('all');

  const handleFilterChange = (filter: MealType | 'all') => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4">Party Orders & Catering</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl opacity-90 mb-8">Celebrate with a feast! Order delicious Indian party trays and catering for your next event. Perfect for gatherings, celebrations, and special occasions.</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4">
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-semibold">View Menu</button>
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Order Now</button>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Meals List */}
      <AnimatePresence>
        <motion.div
          key="party-orders-meal-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
      <MealList 
        meals={meals.filter(meal => meal.category === 'party-orders')}
        category="party-orders"
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
      />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PartyOrdersPage;