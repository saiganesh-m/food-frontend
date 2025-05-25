import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuthModal } from '../../context/AuthModalContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [user, setUser] = useState(null);
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
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

  // Don't render the header in admin routes
  if (isAdminRoute) {
    return null;
  }

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
              className={`text-base font-medium transition-colors border-b-2 ${
                location.pathname === category.id
                  ? 'text-orange-500 border-orange-500'
                  : isScrolled
                    ? 'text-gray-700 border-transparent hover:text-orange-500'
                    : 'text-white border-transparent hover:text-orange-200'
              }`}
            >
              {category.label}
            </Link>
          ))}
        </nav>

        {/* Auth and Cart */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openAuthModal('login')}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => openAuthModal('register')}
              >
                Register
              </Button>
            </div>
          ) : (
            <button
              onClick={() => supabase.auth.signOut()}
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              Sign Out
            </button>
          )}
          
          <Link to="/cart" className="relative">
            <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'} cursor-pointer transition-colors`} />
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
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'} transition-colors`} />
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
            {!user ? (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    openAuthModal('login');
                    toggleMobileMenu();
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => {
                    openAuthModal('register');
                    toggleMobileMenu();
                  }}
                >
                  Register
                </Button>
              </div>
            ) : (
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  toggleMobileMenu();
                }}
                className="text-left p-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;