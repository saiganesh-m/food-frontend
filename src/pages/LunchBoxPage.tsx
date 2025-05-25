import React, { useState, useEffect } from 'react';
import { Calendar, Info, ChevronLeft, ChevronRight, Minus, Plus, Heart, Star, Check, ShoppingCart, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LunchBoxPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [quantity, setQuantity] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const { items: cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  // Get next 7 days
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const availableDates = getNextSevenDays();

  // Select the first selectable date by default
  useEffect(() => {
    if (availableDates.length > 0) {
      const firstSelectable = availableDates.find(isDateSelectable);
      if (firstSelectable) {
        setSelectedDate(firstSelectable);
      } else {
        setSelectedDate(null);
      }
    }
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(18, 0, 0, 0); // 6 PM cutoff

    if (date.getDate() === today.getDate() + 1) {
      return new Date() < cutoffTime;
    }
    return true;
  };

  const mealTypes = [
    {
      id: 'chicken',
      title: '🐔 Chicken Meal',
      description: 'Butter Chicken + Naans, Chicken Curry + Pulav Rice, Sweet',
      price: 12.99,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      details: {
        mainDish: {
          name: 'Butter Chicken',
          quantity: '8 oz',
          calories: 450,
          protein: '32g',
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
        },
        dessert: {
          name: 'Gulab Jamun',
          quantity: '2 pieces',
          calories: 150,
          protein: '2g',
        },
      },
    },
    {
      id: 'egg',
      title: '🥚 Egg Meal',
      description: 'Egg Curry + Pulav, Masala Omelette + Naans, Sweet',
      price: 10.99,
      image: 'https://images.pexels.com/photos/12737908/pexels-photo-12737908.jpeg',
      details: {
        mainDish: {
          name: 'Egg Curry',
          quantity: '8 oz',
          calories: 380,
          protein: '24g',
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
        },
        dessert: {
          name: 'Kheer',
          quantity: '4 oz',
          calories: 180,
          protein: '4g',
        },
      },
    },
    {
      id: 'veg',
      title: '🥦 Veg Meal',
      description: 'Paneer Tikka + Naans, Veg Curry + Pulav Rice, Sweet',
      price: 11.99,
      image: 'https://images.pexels.com/photos/8340088/pexels-photo-8340088.jpeg',
      details: {
        mainDish: {
          name: 'Paneer Tikka Masala',
          quantity: '8 oz',
          calories: 420,
          protein: '22g',
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
        },
        dessert: {
          name: 'Rasmalai',
          quantity: '2 pieces',
          calories: 160,
          protein: '4g',
        },
      },
    },
  ];

  const handleQuantityChange = (value: number) => {
    if (value >= 20) {
      setQuantity(value);
    }
  };

  const handleManualQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 20) {
      setQuantity(value);
    }
  };

  const handleBulkOrder = () => {
    if (!selectedMeal) return;

    const dateKey = selectedDate
      ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
      : '';
    const cartItem = {
      id: `${selectedMeal.id}-${dateKey}`,
      name: `${selectedMeal.title} (${formatDate(selectedDate!)})`,
      price: selectedMeal.price,
      image: selectedMeal.image,
      type: 'meal' as const,
      quantity: quantity,
    };

    addToCart(cartItem);
    setIsModalOpen(false);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 1000);
    setShowCartPreview(true);
    setTimeout(() => setShowCartPreview(false), 3000);
  };

  const openMealDetails = (meal: any) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const totalCalories = (details: any) => {
    return Object.values(details).reduce((sum: number, item: any) => sum + item.calories, 0);
  };

  const totalProtein = (details: any) => {
    return Object.values(details).reduce((sum: number, item: any) => {
      const protein = parseInt(item.protein);
      return sum + protein;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Floating Cart Preview */}
      <AnimatePresence>
        {showCartPreview && selectedMeal && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed left-1/2 bottom-8 z-50 bg-white rounded-xl shadow-2xl border border-orange-100 p-4 max-w-sm w-full mx-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                Added to Cart
              </h3>
              <button
                onClick={() => setShowCartPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={selectedMeal.image}
                alt={selectedMeal.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{selectedMeal.title}</p>
                <p className="text-sm text-gray-600">
                  {quantity} meals · ${(selectedMeal.price * quantity).toFixed(2)}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4">Order Fresh Meals in Bulk</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl opacity-90 mb-8">Pre-order delicious Indian meals for your organization. Minimum 20 meals per day.</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4">
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-semibold">Plan Your Order</button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Menu
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-xl shadow-sm p-6 pt-10 mb-8 border border-gray-100 mt-0 md:mt-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Select Delivery Date
            </h2>
            <div className="flex items-center text-sm text-gray-600 bg-orange-50 px-3 py-1.5 rounded-full mt-2 sm:mt-0 w-fit">
              <Info className="w-4 h-4 mr-2 text-orange-500" />
              Orders must be placed 1 day in advance
            </div>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {availableDates.map((date) => {
              const isSelectable = isDateSelectable(date);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <motion.button
                  key={date.toISOString()}
                  onClick={() => isSelectable && setSelectedDate(date)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={
                    `flex-shrink-0 p-4 pt-6 mt-2 rounded-lg border-2 transition-all relative ` +
                    (isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md'
                      : isSelectable
                        ? 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed')
                    }
                  style={{ minWidth: 120 }}
                >
                  <div className="text-sm font-medium">{formatDate(date)}</div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 -right-2 bg-orange-500 text-white rounded-full p-1"
                    >
                      <Check className="w-3 h-3" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Meal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealTypes.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col"
            >
              <div 
                className="relative h-48 cursor-pointer"
                onClick={() => openMealDetails(meal)}
              >
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold text-lg bg-orange-500/80 px-4 py-2 rounded-full shadow-lg transform transition-transform group-hover:scale-105">
                    View Details
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-orange-500" />
                  </button>
                </div>
                {meal.id === 'chicken' && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    Best Seller
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {meal.title}
                </h3>
                <p className="text-gray-600 mb-4">{meal.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    ${meal.price}
                  </span>
                  <span className="text-sm text-gray-500">per meal</span>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => openMealDetails(meal)}
                  disabled={!selectedDate}
                  className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 text-lg py-2 mt-auto transition-all duration-300 transform hover:scale-105"
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Meal Details Modal */}
      <AnimatePresence>
      {selectedMeal && (
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
                src={selectedMeal.image}
                alt={selectedMeal.title}
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
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{totalCalories(selectedMeal.details)} cal</span>
            </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{totalProtein(selectedMeal.details)}g protein</span>
                      </div>
                    </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span>{selectedMeal.title}</span>
                </h2>
                <p className="text-gray-600 text-base mb-4">{selectedMeal.description}</p>
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Meal Details</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-orange-50 text-gray-700">
                          <th className="px-3 py-2 text-left font-semibold">Type</th>
                          <th className="px-3 py-2 text-left font-semibold">Item</th>
                          <th className="px-3 py-2 text-left font-semibold">Quantity</th>
                          <th className="px-3 py-2 text-left font-semibold">Calories</th>
                          <th className="px-3 py-2 text-left font-semibold">Protein</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedMeal.details).map(([key, value]: [string, any], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-3 py-2 font-medium capitalize text-gray-800">{key}</td>
                            <td className="px-3 py-2 text-gray-700">{value.name}</td>
                            <td className="px-3 py-2 text-gray-700">{value.quantity}</td>
                            <td className="px-3 py-2 text-gray-700">{value.calories} cal</td>
                            <td className="px-3 py-2 text-gray-700">{value.protein}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </div>
                <div className="flex items-center justify-between mb-2 mt-2">
                  <span className="text-gray-900 font-medium text-sm">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-600 p-2 rounded-full transition-all text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 20}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <motion.input
                      type="number"
                      min="20"
                      value={quantity}
                      onChange={handleManualQuantityChange}
                      className="w-16 text-center border rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base"
                      whileFocus={{ scale: 1.05 }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-full transition-all text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900 font-medium text-sm">Total Price:</span>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-orange-600"
                  >
                    ${(selectedMeal.price * quantity).toFixed(2)}
                  </motion.span>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={handleBulkOrder}
                  className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 text-base relative overflow-hidden group"
                >
                  <span className="relative z-10">Order Now</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ scale: 1.1 }}
                  />
                </Button>
              </div>
            </motion.div>
        </Modal>
      )}
      </AnimatePresence>
    </div>
  );
};

export default LunchBoxPage;