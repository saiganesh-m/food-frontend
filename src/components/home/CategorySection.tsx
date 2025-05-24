import React from 'react';
import { Package, Cloud, Users, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategorySection: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'lunch-box',
      title: 'Lunch Box',
      description: 'Perfect for offices and schools. Pre-order your meals for the week.',
      icon: <Package className="w-10 h-10 text-orange-500" />,
      color: 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-orange-200/50',
      hoverColor: 'hover:border-orange-300',
      iconBg: 'bg-orange-100',
      path: '/lunch-box'
    },
    {
      id: 'cloud-kitchen',
      title: 'Cloud Kitchen',
      description: 'Fresh meals prepared daily. Order for same-day delivery.',
      icon: <Cloud className="w-10 h-10 text-red-800" />,
      color: 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200/50',
      hoverColor: 'hover:border-red-300',
      iconBg: 'bg-red-100',
      path: '/cloud-kitchen'
    },
    {
      id: 'party-orders',
      title: 'Party Orders',
      description: 'Catering services for all your events and celebrations.',
      icon: <Users className="w-10 h-10 text-amber-600" />,
      color: 'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 border-amber-200/50',
      hoverColor: 'hover:border-amber-300',
      iconBg: 'bg-amber-100',
      path: '/party-orders'
    },
    {
      id: 'groceries',
      title: 'Home Made Groceries',
      description: 'Authentic Indian spices, lentils, and other essentials.',
      icon: <ShoppingBag className="w-10 h-10 text-green-700" />,
      color: 'bg-gradient-to-br from-green-50 via-green-100 to-green-50 border-green-200/50',
      hoverColor: 'hover:border-green-300',
      iconBg: 'bg-green-100',
      path: '/groceries'
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-orange-500 text-lg font-medium mb-4 px-4 py-2 border border-orange-200 rounded-full bg-orange-50">
            Our Services
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Offerings
          </h2>
          <p className="text-xl text-gray-600">
            From daily meals to groceries and party catering, we have everything you need
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(251,146,60,0.15), 0 1.5px 8px 0 rgba(251,146,60,0.10)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category.path)}
              className={`
                ${category.color} p-8 rounded-2xl border shadow-sm transition-all duration-500
                ${category.hoverColor} hover:shadow-2xl hover:shadow-orange-200 cursor-pointer
                backdrop-blur-sm hover:backdrop-blur-md flex flex-col items-center justify-between min-h-[320px]
              `}
            >
              <motion.div 
                className={`${category.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {category.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 text-center">{category.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6">{category.description}</p>
              <button
                className="mt-auto px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-all text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                onClick={e => { e.stopPropagation(); handleCategoryClick(category.path); }}
              >
                {category.id === 'groceries' ? 'Shop Now' : category.id === 'party-orders' ? 'Book Now' : 'Order Now'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;