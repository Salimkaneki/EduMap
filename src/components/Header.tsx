"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/about", label: "À propos", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/etablissements", label: "Etablissement", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    // { href: "#", label: "Ressources", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { href: "#", label: "Contact", icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
  ];

  const Icon = ({ path, className = "w-5 h-5" }: { path: string; className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );

  return (
    <div className="font-['Poppins',sans-serif]">
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo avec nouveau style */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  EduMap
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Carte Interactive</p>
              </div>
            </Link>

            {/* Navigation principale - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <Icon
                    path={icon}
                    className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                  />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions à droite - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/etablissements"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon
                  path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  className="w-5 h-5"
                />
              </Link>

              {/* <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Icon path="M15 17h5l-5 5v-5zM4 3h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button> */}

              <div className="w-px h-6 bg-gray-300"></div>

              {/* <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                Connexion
              </Link> */}

              <Link
                href="/etablissements"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors shadow-sm"
              >
                Rechercher
              </Link>
            </div>

            {/* Menu mobile - Bouton */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Icon
                path={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Menu mobile - Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon path={icon} className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                {/* <Link 
                  href="/auth/sign-in" 
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon path="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" className="w-5 h-5 mr-3" />
                  Connexion
                </Link> */}

                <Link
                  href="/etablissements"
                  className="flex items-center px-4 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon
                    path="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    className="w-5 h-5 mr-3"
                  />
                  Rechercher
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;