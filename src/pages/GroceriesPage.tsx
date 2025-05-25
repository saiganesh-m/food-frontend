import React from 'react';
import GroceryList from '../components/groceries/GroceryList';
import { groceries } from '../data/groceries';
import { motion } from 'framer-motion';

const GroceriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4">Fresh Groceries Delivered</motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl opacity-90 mb-8">Stock up on authentic Indian spices, lentils, flours, and more. Quality ingredients delivered conveniently.</motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4">
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-semibold">Shop Now</button>
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Learn More</button>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Groceries List */}
      <GroceryList groceries={groceries} />
    </div>
  );
};

export default GroceriesPage;