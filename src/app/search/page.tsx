"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchFilters from '@/components/SearchFilters';
import type { Establishment, SearchFilters as SearchFiltersType } from '@/types/types';
import { Prefecture } from '@/types/types';

// Import dynamique pour éviter le problème de window not defined
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 flex items-center justify-center">
      Chargement de la carte...
    </div>
  ),
});

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    searchTerm: '',
    region: '',
    prefecture: '',
    type: '',
    withElectricity: false,
    withWater: false,
    withLatrine: false,
    allSeasonAccess: false
  });
  
  // Pour éviter les problèmes de hydration, utilisez un état pour suivre le chargement
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data pour les filtres - À remplacer par des vrais données
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  const types = ['Public', 'Privé', 'Confessionnel'];
  const prefectures: Prefecture[] = [];
  
  // Mock data pour les établissements - À remplacer par une API
  const establishments: Establishment[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters
        onSearch={setFilters}
        regions={regions}
        prefectures={prefectures}
        types={types}
      />
      
      {isClient && (
        <InteractiveMap 
          establishments={establishments}
          filters={filters}
          isLoading={!isClient}
        />
      )}
    </div>
  );
}