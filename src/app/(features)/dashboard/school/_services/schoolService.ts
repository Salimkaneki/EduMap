"use server";

import { cookies } from 'next/headers';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

/**
 * Interface pour les données de création d'une école
 */
export interface CreateSchoolData {
  code_etablissement: string;
  nom_etablissement: string;
  latitude: number;
  longitude: number;
  region: string;
  prefecture: string;
  canton_village_autonome: string;
  ville_village_quartier: string;
  commune_etab: string;
  libelle_type_milieu: string;
  libelle_type_statut_etab: string;
  libelle_type_systeme: string;
  libelle_type_annee: string;
  existe_elect: boolean;
  existe_latrine: boolean;
  existe_latrine_fonct: boolean;
  acces_toute_saison: boolean;
  eau: boolean;
  sommedenb_eff_g: number;
  sommedenb_eff_f: number;
  tot: number;
  sommedenb_ens_h: number;
  sommedenb_ens_f: number;
  total_ense: number;
  sommedenb_salles_classes_dur: number;
  sommedenb_salles_classes_banco: number;
  sommedenb_salles_classes_autre: number;
}

/**
 * Créer un nouvel établissement scolaire
 */
export async function createSchool(schoolData: CreateSchoolData): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Using token:', token);

  try {
    console.log('Création d\'école - Données reçues:', schoolData);

    const response = await fetch(`${API_BASE_URL}/admin/etablissements`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(schoolData)
    });

    console.log('Création d\'école - Statut réponse:', response.status);

    if (!response.ok) {
      let errorMessage = 'Une erreur est survenue lors de la création de l\'établissement';

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        // Si la réponse n'est pas du JSON, utiliser le statut HTTP
        errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;

        // Essayer de lire le texte brut pour plus d'infos
        try {
          const textResponse = await response.text();
          console.error('Réponse HTML brute:', textResponse.substring(0, 500));
        } catch (textError) {
          console.error('Impossible de lire la réponse d\'erreur:', textError);
        }
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('École créée avec succès:', data);

    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'école:", error);
    throw error;
  }
}