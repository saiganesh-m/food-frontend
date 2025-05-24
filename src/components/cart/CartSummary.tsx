import React from 'react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, X as LucideX } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center">
        <ShoppingCart className="w-16 h-16 text-orange-200 mb-4" />
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Your Cart</h3>
        <p className="text-gray-500 mb-2">Your cart is empty.</p>
        <p className="text-gray-400 text-sm">Add some delicious meals to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-t-xl py-2 px-2 sm:px-4 -mx-2 sm:-mx-4">
        Your Cart
      </h3>
      
      <div className="flex flex-col gap-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="relative flex items-start gap-4 bg-gradient-to-br from-orange-50/60 to-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all animate-fade-in">
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-2 right-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
              aria-label="Remove from cart"
            >
              <LucideX className="w-5 h-5" />
            </button>
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full shadow bg-white flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 break-words whitespace-normal leading-snug">{item.name}</h4>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1 sm:mt-0">
                  <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  <span className="mx-1">×</span>
                  <span>{item.quantity}</span>
                </div>
            </div>
              <div className="flex items-center gap-2 mt-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-600 p-2 rounded-full transition-all text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                  aria-label="Decrease quantity"
              >
                  <Minus className="w-5 h-5" />
              </button>
                <span className="w-10 text-center font-bold text-gray-900 text-lg select-none">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-full transition-all text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                  aria-label="Increase quantity"
              >
                  <Plus className="w-5 h-5" />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <hr className="my-6 border-t border-gray-200" />
      
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
          className="shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 text-lg py-3"
        >
          Proceed to Checkout
        </Button>
        <div className="text-center text-gray-400 text-xs mt-3">
          <span className="inline-flex items-center gap-1"><span className="text-green-500">✓</span> Secure checkout &amp; fast delivery</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;