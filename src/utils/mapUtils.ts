// utils/mapUtils.ts
import L from 'leaflet';
import { Establishment } from '@/types/types';

// Configuration des icônes Leaflet
export const fixLeafletIcon = () => {
  if (typeof window !== 'undefined') {
    delete ((L.Icon.Default.prototype as any)._getIconUrl);
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }
};

// Création d'icônes colorées selon les infrastructures
export const createCustomIcon = (establishment: Establishment) => {
  const hasElectricity = establishment.existe_elect === 'OUI';
  const hasLatrine = establishment.existe_latrine === 'OUI';
  const hasWater = establishment.eau === 'OUI';
  const hasAllSeasonAccess = establishment.acces_toute_saison === 'OUI';
  
  let iconColor = 'blue'; // Par défaut
  
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

// Filtrage des établissements
export const filterEstablishments = (establishments: Establishment[], filters: any) => {
  return establishments.filter(establishment => {
    if (filters.withElectricity && establishment.existe_elect !== 'OUI') return false;
    if (filters.withLatrine && establishment.existe_latrine !== 'OUI') return false;
    if (filters.withWater && establishment.eau !== 'OUI') return false;
    if (filters.allSeasonAccess && establishment.acces_toute_saison !== 'OUI') return false;
    if (filters.type && establishment.libelle_type_statut_etab !== filters.type) return false;
    if (filters.region && establishment.region !== filters.region) return false;
    return true;
  });
};