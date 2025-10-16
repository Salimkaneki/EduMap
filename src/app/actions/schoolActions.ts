"use server";

import { cookies } from "next/headers";
import Papa from "papaparse";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

export interface ImportResult {
  message: string;
  statistics: {
    imported: number;
    skipped: number;
    errors: number;
  };
  errors: string[];
}

export interface ExportFilters {
  region?: string;
  prefecture?: string;
  libelle_type_milieu?: string;
  libelle_type_statut_etab?: string;
  libelle_type_systeme?: string;
}

export async function importEtablissements(
  formData: FormData
): Promise<ImportResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      throw new Error("Non authentifié");
    }

    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("Aucun fichier fourni");
    }

    // Vérifier le type de fichier
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !file.name.endsWith(".csv") &&
      !file.name.endsWith(".xlsx")
    ) {
      throw new Error("Type de fichier non supporté. Utilisez CSV ou Excel.");
    }

    // Créer un nouveau FormData pour envoyer à l'API
    const apiFormData = new FormData();
    apiFormData.append("file", file);

    // Envoyer le fichier directement à l'API (validation côté serveur)
    const response = await fetch(
      `${API_BASE_URL}/admin/etablissements/import`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
        },
        body: apiFormData,
      }
    );

    if (!response.ok) {
      let errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        console.log("API error response:", errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.log("Failed to parse error response as JSON:", parseError);
        // Try to get text response
        try {
          const textResponse = await response.text();
          console.log("Raw error response:", textResponse.substring(0, 200));
          if (
            textResponse.includes("<html>") ||
            textResponse.includes("<!DOCTYPE")
          ) {
            errorMessage = `Erreur serveur (${response.status}). La réponse indique une page d'erreur HTML.`;
          }
        } catch (textError) {
          console.log("Failed to get text response:", textError);
        }
      }

      throw new Error(errorMessage);
    }

    let result;
    try {
      result = await response.json();
      console.log("API success response:", result);
    } catch (parseError) {
      console.log("Failed to parse success response as JSON:", parseError);
      throw new Error("La réponse de l'API n'est pas au format JSON attendu");
    }

    return {
      message: result.message || "Import terminé avec succès",
      statistics: {
        imported: result.statistics?.imported || 0,
        skipped: result.statistics?.skipped || 0,
        errors: result.statistics?.errors || 0,
      },
      errors: result.errors || [],
    };
  } catch (error) {
    console.error("Erreur lors de l'import:", error);
    return {
      message: "Erreur lors de l'import",
      statistics: {
        imported: 0,
        skipped: 0,
        errors: 1,
      },
      errors: [error instanceof Error ? error.message : "Erreur inconnue"],
    };
  }
}

export async function exportEtablissements(
  format: "excel" | "csv" | "pdf",
  filters?: ExportFilters
): Promise<{
  success: boolean;
  error?: string;
  data?: string;
  filename?: string;
  contentType?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      throw new Error("Non authentifié");
    }

    // Construire les paramètres de la requête
    const params = new URLSearchParams({ format });

    if (filters) {
      if (filters.region) params.append("region", filters.region);
      if (filters.prefecture) params.append("prefecture", filters.prefecture);
      if (filters.libelle_type_milieu)
        params.append("libelle_type_milieu", filters.libelle_type_milieu);
      if (filters.libelle_type_statut_etab)
        params.append(
          "libelle_type_statut_etab",
          filters.libelle_type_statut_etab
        );
      if (filters.libelle_type_systeme)
        params.append("libelle_type_systeme", filters.libelle_type_systeme);
    }

    const url = `${API_BASE_URL}/admin/etablissements/export?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        console.log("API error response:", errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.log("Failed to parse error response as JSON:", parseError);
      }

      // Handle specific memory/timeout errors
      if (response.status === 500 || response.status === 504) {
        errorMessage =
          "Le volume de données est trop important pour l'export. Veuillez utiliser des filtres pour réduire la quantité de données à exporter.";
      }

      throw new Error(errorMessage);
    }

    // Récupérer le blob et le convertir en base64
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Déterminer l'extension et le type MIME
    const extension = format === "excel" ? "xlsx" : format;
    const contentType =
      blob.type ||
      (format === "excel"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : format === "csv"
        ? "text/csv"
        : "application/pdf");
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);
    const filename = `etablissements_${timestamp}.${extension}`;

    return {
      success: true,
      data: base64,
      filename,
      contentType,
    };
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}
