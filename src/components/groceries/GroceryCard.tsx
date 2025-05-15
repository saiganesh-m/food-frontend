import React, { useState } from 'react';
import { Grocery } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useCart } from '../../context/CartContext';

interface GroceryCardProps {
  grocery: Grocery;
}

const GroceryCard: React.FC<GroceryCardProps> = ({ grocery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      image: grocery.image,
      type: 'grocery',
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={grocery.image} 
            alt={grocery.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              {grocery.name}
            </h3>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              {grocery.quantity}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {grocery.description}
          </p>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-2xl font-bold text-gray-900">${grocery.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={grocery.image} 
                alt={grocery.name} 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{grocery.name}</h2>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                {grocery.quantity}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {grocery.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900 capitalize">
                  {grocery.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Price</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${grocery.price.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                variant="primary" 
                fullWidth
                size="lg"
                onClick={handleAddToCart}
                className="shadow-lg shadow-green-500/30 hover:shadow-green-500/40 bg-green-600 hover:bg-green-700 focus:ring-green-500"
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

export default GroceryCard;