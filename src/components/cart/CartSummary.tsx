import React from 'react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Your Cart</h3>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">Your Cart</h3>
      
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-center gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-medium text-gray-900 truncate">{item.name}</h4>
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
              
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span className="font-medium text-gray-900">${(totalPrice * 0.08).toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          variant="primary" 
          fullWidth 
          size="lg"
          className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;