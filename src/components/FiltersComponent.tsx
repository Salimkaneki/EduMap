// components/FiltersComponent.jsx
import React, { useState, useEffect } from 'react';

const FiltersComponent = ({ onFilterChange, regions, prefectures, types }) => {
  const [filters, setFilters] = useState({
    region: '',
    prefecture: '',
    type: '',
    hasElectricity: false,
    hasLatrines: false,
    hasWater: false,
    allSeasonAccess: false,
    searchTerm: ''
  });
  
  const [availablePrefectures, setAvailablePrefectures] = useState([]);
  
  useEffect(() => {
    // Mettre à jour les préfectures disponibles en fonction de la région sélectionnée
    if (filters.region) {
      const prefecturesInRegion = prefectures.filter(p => p.region === filters.region);
      setAvailablePrefectures(prefecturesInRegion);
    } else {
      setAvailablePrefectures(prefectures);
    }
  }, [filters.region, prefectures]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    const updatedFilters = {
      ...filters,
      [name]: newValue
    };
    
    // Réinitialiser la préfecture si la région change
    if (name === 'region') {
      updatedFilters.prefecture = '';
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      region: '',
      prefecture: '',
      type: '',
      hasElectricity: false,
      hasLatrines: false,
      hasWater: false,
      allSeasonAccess: false,
      searchTerm: ''
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filtrer les établissements</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="searchTerm">
          Recherche par nom
        </label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Nom de l'établissement..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="region">
            Région
          </label>
          <select
            id="region"
            name="region"
            value={filters.region}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Toutes les régions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="prefecture">
            Préfecture
          </label>
          <select
            id="prefecture"
            name="prefecture"
            value={filters.prefecture}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            disabled={!filters.region}
          >
            <option value="">Toutes les préfectures</option>
            {availablePrefectures.map(prefecture => (
              <option key={prefecture.id} value={prefecture.name}>
                {prefecture.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="type">
          Type d'établissement
        </label>
        <select
          id="type"
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Tous les types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Infrastructures disponibles</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasElectricity"
              name="hasElectricity"
              checked={filters.hasElectricity}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="hasElectricity">Électricité</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasLatrines"
              name="hasLatrines"
              checked={filters.hasLatrines}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="hasLatrines">Latrines</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasWater"
              name="hasWater"
              checked={filters.hasWater}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="hasWater">Eau</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allSeasonAccess"
              name="allSeasonAccess"
              checked={filters.allSeasonAccess}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="allSeasonAccess">Accès toute saison</label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={() => onFilterChange(filters)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default FiltersComponent;