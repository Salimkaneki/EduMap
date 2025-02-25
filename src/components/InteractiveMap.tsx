"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Establishment } from '@/types';

// Fix pour les icônes Leaflet dans Next.js
const fixLeafletIcon = () => {
  if (typeof window !== 'undefined') {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }
};

// Création d'icônes personnalisées basées sur les infrastructures
const createCustomIcon = (establishment: Establishment) => {
  const hasElectricity = establishment.existe_elect === 'OUI';
  const hasLatrine = establishment.existe_latrine === 'OUI';
  const hasWater = establishment.eau === 'OUI';
  const hasAllSeasonAccess = establishment.acces_toute_saison === 'OUI';
  
  let iconColor = 'blue'; // Par défaut
  
  // Déterminer la couleur en fonction des infrastructures disponibles
  if (hasElectricity && hasLatrine && hasWater && hasAllSeasonAccess) {
    iconColor = 'green'; // Toutes les infrastructures
  } else if (hasElectricity && hasWater) {
    iconColor = 'orange'; // Infrastructures de base
  } else if (!hasElectricity && !hasWater) {
    iconColor = 'red'; // Infrastructures limitées
  }
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:${iconColor}; width:10px; height:10px; border-radius:50%; border:2px solid white;"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });
};

// Composant pour gérer les changements de vue sur la carte
const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

interface InteractiveMapProps {
  establishments: Establishment[];
  filters: any;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ establishments, filters }) => {
  const [mapReady, setMapReady] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([8.619543, 0.824782]); // Coordonnées centrales du Togo
  const [mapZoom, setMapZoom] = useState(7);
  const mapRef = useRef(null);
  
  useEffect(() => {
    fixLeafletIcon();
    setMapReady(true);
  }, []);
  
  // Filtrer les établissements en fonction des filtres sélectionnés
  const filteredEstablishments = establishments.filter(establishment => {
    if (filters.withElectricity && establishment.existe_elect !== 'OUI') return false;
    if (filters.withLatrine && establishment.existe_latrine !== 'OUI') return false;
    if (filters.withWater && establishment.eau !== 'OUI') return false;
    if (filters.allSeasonAccess && establishment.acces_toute_saison !== 'OUI') return false;
    if (filters.type && establishment.libelle_type_statut_etab !== filters.type) return false;
    if (filters.region && establishment.region !== filters.region) return false;
    return true;
  });
  
  // Fonction pour centrer la carte sur un établissement
  const focusOnEstablishment = (establishment: Establishment) => {
    if (establishment.LATITUDE && establishment.LONGITUDE) {
      setMapCenter([establishment.LATITUDE, establishment.LONGITUDE]);
      setMapZoom(15);
      setSelectedEstablishment(establishment);
    }
  };
  
  if (!mapReady) {
    return <div className="h-96 bg-gray-100 flex items-center justify-center">Chargement de la carte...</div>;
  }
  
  return (
    <div className="h-[80vh] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} zoom={mapZoom} />
        
        {filteredEstablishments.map((establishment, index) => {
          if (!establishment.LATITUDE || !establishment.LONGITUDE) return null;
          
          return (
            <Marker 
              key={`${establishment.id || index}-${establishment.nom_etablissement}`}
              position={[establishment.LATITUDE, establishment.LONGITUDE]}
              icon={createCustomIcon(establishment)}
              eventHandlers={{
                click: () => setSelectedEstablishment(establishment),
              }}
            >
              <Popup>
                <div className="popup-content">
                  <h3 className="font-bold text-lg">{establishment.nom_etablissement}</h3>
                  <p className="text-sm text-gray-600">
                    {establishment.ville_village_quartier}, {establishment.prefecture}, {establishment.region}
                  </p>
                  <div className="mt-2 text-xs">
                    <p><span className="font-semibold">Type:</span> {establishment.libelle_type_statut_etab}</p>
                    <p><span className="font-semibold">Système:</span> {establishment.libelle_type_systeme}</p>
                  </div>
                  <div className="mt-2 text-xs grid grid-cols-2 gap-1">
                    <p className={establishment.existe_elect === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                      {establishment.existe_elect === 'OUI' ? '✓' : '✗'} Électricité
                    </p>
                    <p className={establishment.existe_latrine === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                      {establishment.existe_latrine === 'OUI' ? '✓' : '✗'} Latrines
                    </p>
                    <p className={establishment.eau === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                      {establishment.eau === 'OUI' ? '✓' : '✗'} Eau
                    </p>
                    <p className={establishment.acces_toute_saison === 'OUI' ? 'text-green-600' : 'text-red-600'}>
                      {establishment.acces_toute_saison === 'OUI' ? '✓' : '✗'} Accès toute saison
                    </p>
                  </div>
                  <button 
                    className="mt-3 bg-black text-white px-3 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors w-full"
                    onClick={() => window.location.href = `/etablissement/${establishment.id}`}
                  >
                    Voir les détails
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {selectedEstablishment && (
        <div className="absolute bottom-5 left-5 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setSelectedEstablishment(null)}
          >
            ✕
          </button>
          <h3 className="font-bold">{selectedEstablishment.nom_etablissement}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {selectedEstablishment.ville_village_quartier}, {selectedEstablishment.prefecture}
          </p>
          <div className="mt-2 flex justify-between text-xs">
            <span className={selectedEstablishment.existe_elect === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.existe_elect === 'OUI' ? '✓' : '✗'} Électricité
            </span>
            <span className={selectedEstablishment.eau === 'OUI' ? 'text-green-600' : 'text-red-600'}>
              {selectedEstablishment.eau === 'OUI' ? '✓' : '✗'} Eau
            </span>
          </div>
          <button 
            className="mt-3 bg-black text-white px-3 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors w-full"
            onClick={() => window.location.href = `/etablissement/${selectedEstablishment.id}`}
          >
            Voir les détails
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;