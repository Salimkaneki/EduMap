"use client";

import React, { useState } from 'react';

interface Prefecture {
  id: string;
  name: string;
  region: string;
}

interface InfrastructureFilters {
  withElectricity: boolean;
  withWater: boolean;
  withLatrine: boolean;
  allSeasonAccess: boolean;
}

// Définir une interface pour les filtres de recherche
interface SearchFiltersState extends InfrastructureFilters {
  searchTerm: string;
  region: string;
  prefecture: string;
  type: string;
}

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersState) => void;
  regions: string[];
  prefectures: Prefecture[];
  types: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  regions, 
  prefectures, 
  types 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [infrastructureFilters, setInfrastructureFilters] = useState<InfrastructureFilters>({
    withElectricity: false,
    withWater: false,
    withLatrine: false,
    allSeasonAccess: false
  });
  
  // Filtrer les préfectures en fonction de la région sélectionnée
  const filteredPrefectures = selectedRegion 
    ? prefectures.filter(prefecture => prefecture.region === selectedRegion)
    : prefectures;
  
  // Gérer les changements de filtres d'infrastructure
  const handleInfrastructureChange = (filter: keyof InfrastructureFilters) => {
    setInfrastructureFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  // Fonction pour exécuter la recherche quand l'utilisateur la demande
  const executeSearch = () => {
    onSearch({
      searchTerm,
      region: selectedRegion,
      prefecture: selectedPrefecture,
      type: selectedType,
      ...infrastructureFilters
    });
  };
  
  // SUPPRIMER LE useEffect qui cause la boucle infinie
  // useEffect(() => {
  //   handleSearch();
  // }, [handleSearch]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Rechercher un établissement</h2>
      
      {/* Champ de recherche */}
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center pl-6 flex-grow">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Rechercher par nom d'établissement..."
              className="w-full py-4 bg-transparent focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeSearch()}
            />
          </div>
          <button 
            className="bg-black hover:bg-gray-800 text-white p-4 rounded-full flex items-center justify-center mr-1 transition-colors"
            onClick={executeSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Filtres de localisation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedPrefecture(''); // Réinitialiser la préfecture quand la région change
            }}
          >
            <option value="">Toutes les régions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Préfecture</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={selectedPrefecture}
            onChange={(e) => setSelectedPrefecture(e.target.value)}
            disabled={!selectedRegion}
          >
            <option value="">Toutes les préfectures</option>
            {filteredPrefectures.map(prefecture => (
              <option key={prefecture.id} value={prefecture.name}>{prefecture.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type d&apos;établissement</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tous types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Filtres d'infrastructure */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Infrastructures disponibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center">
            <input
              id="electricity"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-gray-400 border-gray-300 rounded"
              checked={infrastructureFilters.withElectricity}
              onChange={() => handleInfrastructureChange('withElectricity')}
            />
            <label htmlFor="electricity" className="ml-2 text-sm text-gray-700">
              Électricité
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="water"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-gray-400 border-gray-300 rounded"
              checked={infrastructureFilters.withWater}
              onChange={() => handleInfrastructureChange('withWater')}
            />
            <label htmlFor="water" className="ml-2 text-sm text-gray-700">
              Accès à l&apos;eau
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="latrine"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-gray-400 border-gray-300 rounded"
              checked={infrastructureFilters.withLatrine}
              onChange={() => handleInfrastructureChange('withLatrine')}
            />
            <label htmlFor="latrine" className="ml-2 text-sm text-gray-700">
              Latrines
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="allSeason"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-gray-400 border-gray-300 rounded"
              checked={infrastructureFilters.allSeasonAccess}
              onChange={() => handleInfrastructureChange('allSeasonAccess')}
            />
            <label htmlFor="allSeason" className="ml-2 text-sm text-gray-700">
              Accès toute saison
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;