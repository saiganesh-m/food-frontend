import React from 'react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mt-16 md:mt-24">
          <span className="inline-block mb-4 px-4 py-2 border border-orange-400/30 rounded-full bg-orange-400/10 backdrop-blur-sm animate-fade-in">
            <span className="flex flex-row items-center gap-x-2 flex-wrap">
              <span className="text-orange-400 text-lg font-medium whitespace-nowrap">Welcome to</span>
              <span className="text-orange-500 text-xl font-bold whitespace-nowrap">FeastBox</span>
            </span>
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Authentic Indian Cuisine
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600">
              Delivered to Your Door
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed animate-fade-in-up">
            Experience the rich flavors of India with our homemade meals and groceries. 
            From daily lunch boxes to party catering, we bring the taste of India to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button 
              variant="primary" 
              size="lg"
              className="text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 backdrop-blur-sm transform hover:scale-105 transition-all"
            >
              Order Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg backdrop-blur-sm border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all"
            >
              View Menu
            </Button>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 mb-8 md:mb-12 animate-fade-in-up">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">5000+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-sm text-gray-300">Authentic Dishes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">4.8</div>
              <div className="text-sm text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;