import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const categories = [
    { id: '/', label: 'Home' },
    { id: '/lunch-box', label: 'Lunch Box' },
    { id: '/cloud-kitchen', label: 'Cloud Kitchen' },
    { id: '/party-orders', label: 'Party Orders' },
    { id: '/groceries', label: 'Home Made Groceries' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-orange-500">FeastBox</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.id}
              className={`text-base font-medium transition-colors hover:text-orange-500 ${
                location.pathname === category.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-700'
              }`}
            >
              {category.label}
            </Link>
          ))}
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 cursor-pointer" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="ml-4 md:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between p-4 border-b">
            <h1 className="text-2xl font-bold text-orange-500">FeastBox</h1>
            <button onClick={toggleMobileMenu}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.id}
                onClick={toggleMobileMenu}
                className={`text-base font-medium p-2 transition-colors ${
                  location.pathname === category.id 
                    ? 'text-orange-500 bg-orange-50 rounded' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded'
                }`}
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;