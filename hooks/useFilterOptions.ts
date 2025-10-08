import { useState, useEffect } from 'react';
import { getFilterOptions } from '../src/app/etablissements/_services/etablissementService';
import { FilterOptions } from '../src/app/etablissements/_model/etablissement';

export function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const options = await getFilterOptions();
        setFilterOptions(options);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des options');
        console.error('Erreur lors du chargement des options de filtrage:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { filterOptions, loading, error };
}