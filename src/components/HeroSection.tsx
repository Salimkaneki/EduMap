"use client";

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [niveau, setNiveau] = useState('Tous');

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

        {/* Barre de recherche améliorée */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Icône de recherche */}
            <div className="pl-6 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            
            {/* Champ de recherche */}
            <input
              type="text"
              placeholder="Rechercher un établissement par nom, localisation..."
              className="w-full py-4 px-3 bg-transparent focus:outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Dropdown amélioré */}
            <div className="border-l border-gray-200 h-full flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center justify-between w-[120px] h-full py-4 px-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium rounded-none focus:bg-gray-50 focus:outline-none"
                  >
                    {niveau}
                    <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[120px] p-1 border border-gray-200 rounded-lg shadow-lg">
                  <DropdownMenuItem 
                    onClick={() => setNiveau("Tous")} 
                    className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Tous
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setNiveau("Primaire")} 
                    className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Primaire
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setNiveau("Secondaire")} 
                    className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Secondaire
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setNiveau("Supérieur")} 
                    className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Supérieur
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Bouton de recherche */}
            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-full flex items-center justify-center ml-1 mr-1 transition-colors">
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
      </div>
    </div>
  );
};

export default HeroSection;