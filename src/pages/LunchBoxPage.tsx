import React from 'react';
import { Package } from 'lucide-react';

const LunchBoxPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Lunch Box</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content will be added here */}
      </div>
    </div>
  );
};

export default LunchBoxPage;