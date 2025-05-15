import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedMeals from '../components/home/FeaturedMeals';
import { meals } from '../data/meals';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedMeals meals={meals} />
    </>
  );
};

export default HomePage;