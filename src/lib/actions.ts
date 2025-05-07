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
  region: string;
  libelle_type_milieu: string;
  libelle_type_statut_etab: string;
  libelle_type_systeme: string;
}

// Interface pour les résultats paginés
export interface PaginatedResult {
  data: Etablissement[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

// URL de l'API déployée - idéalement stockée dans une variable d'environnement
const API_URL = process.env.API_URL || 'https://edumap.edufyplus.com/api';

// Fonction pour récupérer les établissements avec pagination et filtres
export async function fetchEtablissements(
  page: number = 1,
  perPage: number = 8,
  searchParams: SearchParams = {
    region: '',
    libelle_type_milieu: '',
    libelle_type_statut_etab: '',
    libelle_type_systeme: ''
  }
): Promise<PaginatedResult> {
  try {
    // Construire l'URL avec les paramètres de recherche
    let url = `${API_URL}/etablissements?page=${page}&per_page=${perPage}`;
    
    // Ajouter les paramètres de recherche si définis
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });
    
    const response = await fetch(url, {
      // Utiliser des options plus sécurisées pour fetch
      headers: {
        'Accept': 'application/json',
        // Vous pouvez ajouter des en-têtes d'authentification ici si nécessaire
      },
      // Si vous avez une API key, vous pourriez l'ajouter ici ou dans les en-têtes
      cache: 'no-store', // Pour éviter la mise en cache des données sensibles
      // next: { revalidate: 60 }, // Alternative: revalidation toutes les 60 secondes
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion à l\'API';
    console.error('Erreur lors du chargement des établissements:', err);
    throw new Error(errorMessage);
  }
}

// Fonction pour récupérer un seul établissement par son ID
export async function fetchEtablissementById(id: number): Promise<Etablissement> {
  try {
    const response = await fetch(`${API_URL}/etablissements/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la récupération de l\'établissement';
    console.error(`Erreur lors de la récupération de l'établissement ID ${id}:`, err);
    throw new Error(errorMessage);
  }
}