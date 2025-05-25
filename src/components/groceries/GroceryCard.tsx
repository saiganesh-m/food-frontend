import React, { useState } from 'react';
import { Grocery } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GroceryCardProps {
  grocery: Grocery;
}

const GroceryCard: React.FC<GroceryCardProps> = ({ grocery }) => {
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
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      image: grocery.image,
      type: 'grocery',
      quantity: quantity,
    });
    setIsModalOpen(false);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden flex-shrink-0">
          <img 
            src={grocery.image} 
            alt={grocery.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="flex flex-col flex-1 p-5 pb-4">
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
                src={grocery.image} 
                alt={grocery.name} 
                  className="w-full h-56 object-cover rounded-t-2xl"
              />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-green-500 rounded-full p-2 shadow transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>
              <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 flex-1">{grocery.name}</h2>
                  {/* Add grocery specific badges or info here if needed */}
          </div>
                <p className="text-gray-600 text-base mb-4">{grocery.description}</p>
                <div className="mb-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900 capitalize bg-gray-50 px-3 py-1 rounded-full">
                  {grocery.category}
                </span>
              </div>
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Price</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600"
                    >
                  ${(grocery.price * quantity).toFixed(2)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Quantity</span>
                    <span className="font-medium text-gray-900">
                      {grocery.quantity}
                </span>
                  </div>
              </div>

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
                      className="w-16 text-center border rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base"
                  />
                    <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(quantity + 1);
                    }}
                      className="bg-green-600 text-white hover:bg-green-700 p-2 rounded-full transition-all"
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
                  className="shadow-lg shadow-green-500/30 hover:shadow-green-500/40 text-base relative overflow-hidden group bg-green-600 hover:bg-green-700"
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

export default GroceryCard;