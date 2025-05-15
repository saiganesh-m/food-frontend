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
        <div className="max-w-3xl">
          <span className="inline-block text-orange-400 text-lg font-medium mb-4 px-4 py-2 border border-orange-400/30 rounded-full bg-orange-400/10 backdrop-blur-sm">
            Welcome to FeastBox
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Authentic Indian Cuisine
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600">
              Delivered to Your Door
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed">
            Experience the rich flavors of India with our homemade meals and groceries. 
            From daily lunch boxes to party catering, we bring the taste of India to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg"
              className="text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 backdrop-blur-sm"
            >
              Order Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg backdrop-blur-sm border-white/30 text-white hover:bg-white/10"
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;