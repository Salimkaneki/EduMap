"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-black font-bold text-2xl tracking-tight transition-all duration-200 hover:text-gray-700 flex items-center">
            <span className="bg-black text-white px-2 py-1 rounded-md mr-1">Edu</span>
            <span>Map</span>
          </Link>
        </div>

        {/* Navigation au centre - visible sur desktop uniquement */}
        <div className="hidden md:flex items-center justify-center border border-gray-200 rounded-full shadow-sm overflow-hidden">
          <Link href="/about" className="px-6 py-4 text-base font-semibold hover:bg-gray-50">
            À propos
          </Link>
          <span className="border-r border-gray-200 h-6"></span>
          <Link href="/map" className="px-4 py-3 text-sm font-medium hover:bg-gray-50">
            Carte
          </Link>
          <span className="border-r border-gray-200 h-6"></span>
          <button className="px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center">
            <span>Plus</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Boutons d'action à droite - desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/host" className="text-sm font-medium px-4 py-3 rounded-full hover:bg-gray-50">
            Devenir partenaire
          </Link>
          
          <button className="p-3 rounded-full hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
          
          {/* Menu utilisateur style Airbnb */}
          <div className="relative">
            <button className="flex items-center border border-gray-200 rounded-full p-1 pl-3 pr-1 hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
              <div className="bg-gray-500 text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Menu hamburger sur mobile */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile - slide down animation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg z-40 left-0 right-0 transform transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            <Link href="/about" className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-lg hover:bg-gray-100 hover:text-black transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              À propos
            </Link>
            <Link href="/map" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-black transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              Carte
            </Link>
            <Link href="/host" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-black transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Devenir partenaire
            </Link>
            <Link href="/login" className="flex items-center px-4 py-3 mt-2 text-base font-medium bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Se connecter
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-200">
              <button className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-black transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                Langue et devise
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;