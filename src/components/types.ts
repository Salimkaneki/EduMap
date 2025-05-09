// Types pour l'application de recherche d'établissements éducatifs

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


  
  export interface SearchFilters {
    searchTerm: string;
    region: string;
    prefecture: string;
    type: string;
    withElectricity: boolean;
    withWater: boolean;
    withLatrine: boolean;
    allSeasonAccess: boolean;
  }
  
  export interface Prefecture {
    id: string;
    name: string;
    region: string;
  }