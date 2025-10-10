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
 * Récupérer tous les administrateurs avec pagination et filtres
 */
export async function getAdmins(
  page: number = 1,
  perPage: number = 10,
  search?: string,
  role?: string
): Promise<AdminResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    let url = `${API_BASE_URL}/admin/admins`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      let errorMessage =
        "Une erreur est survenue lors de la récupération des administrateurs";

      try {
        const errorData = await response.json();
        console.log("Error response data:", errorData);

        // Handle authorization errors specifically
        if (response.status === 403) {
          errorMessage =
            errorData.message || "Unauthorized. Super admin access required.";
        } else {
          errorMessage = errorData.error || errorData.message || errorMessage;
        }
      } catch (parseError) {
        console.log("Error parsing error response:", parseError);

        // Handle 403 without JSON response
        if (response.status === 403) {
          errorMessage = "Unauthorized. Super admin access required.";
        } else {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Success response data:", data);
    console.log("Data type:", typeof data);
    console.log("Data keys:", Object.keys(data));

    // Validate response structure
    if (!data || typeof data !== "object") {
      throw new Error(
        "Réponse invalide: les données reçues ne sont pas un objet"
      );
    }

    // Check if data is directly an array of admins
    if (Array.isArray(data)) {
      console.log("API returned direct array, wrapping it...");
      return {
        data: data,
        current_page: 1,
        last_page: 1,
        per_page: data.length,
        total: data.length,
      };
    }

    // Check for common response structures
    if (Array.isArray(data.data)) {
      console.log("API returned standard paginated response");
      return data;
    }

    // Check if data has other array properties that might contain admins
    const arrayKeys = Object.keys(data).filter((key) =>
      Array.isArray(data[key])
    );
    if (arrayKeys.length > 0) {
      console.log("Found array properties:", arrayKeys);
      // Assume the first array is the admins data
      const adminsArray = data[arrayKeys[0]];
      console.log("Using array from property:", arrayKeys[0]);
      return {
        data: adminsArray,
        current_page: 1,
        last_page: 1,
        per_page: adminsArray.length,
        total: adminsArray.length,
      };
    }

    console.error("Unexpected response structure:", data);
    throw new Error(
      `Réponse invalide: structure inattendue. Clés disponibles: ${Object.keys(
        data
      ).join(", ")}`
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
    throw error;
  }
}

/**
 * Créer un nouvel administrateur
 */
export async function createAdmin(formData: FormData): Promise<Admin> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const adminData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };

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

        if (response.status === 403) {
          errorMessage =
            errorData.message || "Unauthorized. Super admin access required.";
        } else {
          errorMessage = errorData.error || errorData.message || errorMessage;
        }
      } catch (parseError) {
        if (response.status === 403) {
          errorMessage = "Unauthorized. Super admin access required.";
        } else {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
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
export async function updateAdmin(formData: FormData): Promise<Admin> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const id = formData.get("id") as string;
    const adminData: any = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    const password = formData.get("password") as string;
    if (password) {
      adminData.password = password;
    }

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

        if (response.status === 403) {
          errorMessage =
            errorData.message || "Unauthorized. Super admin access required.";
        } else {
          errorMessage = errorData.error || errorData.message || errorMessage;
        }
      } catch (parseError) {
        if (response.status === 403) {
          errorMessage = "Unauthorized. Super admin access required.";
        } else {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
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

        if (response.status === 403) {
          errorMessage =
            errorData.message || "Unauthorized. Super admin access required.";
        } else {
          errorMessage = errorData.error || errorData.message || errorMessage;
        }
      } catch (parseError) {
        if (response.status === 403) {
          errorMessage = "Unauthorized. Super admin access required.";
        } else {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
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
