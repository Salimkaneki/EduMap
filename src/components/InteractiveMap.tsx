"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Establishment, InteractiveMapProps } from '@/types/types';

interface ExtendedIconDefaultPrototype extends L.Icon.Default {
  _getIconUrl?: string;
}

// Fix pour les icônes Leaflet dans Next.js
const fixLeafletIcon = () => {
  if (typeof window !== 'undefined') {
    delete ((L.Icon.Default.prototype as ExtendedIconDefaultPrototype)._getIconUrl);
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

// CORRECTION: Suppression de la fonction non utilisée ou conversion en commentaire
/* Fonction pour créer des clusters de marqueurs (solution simple sans bibliothèque)
const createClusterMarkers = (map: unknown, markers: Establishment[]) => {
  // Implémentation basique - cette fonction serait remplacée par une vraie bibliothèque
  // de clustering comme react-leaflet-cluster dans une version plus avancée
  return markers;
};
*/

// Composant pour la légende de la carte
const MapLegend: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[999] transition-all ${isCollapsed ? 'w-10' : 'w-64'}`}>
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '▼' : '▲'}
      </button>
      
      {!isCollapsed && (
        <>
          <h4 className="font-bold text-sm mb-2">Légende</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span>Toutes infrastructures</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              <span>Électricité et eau</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span>Sans électricité ni eau</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span>Autres configurations</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Composant de recherche
const SearchBox: React.FC<{
  establishments: Establishment[];
  onSelect: (establishment: Establishment) => void;
}> = ({ establishments, onSelect }) => {
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
          // CORRECTION: Suppression du role="textbox" puisque c'est implicite pour les inputs
          aria-expanded={showResults}
        />
        <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {results.length > 0 ? (
              results.map((establishment, index) => (
                <div 
                  key={`search-${establishment.id || index}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 text-sm"
                  onClick={() => {
                    onSelect(establishment);
                    setSearchTerm("");
                    setShowResults(false);
                  }}
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

const InteractiveMap: React.FC<InteractiveMapProps> = ({ establishments, filters}) => {
  const [mapReady, setMapReady] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([8.619543, 0.824782]); // Coordonnées centrales du Togo
  const [mapZoom, setMapZoom] = useState(7);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fixLeafletIcon();
    setMapReady(true);
  }, []);

  // Gérer le mode plein écran
  const toggleFullScreen = () => {
    if (!mapContainerRef.current) return;
    
    if (!isFullScreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullScreen(!isFullScreen);
  };
  
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

  // Statistiques des établissements filtrés
  const totalFiltered = filteredEstablishments.length;
  const withElectricity = filteredEstablishments.filter(e => e.existe_elect === 'OUI').length;
  const withWater = filteredEstablishments.filter(e => e.eau === 'OUI').length;
  const withLatrine = filteredEstablishments.filter(e => e.existe_latrine === 'OUI').length;
  
  if (!mapReady) {
    return <div className="h-96 bg-gray-100 flex items-center justify-center">Chargement de la carte...</div>;
  }
  
  return (
    <div 
      className={`relative h-[80vh] rounded-lg overflow-hidden shadow-lg border border-gray-200 ${isFullScreen ? 'fixed inset-0 z-50 h-screen rounded-none' : ''}`}
      ref={mapContainerRef}
    >
      <div className="absolute top-4 right-16 z-[999]">
        <button 
          onClick={toggleFullScreen}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
          title={isFullScreen ? "Quitter le plein écran" : "Plein écran"}
        >
          {isFullScreen ? "⊞" : "⤢"}
        </button>
      </div>
      
      <div className="absolute top-4 right-28 z-[999]">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
          title="Filtres rapides"
        >
          ⚙️
        </button>
      </div>
      
      {showFilters && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-[999] w-64">
          <h4 className="font-bold text-sm mb-2">Filtres rapides</h4>
          <div className="space-y-2">
            <label className="flex items-center text-sm">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={filters.withElectricity || false} 
                readOnly
                // Normalement vous auriez une fonction pour gérer les changements de filtres
                // onChange={(e) => handleFilterChange('withElectricity', e.target.checked)}
              />
              Avec électricité
            </label>
            <label className="flex items-center text-sm">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={filters.withWater || false} 
                readOnly
                // onChange={(e) => handleFilterChange('withWater', e.target.checked)}
              />
              Avec eau
            </label>
            <label className="flex items-center text-sm">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={filters.withLatrine || false} 
                readOnly
                // onChange={(e) => handleFilterChange('withLatrine', e.target.checked)}
              />
              Avec latrines
            </label>
          </div>
        </div>
      )}
      
      <SearchBox 
        establishments={establishments} 
        onSelect={focusOnEstablishment} 
      />
      
      <MapLegend />
      
      <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md z-[999] text-xs">
        <div className="font-bold">{totalFiltered} établissements</div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div>{Math.round((withElectricity/totalFiltered || 0)*100)}% élec.</div>
          <div>{Math.round((withWater/totalFiltered || 0)*100)}% eau</div>
          <div>{Math.round((withLatrine/totalFiltered || 0)*100)}% latr.</div>
        </div>
      </div>
      
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomleft" />
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
        <div className="absolute bottom-20 left-5 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
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
          <div className="mt-3 flex space-x-2">
            <button 
              className="flex-1 bg-black text-white px-3 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors"
              onClick={() => window.location.href = `/etablissement/${selectedEstablishment.id}`}
            >
              Voir les détails
            </button>
            <button 
              className="flex-1 bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full hover:bg-gray-300 transition-colors"
              onClick={() => setSelectedEstablishment(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;