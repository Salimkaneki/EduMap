"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchFilters from '@/components/SearchFilters';
import type { Establishment, SearchFilters as SearchFiltersType } from '@/types/types';
import { Prefecture } from '@/types/types';

// Dynamic import to avoid window not defined
const InteractiveMap = dynamic(() => import('@/components/map/SimpleMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 flex items-center justify-center">
      Chargement de la carte...
    </div>
  ),
});

export default function SearchPage() {
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersType>({
    searchTerm: '',
    region: '',
    prefecture: '',
    type: '',
    withElectricity: false,
    withWater: false,
    withLatrine: false,
    allSeasonAccess: false
  });
  
  // For hydration issues, use state to track loading
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for filters - Replace with real data
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  const types = ['Public', 'Privé', 'Confessionnel'];
  const prefectures: Prefecture[] = [
    { id: 'golfe', name: 'Golfe', region: 'Maritime' },
    { id: 'lacs', name: 'Lacs', region: 'Maritime' },
    { id: 'kloto', name: 'Kloto', region: 'Plateaux' },
    // Add more prefectures as needed
  ];
  
  // Mock data for establishments - Replace with API
  const establishments: Establishment[] = [];

  // Apply filters handler
  const handleApplyFilters = (filters: SearchFiltersType) => {
    setAppliedFilters(filters);
    // Here you would typically fetch data based on filters
    console.log("Filters applied:", filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters
        onSearch={handleApplyFilters}
        regions={regions}
        prefectures={prefectures}
        types={types}
      />
      
      {isClient && (
        <InteractiveMap 
          establishments={establishments}
          filters={appliedFilters}
          // isLoading={!isClient}
        />
      )}
    </div>
  );
}