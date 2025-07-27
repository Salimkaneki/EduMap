"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { fixLeafletIcon, createCustomIcon, filterEstablishments } from '../utils/mapUtils';
import MapLegend from './MapLegend';
import SearchBox from './SearchBox';
import MapStats from './MapStats';
import type { Establishment, MapFilters } from '../types/index';
import 'leaflet/dist/leaflet.css';

interface SimpleMapProps {
  establishments: Establishment[];
  filters: MapFilters;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ establishments, filters }) => {
  const [mapReady, setMapReady] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  
  // Appliquer les filtres
  const filteredEstablishments = filterEstablishments(establishments, filters);
  
  // Initialiser la carte
  useEffect(() => {
    fixLeafletIcon();
    setMapReady(true);
  }, []);

  // Gérer la sélection d'un établissement
  const focusOnEstablishment = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
  };
  
  // Affichage de chargement
  if (!mapReady) {
    return (
      <div className="h-[80vh] bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-[80vh] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Diagnostic temporaire */}
      <div className="absolute top-2 left-2 bg-white bg-opacity-90 p-2 rounded shadow text-xs z-[1100]">
        <div>Établissements reçus : {establishments.length}</div>
        <div>Après filtrage : {filteredEstablishments.length}</div>
      </div>
      {/* Composants de l'interface */}
      <SearchBox 
        establishments={establishments} 
        onSelect={focusOnEstablishment} 
      />
      <MapLegend />
      <MapStats establishments={filteredEstablishments} />
      {/* Carte Leaflet */}
      <MapContainer 
        center={[8.619543, 0.824782]} // Coordonnées centrales du Togo
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        {/* Marqueurs des établissements */}
        {filteredEstablishments.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-4 rounded shadow text-center z-[1000]">
            <p className="text-gray-700">Aucun établissement trouvé pour les filtres sélectionnés.</p>
          </div>
        ) : (
          filteredEstablishments.map((establishment: Establishment, index: number) => {
            if (
              typeof establishment.LATITUDE !== 'number' ||
              typeof establishment.LONGITUDE !== 'number' ||
              isNaN(establishment.LATITUDE) ||
              isNaN(establishment.LONGITUDE)
            ) return null;
            return (
              <Marker 
                key={`${establishment.id || index}`}
                position={[establishment.LATITUDE, establishment.LONGITUDE]}
                icon={createCustomIcon(establishment)}
              >
                <Popup>
                  <div className="popup-content">
                    <h3 className="font-bold text-sm mb-1">{establishment.nom_etablissement}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {establishment.ville_village_quartier}, {establishment.prefecture}
                    </p>
                    <p className="text-xs mb-2">
                      <span className="font-semibold">Type:</span> {establishment.libelle_type_statut_etab}
                    </p>
                    {/* Grille des infrastructures */}
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <span className={establishment.existe_elect === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                        {establishment.existe_elect === 'OUI' ? '✓' : '✗'} Électricité
                      </span>
                      <span className={establishment.eau === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                        {establishment.eau === 'OUI' ? '✓' : '✗'} Eau
                      </span>
                      <span className={establishment.existe_latrine === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                        {establishment.existe_latrine === 'OUI' ? '✓' : '✗'} Latrines
                      </span>
                      <span className={establishment.acces_toute_saison === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                        {establishment.acces_toute_saison === 'OUI' ? '✓' : '✗'} Accès
                      </span>
                    </div>
                    {/* Bouton de détails (optionnel) */}
                    <button 
                      className="mt-2 bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 transition-colors w-full"
                      onClick={() => {
                        // Ici vous pouvez naviguer vers une page de détail
                        console.log('Voir détails:', establishment.id);
                      }}
                    >
                      Voir les détails
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })
        )}
      </MapContainer>
      {/* Panel d'information sur l'établissement sélectionné (optionnel) */}
      {selectedEstablishment && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setSelectedEstablishment(null)}
          >
            ✕
          </button>
          <h3 className="font-bold text-sm">{selectedEstablishment.nom_etablissement}</h3>
          <p className="text-xs text-gray-600 mt-1">
            {selectedEstablishment.ville_village_quartier}, {selectedEstablishment.prefecture}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <span className={selectedEstablishment.existe_elect === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.existe_elect === 'OUI' ? '✓' : '✗'} Électricité
            </span>
            <span className={selectedEstablishment.eau === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.eau === 'OUI' ? '✓' : '✗'} Eau
            </span>
            <span className={selectedEstablishment.existe_latrine === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.existe_latrine === 'OUI' ? '✓' : '✗'} Latrines
            </span>
            <span className={selectedEstablishment.acces_toute_saison === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.acces_toute_saison === 'OUI' ? '✓' : '✗'} Accès
            </span>
          </div>
          <button 
            className="mt-3 bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded hover:bg-gray-300 transition-colors w-full"
            onClick={() => setSelectedEstablishment(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleMap;