import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ModernSchoolsGrid from '@/components/ModernSchoolsGrid';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <HeroSection />
        <ModernSchoolsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
