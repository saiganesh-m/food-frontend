import React, { useState } from 'react';
import { Meal } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { useCart } from '../../context/CartContext';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      type: 'meal',
    });
    setIsModalOpen(false);
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
        className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {meal.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {meal.name}
            </h3>
            {getMealTypeBadge(meal.type)}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              ${meal.price.toFixed(2)}
            </span>
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
                  ${meal.price.toFixed(2)}
                </span>
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