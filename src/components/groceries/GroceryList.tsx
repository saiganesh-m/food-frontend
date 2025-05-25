import React, { useState } from 'react';
import GroceryCard from './GroceryCard';
import { Grocery } from '../../types';
import { motion } from 'framer-motion';

interface GroceryListProps {
  groceries: Grocery[];
}

const GroceryList: React.FC<GroceryListProps> = ({ groceries }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(groceries.map(item => item.category))];
  
  const filteredGroceries = activeCategory === 'all' 
    ? groceries 
    : groceries.filter(item => item.category === activeCategory);

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
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Home Made Groceries</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic Indian spices, lentils, and essential ingredients for your kitchen
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${activeCategory === category ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
        
        {filteredGroceries.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredGroceries.map((grocery) => (
              <motion.div key={grocery.id} variants={itemVariants}>
                <GroceryCard grocery={grocery} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No groceries found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryList;