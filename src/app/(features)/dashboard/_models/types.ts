export interface Admin {
  name: string;
  email: string;
  role: string;
  is_superadmin: boolean;
}

export interface DashboardStats {
  total_admins: number;
  regular_admins: number;
  super_admins: number;
}

export interface DashboardResponse {
  message: string;
  admin: Admin;
  stats: DashboardStats;
}

export interface EtablissementStats {
  total_etablissements: number;
  relations_manquantes: {
    sans_localisation: number;
    sans_milieu: number;
    sans_statut: number;
    sans_systeme: number;
  };
  par_region: Array<{
    region: string | null;
    count: number;
    localisation: string | null;
  }>;
  par_prefecture: Array<{
    prefecture: string | null;
    count: number;
    localisation: string | null;
  }>;
  par_type_milieu: Array<{
    libelle_type_milieu: string | null;
    count: number;
    milieu: string | null;
  }>;
  par_statut: Array<{
    libelle_type_statut_etab: string | null;
    count: number;
    statut: string | null;
  }>;
  par_systeme: Array<{
    libelle_type_systeme: string | null;
    count: number;
    systeme: string | null;
  }>;
  effectifs: {
    total_eleves: number;
    total_enseignants: number;
    etablissements_avec_effectifs: number;
  };
  equipements: {
    avec_electricite: number;
    avec_latrines: number;
    avec_eau: number;
    avec_acces_toute_saison: number;
    avec_latrines_fonctionnelles: number;
    etablissements_avec_equipements: number;
  };
  infrastructures: {
    total_salles_classes: string;
    salles_dur: string;
    salles_banco: string;
    salles_autre: string;
    etablissements_avec_infrastructures: number;
  };
  geolocalisation: {
    avec_coordonnees: number;
    sans_coordonnees: number;
  };
}
