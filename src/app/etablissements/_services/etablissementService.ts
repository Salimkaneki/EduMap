"use server";

import {
  EtablissementResponse,
  FilterOptions,
  SearchFilters,
  Etablissement,
  MapEtablissement,
} from "../_model/etablissement";

const API_BASE_URL = "https://edumap-api.bestwebapp.tech/api";

/**
 * Récupère la liste des établissements avec pagination
 */
export async function getEtablissements(
  page: number = 1,
  perPage: number = 20
): Promise<EtablissementResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/etablissements?page=${page}&per_page=${perPage}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des établissements:", error);
    throw new Error("Impossible de récupérer les établissements");
  }
}

/**
 * Recherche d'établissements avec filtres
 */
export async function searchEtablissements(
  filters: SearchFilters
): Promise<EtablissementResponse> {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/etablissements/search?${params.toString()}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la recherche d'établissements:", error);
    throw new Error("Impossible d'effectuer la recherche");
  }
}

/**
 * Récupère les options de filtrage disponibles
 */
export async function getFilterOptions(): Promise<FilterOptions> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/etablissements/filter-options`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Cache pour 1 heure
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des options de filtrage:",
      error
    );
    throw new Error("Impossible de récupérer les options de filtrage");
  }
}

/**
 * Récupère les détails d'un établissement
 */
export async function getEtablissementById(id: number): Promise<Etablissement> {
  try {
    const response = await fetch(`${API_BASE_URL}/etablissements/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'établissement:", error);
    throw new Error("Impossible de récupérer les détails de l'établissement");
  }
}

/**
 * Récupère les données pour la carte interactive
 */
export async function getMapData(): Promise<MapEtablissement[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/etablissements/map`, {
      cache: "force-cache",
      next: { revalidate: 1800 }, // Cache pour 30 minutes
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    // Transformer les données pour la carte
    return data.map((item: Etablissement) => ({
      id: item.id,
      nom_etablissement: item.nom_etablissement,
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      statut: item.statut?.libelle_type_statut_etab || "Non spécifié",
      systeme: item.systeme?.libelle_type_systeme || "Non spécifié",
      region: item.localisation?.region || "Non spécifié",
      prefecture: item.localisation?.prefecture || "Non spécifié",
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de carte:",
      error
    );
    throw new Error("Impossible de récupérer les données de la carte");
  }
}

/**
 * Recherche d'établissements à proximité d'un point
 */
export async function getNearbyEtablissements(
  lat: number,
  lng: number,
  radius: number = 10
): Promise<Etablissement[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/etablissements/nearby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng, radius }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la recherche de proximité:", error);
    throw new Error("Impossible de trouver les établissements à proximité");
  }
}

/**
 * Récupère les statistiques des établissements
 */
export async function getEtablissementsStats(): Promise<
  Record<string, unknown>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/etablissements/stats`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Cache pour 1 heure
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw new Error("Impossible de récupérer les statistiques");
  }
}
