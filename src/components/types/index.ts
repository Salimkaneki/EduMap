// Types pour les établissements scolaires
export interface Establishment {
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

export interface MapFilters {
  searchTerm?: string;
  region?: string;
  prefecture?: string;
  type?: string;
  withElectricity?: boolean;
  withWater?: boolean;
  withLatrine?: boolean;
  allSeasonAccess?: boolean;
}

// Types pour les préfectures
export interface Prefecture {
  id: string;
  name: string;
  region: string;
}

// Props pour le composant de carte interactive
export interface InteractiveMapProps {
  establishments: Establishment[];
  filters: MapFilters;
  isLoading?: boolean;
}