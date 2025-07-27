"use client";

import React from 'react';

interface Establishment {
  id: string;
  nom_etablissement: string;
  region: string;
  prefecture: string;
  ville_village_quartier: string;
  libelle_type_statut_etab: string;
  libelle_type_systeme: string;
  existe_elect: 'OUI' | 'NON';
  existe_latrine: 'OUI' | 'NON';
  eau: 'OUI' | 'NON';
  acces_toute_saison: 'OUI' | 'NON';
  LATITUDE: number;
  LONGITUDE: number;
}

interface MapStatsProps {
  establishments: Establishment[];
}

const MapStats: React.FC<MapStatsProps> = ({ establishments }) => {
  const total = establishments.length;
  const withElectricity = establishments.filter(e => e.existe_elect === 'OUI').length;
  const withWater = establishments.filter(e => e.eau === 'OUI').length;
  const withLatrine = establishments.filter(e => e.existe_latrine === 'OUI').length;
  
  return (
    <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md z-[999] text-xs">
      <div className="font-bold">{total} établissements</div>
      <div className="grid grid-cols-3 gap-2 mt-1">
        <div>{Math.round((withElectricity/total || 0)*100)}% élec.</div>
        <div>{Math.round((withWater/total || 0)*100)}% eau</div>
        <div>{Math.round((withLatrine/total || 0)*100)}% latr.</div>
      </div>
    </div>
  );
};

export default MapStats;