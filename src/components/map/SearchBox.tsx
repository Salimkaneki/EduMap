"use client";

import React, { useState, useEffect } from 'react';
import { Establishment } from '../types';

interface SearchBoxProps {
  establishments: Establishment[];
  onSelect: (establishment: Establishment) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ establishments, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Establishment[]>([]);
  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filteredResults = establishments.filter(e => 
        e.nom_etablissement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.ville_village_quartier?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, establishments]);
  
  const handleSelect = (establishment: Establishment) => {
    onSelect(establishment);
    setSearchTerm("");
    setShowResults(false);
  };
  
  return (
    <div className="absolute top-4 left-4 z-[999] w-64">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un établissement..."
          className="w-full p-2 pl-8 rounded-lg border border-gray-300 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
        />
        <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {results.length > 0 ? (
              results.map((establishment, index) => (
                <div 
                  key={`search-${establishment.id || index}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 text-sm"
                  onClick={() => handleSelect(establishment)}
                >
                  <div className="font-medium">{establishment.nom_etablissement}</div>
                  <div className="text-xs text-gray-600">
                    {establishment.ville_village_quartier}, {establishment.prefecture}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">Aucun résultat trouvé</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;