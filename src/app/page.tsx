// app/page.tsx
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SchoolCard from '@/components/SchoolCard';
import Footer from '@/components/Footer';


const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="p-8">
        <HeroSection />
        <SchoolCard />

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
