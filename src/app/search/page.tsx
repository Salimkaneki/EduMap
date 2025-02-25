// app/search/page.tsx
"use client";
import { useState } from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import SearchFilters from '@/components/SearchFilters';
import type { Establishment, SearchFilters as SearchFiltersType } from '@/types';

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

  // Mock data pour les filtres - À remplacer par des vrais données
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  const types = ['Public', 'Privé', 'Confessionnel'];
  const prefectures = [/* ... */];
  
  // Mock data pour les établissements - À remplacer par une API
  const establishments: Establishment[] = [/* ... */];

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters
        onSearch={setFilters}
        regions={regions}
        prefectures={prefectures}
        types={types}
      />
      <InteractiveMap 
        establishments={establishments}
        filters={filters}
      />
    </div>
  );
}