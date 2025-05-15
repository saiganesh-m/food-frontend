import React, { useState } from 'react';
import { Calendar, Info, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useCart } from '../context/CartContext';

const LunchBoxPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [quantity, setQuantity] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

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

  const availableDates = getNextSevenDays();

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
          description: 'Tender chicken in a rich, creamy tomato-based sauce'
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
          description: 'Fragrant basmati rice cooked with aromatic spices'
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
          description: 'Freshly baked traditional Indian flatbread'
        },
        dessert: {
          name: 'Gulab Jamun',
          quantity: '2 pieces',
          calories: 150,
          protein: '2g',
          description: 'Sweet milk dumplings in rose-flavored syrup'
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
          description: 'Boiled eggs in a rich, spiced curry sauce'
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
          description: 'Fragrant basmati rice cooked with aromatic spices'
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
          description: 'Freshly baked traditional Indian flatbread'
        },
        dessert: {
          name: 'Kheer',
          quantity: '4 oz',
          calories: 180,
          protein: '4g',
          description: 'Creamy rice pudding with cardamom and nuts'
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
          description: 'Grilled cottage cheese in a creamy tomato sauce'
        },
        sideDish: {
          name: 'Pulav Rice',
          quantity: '6 oz',
          calories: 250,
          protein: '5g',
          description: 'Fragrant basmati rice cooked with aromatic spices'
        },
        bread: {
          name: 'Naan',
          quantity: '2 pieces',
          calories: 260,
          protein: '8g',
          description: 'Freshly baked traditional Indian flatbread'
        },
        dessert: {
          name: 'Rasmalai',
          quantity: '2 pieces',
          calories: 160,
          protein: '4g',
          description: 'Soft cottage cheese dumplings in sweet milk'
        },
      },
    },
  ];

  const handleQuantityChange = (value: number) => {
    if (value >= 20) {
      setQuantity(value);
    }
  };

  const handleBulkOrder = () => {
    if (!selectedMeal) return;

    addToCart({
      id: selectedMeal.id,
      name: selectedMeal.title,
      price: selectedMeal.price,
      image: selectedMeal.image,
      type: 'meal',
      quantity: quantity,
    });
    setIsModalOpen(false);
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
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Fresh Meals in Bulk
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Pre-order delicious Indian meals for your organization. Minimum 20 meals per day.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Plan Your Order
              </Button>
              <Button 
                variant="primary"
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Select Delivery Date</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Info className="w-4 h-4 mr-2" />
              Orders must be placed 1 day in advance
            </div>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {availableDates.map((date) => {
              const isSelectable = isDateSelectable(date);
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => isSelectable && setSelectedDate(date)}
                  className={`
                    flex-shrink-0 p-4 rounded-lg border transition-all
                    ${selectedDate?.toDateString() === date.toDateString()
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : isSelectable
                        ? 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="text-sm font-medium">{formatDate(date)}</div>
                </button>
              );
            })}
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Meal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealTypes.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div 
                className="relative h-48 cursor-pointer group"
                onClick={() => openMealDetails(meal)}
              >
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-6 py-2 border-2 border-white/50 rounded-full backdrop-blur-sm">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {meal.title}
                </h3>
                <p className="text-gray-600 mb-4">{meal.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${meal.price}
                  </span>
                  <span className="text-sm text-gray-500">per meal</span>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => openMealDetails(meal)}
                  disabled={!selectedDate}
                  className="shadow-lg shadow-orange-500/30"
                >
                  Order Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col md:flex-row md:h-[600px] gap-8">
            <div className="md:w-1/2 h-full flex flex-col">
              <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={selectedMeal.image}
                  alt={selectedMeal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full mb-2">
                    {selectedMeal.id === 'chicken' ? 'Non-Veg' : selectedMeal.id === 'veg' ? 'Vegetarian' : 'Egg'}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedMeal.title}</h2>
                  <p className="text-white/90 text-lg">{selectedMeal.description}</p>
                </div>
              </div>
              
              <div className="flex-1 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
                    <span className="block text-sm text-gray-600 mb-1">Total Calories</span>
                    <span className="text-3xl font-bold text-orange-600">
                      {totalCalories(selectedMeal.details)}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">kcal per meal</span>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
                    <span className="block text-sm text-gray-600 mb-1">Total Protein</span>
                    <span className="text-3xl font-bold text-orange-600">
                      {totalProtein(selectedMeal.details)}g
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">per meal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {Object.entries(selectedMeal.details).map(([key, value]: [string, any]) => (
                  <div 
                    key={key}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{value.name}</h3>
                      <span className="px-3 py-1 bg-white text-sm font-medium text-gray-600 rounded-full shadow-sm">
                        {value.quantity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{value.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="block text-xs text-gray-500">Calories</span>
                        <span className="font-medium text-gray-900">{value.calories} kcal</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="block text-xs text-gray-500">Protein</span>
                        <span className="font-medium text-gray-900">{value.protein}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-900 font-medium">Quantity:</span>
                  <div className="flex items-center gap-4 bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-2 rounded-lg shadow-sm">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      disabled={quantity <= 20}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-orange-100 to-orange-50 p-6 rounded-xl shadow-sm">
                  <div>
                    <span className="block text-sm text-gray-600">Total Price</span>
                    <span className="text-3xl font-bold text-orange-600">
                      ${(selectedMeal.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-600">Per Meal</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${selectedMeal.price}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleBulkOrder}
                  disabled={!selectedDate}
                  className="shadow-lg shadow-orange-500/30 text-lg"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LunchBoxPage;