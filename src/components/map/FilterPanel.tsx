// components/map/FilterPanel.tsx
import React from 'react';

interface FilterPanelProps {
  filters: {
    withElectricity?: boolean;
    withWater?: boolean;
    withLatrine?: boolean;
    allSeasonAccess?: boolean;
    type?: string;
    region?: string;
  };
  onFilterChange: (filterKey: string, value: boolean | string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <div 
      className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-[999] w-64"
      role="region"
      aria-label="Filtres rapides"
    >
      <h4 className="font-bold text-sm mb-2">Filtres rapides</h4>
      <div className="space-y-2">
        <label className="flex items-center text-sm">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={filters.withElectricity || false} 
            onChange={(e) => onFilterChange('withElectricity', e.target.checked)}
            aria-label="Filtrer par électricité"
          />
          Avec électricité
        </label>
        <label className="flex items-center text-sm">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={filters.withWater || false} 
            onChange={(e) => onFilterChange('withWater', e.target.checked)}
            aria-label="Filtrer par eau"
          />
          Avec eau
        </label>
        <label className="flex items-center text-sm">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={filters.withLatrine || false} 
            onChange={(e) => onFilterChange('withLatrine', e.target.checked)}
            aria-label="Filtrer par latrines"
          />
          Avec latrines
        </label>
        <label className="flex items-center text-sm">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={filters.allSeasonAccess || false} 
            onChange={(e) => onFilterChange('allSeasonAccess', e.target.checked)}
            aria-label="Filtrer par accès toute saison"
          />
          Accès toute saison
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;