import React, { useState } from 'react';
import { Meal } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, Star } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
    addToCart({
      id: meal.id,
      name: meal.name,
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={meal.image} 
                alt={meal.name} 
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900">{meal.name}</h2>
              {getMealTypeBadge(meal.type)}
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {meal.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900 capitalize bg-gray-50 px-3 py-1 rounded-full">
                  {meal.category.replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Price</span>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  ${(meal.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Quantity:</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(quantity - 1);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleManualQuantityChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 text-center border rounded-lg py-1 px-2"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(quantity + 1);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                variant="primary" 
                fullWidth
                size="lg"
                onClick={handleAddToCart}
                className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 text-lg"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MealCard;