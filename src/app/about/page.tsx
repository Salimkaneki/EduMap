// app/about/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">À propos de notre plateforme</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
          <p className="text-lg mb-4">
            Notre plateforme vise à faciliter l'accès à l'information sur les établissements scolaires,
            permettant aux utilisateurs de trouver des écoles selon différents critères et d'évaluer 
            leur infrastructure.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fonctionnalités principales</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Recherche d'établissements par nom, localisation, type et infrastructures disponibles</li>
            <li>Visualisation des résultats sur une carte interactive</li>
            <li>Filtrage avancé pour identifier les écoles avec des infrastructures spécifiques</li>
            <li>Consultation détaillée des informations de chaque établissement</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notre équipe</h2>
          <p className="text-lg">
            Notre équipe est composée d'experts en éducation et de développeurs passionnés
            par l'amélioration de l'accès à l'information éducative.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;