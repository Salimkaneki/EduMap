"use server";

// Interface pour les établissements
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

// Interface pour les paramètres de recherche
export interface SearchParams {
  region?: string;
  libelle_type_milieu?: string;
  libelle_type_statut_etab?: string;
  libelle_type_systeme?: string;
}

// Interface pour la réponse paginée
export interface PaginatedResponse {
  data: Etablissement[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

// URL de l'API déployée
const API_URL = 'https://edumap.edufyplus.com/api';

// Server action pour récupérer les établissements
export async function fetchEtablissements(
  page: number = 1,
  searchParams: SearchParams = {}
): Promise<PaginatedResponse> {
  try {
    // Construire l'URL avec les paramètres de recherche
    let url = `${API_URL}/etablissements?page=${page}&per_page=8`;
    
    // Ajouter les paramètres de recherche si définis
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });
    
    const response = await fetch(url, { next: { tags: ['etablissements'] } });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Erreur lors du chargement des établissements:', err);
    throw err;
  }
}

// Server action pour récupérer un établissement spécifique
export async function fetchEtablissementById(id: number): Promise<Etablissement> {
  try {
    const response = await fetch(`${API_URL}/etablissements/${id}`, { 
      next: { tags: [`etablissement-${id}`] } 
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Erreur lors du chargement de l'établissement #${id}:`, err);
    throw err;
  }
}