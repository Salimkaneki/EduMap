"use client";

import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, School, Users, Award, Search, Filter } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [niveau, setNiveau] = useState('Tous');
  const [selectedType, setSelectedType] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Animation d'entrée
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Types d'établissements avec icônes
  const typeFilters = [
    { id: 'public', label: 'Public', icon: '🏛️' },
    { id: 'prive-laic', label: 'Privé Laïc', icon: '🏢' },
    { id: 'prive-protestant', label: 'Privé Protestant', icon: '⛪' },
    { id: 'prive-catholique', label: 'Privé Catholique', icon: '✝️' },
    { id: 'prive-islamique', label: 'Privé Islamique', icon: '☪️' }
  ];

  // Statistiques animées
  const stats = [
    { number: '2,500+', label: 'Établissements', icon: School },
    { number: '850K+', label: 'Élèves', icon: Users },
    { number: '50+', label: 'Villes', icon: MapPin },
    { number: '95%', label: 'Satisfaction', icon: Award }
  ];

  const handleSearch = () => {
    console.log('Recherche:', searchQuery, 'Niveau:', niveau, 'Type:', selectedType);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-4 overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2D55FB] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1B3295] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#2D55FB] to-[#1B3295] rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Titre principal avec animation */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Trouvez l&apos;établissement{' '}
            <span className="bg-gradient-to-r from-[#2D55FB] to-[#1B3295] bg-clip-text text-transparent animate-pulse">
              parfait
            </span>
            <br />
            près de chez vous.
          </h1>
        </div>

        {/* Sous-titre avec animation décalée */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explorez et découvrez les établissements scolaires selon leur localisation, 
            leurs infrastructures et leurs caractéristiques. Une recherche intelligente 
            pour un choix éclairé.
          </p>
        </div>

        {/* Barre de recherche premium */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 p-2">
              {/* Champ de recherche principal */}
              <div className="flex items-center flex-1 px-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Rechercher un établissement, une ville..."
                  className="w-full py-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Séparateur */}
              <div className="hidden md:block w-px h-12 bg-gray-200"></div>
              
              {/* Dropdown niveau */}
              <div className="flex items-center px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center justify-between min-w-[140px] h-full py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-xl focus:bg-gray-50 focus:outline-none transition-colors"
                    >
                      {niveau}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[140px] p-2 border border-gray-200 rounded-xl shadow-lg bg-white">
                    {['Tous', 'Primaire', 'Secondaire', 'Supérieur'].map((option) => (
                      <DropdownMenuItem 
                        key={option}
                        onClick={() => setNiveau(option)} 
                        className="py-3 px-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bouton de recherche */}
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#2D55FB] to-[#1B3295] hover:from-[#1B3295] hover:to-[#2D55FB] text-white p-4 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Filtres par type avec amélioration */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-gray-700" />
              <span className="text-gray-800 font-medium">Filtrer par type :</span>
            </div>
            {typeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedType(selectedType === filter.id ? '' : filter.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 transform hover:scale-105 font-medium ${
                  selectedType === filter.id
                    ? 'bg-gradient-to-r from-[#2D55FB] to-[#1B3295] text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <span className="text-sm">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistiques avec animation */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-[#2D55FB] group-hover:text-[#1B3295] transition-colors" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action secondaire */}
        <div className={`transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mt-16 text-center">
            <p className="text-gray-700 mb-4">Vous êtes un établissement scolaire ?</p>
            <button className="text-[#2D55FB] hover:text-[#1B3295] font-medium underline underline-offset-4 transition-colors">
              Ajoutez votre établissement →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;