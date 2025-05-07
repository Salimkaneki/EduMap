// components/map/MapLegend.tsx
import React, { useState } from 'react';

const MapLegend: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[999] transition-all ${isCollapsed ? 'w-10' : 'w-64'}`}
      aria-label="Légende de la carte"
    >
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Développer la légende" : "Réduire la légende"}
      >
        {isCollapsed ? '▼' : '▲'}
      </button>
      
      {!isCollapsed && (
        <>
          <h4 className="font-bold text-sm mb-2">Légende</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2" aria-hidden="true"></div>
              <span>Toutes infrastructures</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" aria-hidden="true"></div>
              <span>Électricité et eau</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2" aria-hidden="true"></div>
              <span>Sans électricité ni eau</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" aria-hidden="true"></div>
              <span>Autres configurations</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapLegend;