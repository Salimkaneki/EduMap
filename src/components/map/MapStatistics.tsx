// components/map/MapStatistics.tsx
import React from 'react';

interface MapStatisticsProps {
  stats: {
    total: number;
    withElectricity: number;
    withWater: number;
    withLatrine: number;
  };
}

const MapStatistics: React.FC<MapStatisticsProps> = ({ stats }) => {
  const { total, withElectricity, withWater, withLatrine } = stats;
  
  return (
    <div 
      className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md z-[999] text-xs"
      aria-label="Statistiques des établissements"
    >
      <div className="font-bold">{total} établissements</div>
      <div className="grid grid-cols-3 gap-2 mt-1">
        <div aria-label={`${Math.round((withElectricity/total || 0)*100)}% avec électricité`}>
          {Math.round((withElectricity/total || 0)*100)}% élec.
        </div>
        <div aria-label={`${Math.round((withWater/total || 0)*100)}% avec eau`}>
          {Math.round((withWater/total || 0)*100)}% eau
        </div>
        <div aria-label={`${Math.round((withLatrine/total || 0)*100)}% avec latrines`}>
          {Math.round((withLatrine/total || 0)*100)}% latr.
        </div>
      </div>
    </div>
  );
};

export default MapStatistics;