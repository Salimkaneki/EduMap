// Types pour l'API EduMap

export interface Localisation {
  id: number;
  region: string;
  prefecture: string;
  canton_village_autonome: string;
  ville_village_quartier: string;
  commune_etab: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Milieu {
  id: number;
  libelle_type_milieu: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Statut {
  id: number;
  libelle_type_statut_etab: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Systeme {
  id: number;
  libelle_type_systeme: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Annee {
  id: number;
  libelle_type_annee: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Effectif {
  id: number;
  etablissement_id: number;
  sommedenb_eff_g: number;
  sommedenb_eff_f: number;
  tot: number;
  sommedenb_ens_h: number;
  sommedenb_ens_f: number;
  total_ense: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Infrastructure {
  id: number;
  etablissement_id: number;
  sommedenb_salles_classes_dur: number;
  sommedenb_salles_classes_banco: number;
  sommedenb_salles_classes_autre: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Equipement {
  id: number;
  etablissement_id: number;
  existe_elect: boolean;
  existe_latrine: boolean;
  existe_latrine_fonct: boolean;
  acces_toute_saison: boolean;
  eau: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Etablissement {
  id: number;
  code_etablissement: string;
  nom_etablissement: string;
  latitude: string;
  longitude: string;
  localisation_id: number;
  milieu_id: number;
  statut_id: number;
  systeme_id: number;
  annee_id: number;
  created_at: string | null;
  updated_at: string | null;
  localisation: Localisation;
  milieu: Milieu;
  statut: Statut;
  systeme: Systeme;
  annee: Annee;
  effectif: Effectif;
  infrastructure: Infrastructure;
  equipement: Equipement;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface EtablissementResponse {
  current_page: number;
  data: Etablissement[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface FilterOptions {
  regions: string[];
  prefectures: string[];
  types_milieu: string[];
  types_statut: string[];
  types_systeme: string[];
}

export interface SearchFilters {
  nom_etablissement?: string;
  region?: string;
  prefecture?: string;
  libelle_type_statut_etab?: string;
  libelle_type_milieu?: string;
  libelle_type_systeme?: string;
  existe_elect?: boolean;
  existe_latrine?: boolean;
  eau?: boolean;
  page?: number;
  per_page?: number;
}

export interface MapEtablissement {
  id: number;
  nom_etablissement: string;
  latitude: number;
  longitude: number;
  statut: string;
  systeme: string;
  region: string;
  prefecture: string;
}
