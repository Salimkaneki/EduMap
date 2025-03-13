"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="border-b border-gray-200 bg-white py-4 px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - maintenant en noir */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-black font-bold text-2xl transition-colors hover:text-gray-700">
            EduMap
          </Link>
        </div>

        {/* Barre de recherche centrale réduite */}
        <div className="hidden md:block w-1/3 relative">
          <div className={`flex items-center w-full rounded-full border ${searchFocused ? 'border-gray-400 ring-2 ring-gray-100 shadow-lg' : 'border-gray-300 shadow-sm hover:shadow-md'} transition-all duration-200`}>
            <div className="flex-1 flex items-center pl-6 pr-2 py-3">
              {/* Icône de recherche intégrée à l'input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Rechercher un établissement"
                className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <button className="bg-black hover:bg-gray-800 p-3 rounded-full text-white mr-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          {/* Suggestions (apparaissent lorsque focus) */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <p className="text-sm font-medium text-gray-800 mb-2">Recherches récentes</p>
              <div className="space-y-2">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                  <span className="text-gray-600">École Polytechnique</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                  <span className="text-gray-600">Université de Paris</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation et profil */}
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hidden md:inline-block text-gray-700 hover:text-gray-900 font-medium">
            À propos
          </Link>
          <Link href="/map" className="hidden md:inline-block text-gray-700 hover:text-gray-900 font-medium">
            Établissements
          </Link>
          <Link href="/interactive-map" className="hidden md:inline-block text-gray-700 hover:text-gray-900 font-medium">
            Carte Interactive
          </Link>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Icône globe simple */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
          
          {/* Nouveau bouton de connexion */}
          <Link href="/login" className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="font-medium">Se connecter</span>
          </Link>
        </div>
      </div>
      
      {/* Barre de recherche mobile améliorée */}
      <div className="md:hidden mt-4">
        <div className="flex items-center w-1/2 mx-auto rounded-full border border-gray-300 shadow-sm hover:shadow-md">
          <div className="flex items-center px-4 py-3 flex-grow">
            {/* Icône de recherche simplifiée */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un établissement"
              className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>
        
        {/* Navigation mobile - ajout du lien Carte Interactive et Se connecter */}
        <div className="flex justify-center space-x-4 mt-3">
          <Link href="/about" className="text-gray-700 text-sm hover:text-gray-900 font-medium">
            À propos
          </Link>
          <Link href="/map" className="text-gray-700 text-sm hover:text-gray-900 font-medium">
            Établissements
          </Link>
          <Link href="/interactive-map" className="text-gray-700 text-sm hover:text-gray-900 font-medium">
            Carte Interactive
          </Link>
        </div>
        
        {/* Bouton de connexion mobile */}
        <div className="flex justify-center mt-3">
          <Link href="/login" className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="font-medium text-sm">Se connecter</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;