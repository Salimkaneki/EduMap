"use client";

import React, { useState } from 'react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Trouvez l&apos;établissement parfait <br /> près de chez vous.
        </h1>

        {/* Sous-titre */}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Explorez et trouvez les établissements scolaires selon leur localisation, 
          leurs infrastructures et leurs caractéristiques.
        </p>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center pl-6 flex-grow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Rechercher un établissement par nom, localisation..."
                className="w-full py-4 bg-transparent focus:outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative border-l border-gray-200">
              <select className="appearance-none bg-transparent pl-4 pr-8 py-4 focus:outline-none text-gray-600">
                <option>Tous</option>
                <option>Primaire</option>
                <option>Secondaire</option>
                <option>Supérieur</option>
              </select>
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 5L11 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-full flex items-center justify-center mr-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Filtres par type d'établissement */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-sm">
          <span className="text-gray-700 font-medium">Filtrer par type :</span>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium text-gray-800">Public</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium text-gray-800">Privé Laïc</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium text-gray-800">Privé Protestant</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium text-gray-800">Privé Catholique</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium text-gray-800">Privé Islamique</button>
        </div>
        
        {/* Recherches populaires */}
        {/* <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
          <span className="text-gray-500">Recherches populaires :</span>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">écoles primaires</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">lycées Lomé</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">avec électricité</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">accès eau</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">région Maritime</button>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;