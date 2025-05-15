import React, { useState } from 'react';
import { Calendar, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const LunchBoxPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const availableDates = getNextSevenDays();

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
    },
    {
      id: 'egg',
      title: '🥚 Egg Meal',
      description: 'Egg Curry + Pulav, Masala Omelette + Naans, Sweet',
      price: 10.99,
      image: 'https://images.pexels.com/photos/12737908/pexels-photo-12737908.jpeg',
    },
    {
      id: 'veg',
      title: '🥦 Veg Meal',
      description: 'Paneer Tikka + Naans, Veg Curry + Pulav Rice, Sweet',
      price: 11.99,
      image: 'https://images.pexels.com/photos/8340088/pexels-photo-8340088.jpeg',
    },
  ];

  const handleBulkOrder = (mealId: string) => {
    const meal = mealTypes.find(m => m.id === mealId);
    if (!meal || !selectedDate) return;

    // Add 20 meals at once
    addToCart({
      id: mealId,
      name: meal.title,
      price: meal.price,
      image: meal.image,
      type: 'meal',
      quantity: 20,
    });
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
              <div className="relative h-48">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-full object-cover"
                />
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
                  onClick={() => handleBulkOrder(meal.id)}
                  disabled={!selectedDate}
                  className="shadow-lg shadow-orange-500/30"
                >
                  Order 20 Meals
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LunchBoxPage;