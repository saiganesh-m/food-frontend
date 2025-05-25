import React, { useState } from 'react';
import { Meal } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, Star, X } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, 'yyyy-MM-dd');
  });
  const { addToCart } = useCart();
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleManualQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    let cartId = meal.id;
    let cartName = meal.name;
    if (meal.category === 'party-orders') {
      cartId = `${meal.id}-${selectedDate}`;
      cartName = `${meal.name} (Party Order: ${selectedDate})`;
    }
    addToCart({
      id: cartId,
      name: cartName,
      price: meal.price,
      image: meal.image,
      type: 'meal',
      quantity: quantity,
    });
    setIsModalOpen(false);
    setQuantity(1); // Reset quantity after adding to cart
  };

  const getMealTypeBadge = (type: string) => {
    switch (type) {
      case 'chicken':
        return <Badge variant="warning">Non-Veg</Badge>;
      case 'vegetarian':
        return <Badge variant="success">Vegetarian</Badge>;
      case 'egg':
        return <Badge variant="default">Egg</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden flex-shrink-0">
          <img 
            src={meal.image} 
            alt={meal.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {meal.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
              <Star className="w-4 h-4 text-yellow-300 mr-1" fill="#fde68a" />
              Featured
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1 p-5 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 truncate group-hover:text-orange-600 transition-colors duration-300">
              {meal.name}
            </h3>
            {getMealTypeBadge(meal.type)}
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
          <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-100">
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              ${meal.price.toFixed(2)}
            </span>
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-all text-base focus:outline-none focus:ring-2 focus:ring-orange-300 mt-0.5"
              onClick={e => { e.stopPropagation(); setIsModalOpen(true); }}
            >
              <Plus className="w-5 h-5" /> Order Now
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl mx-auto flex flex-col"
            >
              <div className="relative">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-orange-500 rounded-full p-2 shadow transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 flex-1">{meal.name}</h2>
                  {getMealTypeBadge(meal.type)}
                </div>
                <p className="text-gray-600 text-base mb-4">{meal.description}</p>
                <div className="mb-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900 capitalize bg-gray-50 px-3 py-1 rounded-full">
                      {meal.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
                    >
                      ${(meal.price * quantity).toFixed(2)}
                    </motion.span>
                  </div>
                </div>
                {meal.category === 'party-orders' && (
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-gray-900 font-medium text-sm" htmlFor="party-date">Select Event Date:</label>
                    <input
                      id="party-date"
                      type="date"
                      min={format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')}
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="border rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 w-full"
                      required
                    />
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900 font-medium text-sm">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity - 1);
                      }}
                      className="bg-gray-100 text-gray-500 hover:bg-gray-200 p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleManualQuantityChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-16 text-center border rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base"
                    />
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity + 1);
                      }}
                      className="bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-full transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={handleAddToCart}
                  className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 text-base relative overflow-hidden group"
                >
                  <span className="relative z-10">Add to Cart</span>
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MealCard;