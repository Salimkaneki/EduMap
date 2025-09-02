// components/map/EstablishmentDetails.tsx
import React from 'react';
import type { Establishment } from '@/types/types';

interface EstablishmentDetailsProps {
  establishment: Establishment;
  onClose: () => void;
}

const EstablishmentDetails: React.FC<EstablishmentDetailsProps> = ({ establishment, onClose }) => {
  return (
    <div 
      className="absolute bottom-20 left-5 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]"
      role="dialog"
      aria-labelledby="establishment-title"
    >
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={onClose}
        aria-label="Fermer les détails"
      >
        ✕
      </button>
      <h3 id="establishment-title" className="font-bold">{establishment.nom_etablissement}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {establishment.ville_village_quartier}, {establishment.prefecture}
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <span 
          className={establishment.existe_elect === 'OUI' ? 'text-green-600' : 'text-red-600'}
          aria-label={`Électricité: ${establishment.existe_elect === 'OUI' ? 'Oui' : 'Non'}`}
        >
          {establishment.existe_elect === 'OUI' ? '✓' : '✗'} Électricité
        </span>
        <span 
          className={establishment.eau === 'OUI' ? 'text-green-600' : 'text-red-600'}
          aria-label={`Eau: ${establishment.eau === 'OUI' ? 'Oui' : 'Non'}`}
        >
          {establishment.eau === 'OUI' ? '✓' : '✗'} Eau
        </span>
        <span 
          className={establishment.existe_latrine === 'OUI' ? 'text-green-600' : 'text-red-600'}
          aria-label={`Latrines: ${establishment.existe_latrine === 'OUI' ? 'Oui' : 'Non'}`}
        >
          {establishment.existe_latrine === 'OUI' ? '✓' : '✗'} Latrines
        </span>
        <span 
          className={establishment.acces_toute_saison === 'OUI' ? 'text-green-600' : 'text-red-600'}
          aria-label={`Accès toute saison: ${establishment.acces_toute_saison === 'OUI' ? 'Oui' : 'Non'}`}
        >
          {establishment.acces_toute_saison === 'OUI' ? '✓' : '✗'} Accès
        </span>
      </div>
      <div className="mt-3 flex space-x-2">
        <a 
          href={`/etablissements/${establishment.id}`}
          className="flex-1 bg-black text-white px-3 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors text-center"
          aria-label={`Voir les détails de ${establishment.nom_etablissement}`}
        >
          Voir les détails
        </a>
        <button 
          className="flex-1 bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full hover:bg-gray-300 transition-colors"
          onClick={onClose}
          aria-label="Fermer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default EstablishmentDetails;