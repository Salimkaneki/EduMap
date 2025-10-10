"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

/**
 * Interface pour un administrateur
 */
export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface pour la réponse paginée des admins
 */
export interface AdminResponse {
  data: Admin[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/**
 * Interface pour les données de création d'un admin
 */
export interface CreateAdminData {
  name: string;
  email: string;
  password: string;
  role: string;
}

/**
 * Interface pour les données de mise à jour d'un admin
 */
export interface UpdateAdminData {
  name: string;
  email: string;
  role: string;
  password?: string;
}

/**
 * Récupérer tous les administrateurs avec pagination
 */
export async function getAdmins(
  page: number = 1,
  perPage: number = 10
): Promise<AdminResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/admins?page=${page}&per_page=${perPage}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage =
        "Une erreur est survenue lors de la récupération des administrateurs";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
    throw error;
  }
}

/**
 * Créer un nouvel administrateur
 */
export async function createAdmin(adminData: CreateAdminData): Promise<Admin> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/admins`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      let errorMessage =
        "Une erreur est survenue lors de la création de l'administrateur";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur:", error);
    throw error;
  }
}

/**
 * Mettre à jour un administrateur
 */
export async function updateAdmin(
  id: number,
  adminData: UpdateAdminData
): Promise<Admin> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/admins/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      let errorMessage =
        "Une erreur est survenue lors de la mise à jour de l'administrateur";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'administrateur:", error);
    throw error;
  }
}

/**
 * Supprimer un administrateur
 */
export async function deleteAdmin(id: number): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/admins/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage =
        "Une erreur est survenue lors de la suppression de l'administrateur";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'administrateur:", error);
    throw error;
  }
}
