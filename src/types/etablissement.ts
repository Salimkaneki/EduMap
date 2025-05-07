export interface Etablissement {
    id: number;
    nom_etablissement: string;
    libelle_type_statut_etab: string;  // Type (Public, Privé, etc.)
    region: string;                    // Location
    prefecture: string;
    libelle_type_systeme: string;      // Niveau (Primaire, Secondaire, etc.)
    libelle_type_milieu: string;       // Rural/Urbain
    existe_elect: boolean;
    existe_latrine: boolean;
    existe_latrine_fonct: boolean;
    acces_toute_saison: boolean;
    eau: boolean;
    // Champs additionnels pour la page détaillée
    code_etablissement?: string;
    canton_village_autonome?: string;
    ville_village_quartier?: string;
    latitude?: string;
    longitude?: string;
    sommedenb_eff_g?: number;  // Effectif garçons
    sommedenb_eff_f?: number;  // Effectif filles
    tot?: number;              // Total élèves
    sommedenb_ens_h?: number;  // Enseignants hommes
    sommedenb_ens_f?: number;  // Enseignants femmes
    total_ense?: number;       // Total enseignants
  }