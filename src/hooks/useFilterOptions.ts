import { useState, useEffect } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

interface FilterOptions {
  regions: string[];
  prefectures: string[];
  types_milieu: string[];
  types_statut: string[];
  types_systeme: string[];
}

export function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/etablissements/filter-options`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        setFilterOptions(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des options de filtres:", err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des filtres');
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return {
    filterOptions,
    loading,
    error
  };
}