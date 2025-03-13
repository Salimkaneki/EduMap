"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import { Establishment, Prefecture } from '@/types/types';

interface SearchFilters {
  searchTerm: string;
  region: string;
  prefecture: string;
  type: string;
  withElectricity: boolean;
  withWater: boolean;
  withLatrine: boolean;
  allSeasonAccess: boolean;
}

// Import dynamique du composant de carte pour éviter les problèmes SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
      Chargement de la carte...
    </div>
  ),
});

// Données d'exemple (à remplacer par des appels API)
const SAMPLE_DATA: Establishment[] = [
  {
    id: "1",
    nom_etablissement: "École Primaire Publique Lomé Centre",
    region: "Maritime",
    prefecture: "Golfe",
    ville_village_quartier: "Lomé",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Primaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.1319,
    LONGITUDE: 1.2228
  },
  {
    id: "2",
    nom_etablissement: "Lycée de Kpalimé",
    region: "Plateaux",
    prefecture: "Kloto",
    ville_village_quartier: "Kpalimé",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Secondaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.9009,
    LONGITUDE: 0.6279
  },
  {
    id: "3",
    nom_etablissement: "École Primaire Catholique Sainte Marie",
    region: "Maritime",
    prefecture: "Golfe",
    ville_village_quartier: "Lomé",
    libelle_type_statut_etab: "Privé Catholique",
    libelle_type_systeme: "Primaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.1365,
    LONGITUDE: 1.2103
  },
  {
    id: "4",
    nom_etablissement: "École Primaire Rurale de Davié",
    region: "Maritime",
    prefecture: "Zio",
    ville_village_quartier: "Davié",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Primaire",
    existe_elect: "NON",
    existe_latrine: "OUI",
    eau: "NON",
    acces_toute_saison: "NON",
    LATITUDE: 6.3833,
    LONGITUDE: 1.2000
  },
  {
    id: "5",
    nom_etablissement: "Collège Islamique de Sokodé",
    region: "Centrale",
    prefecture: "Tchaoudjo",
    ville_village_quartier: "Sokodé",
    libelle_type_statut_etab: "Privé Islamique",
    libelle_type_systeme: "Secondaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 8.9833,
    LONGITUDE: 1.1333
  }
];

// Extraire les régions, préfectures et types uniques des données
const regions = [...new Set(SAMPLE_DATA.map(item => item.region))];
const prefectures: Prefecture[] = SAMPLE_DATA.map(item => ({
  id: item.prefecture,
  name: item.prefecture,
  region: item.region
})).filter((prefecture, index, self) => 
  index === self.findIndex(p => p.id === prefecture.id)
);
const types = [...new Set(SAMPLE_DATA.map(item => item.libelle_type_statut_etab))];

const MapSearchPage = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>(SAMPLE_DATA);
  const [filters, setFilters] = useState({
    searchTerm: '',
    region: '',
    prefecture: '',
    type: '',
    withElectricity: false,
    withWater: false,
    withLatrine: false,
    allSeasonAccess: false
  });
  const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>(SAMPLE_DATA);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dans une application réelle, vous feriez un appel API
  useEffect(() => {
    // Simulation d'un chargement de données
    setIsLoading(true);
    
    // Simuler un délai d'appel API
    setTimeout(() => {
      setEstablishments(SAMPLE_DATA);
      setFilteredEstablishments(SAMPLE_DATA);
      setIsLoading(false);
    }, 500);
  }, []);
  
// Gérer la recherche et le filtrage
  const handleSearch = (searchFilters: SearchFilters) => {
    setFilters(searchFilters);
    setIsLoading(true);
    

    
    // Filtrer les établissements selon les critères de recherche
    const results = establishments.filter(establishment => {
      // Recherche par texte (nom/localisation)
      if (searchFilters.searchTerm && 
          !establishment.nom_etablissement.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) &&
          !establishment.ville_village_quartier.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) &&
          !establishment.prefecture.toLowerCase().includes(searchFilters.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtrer par région
      if (searchFilters.region && establishment.region !== searchFilters.region) {
        return false;
      }
      
      // Filtrer par préfecture
      if (searchFilters.prefecture && establishment.prefecture !== searchFilters.prefecture) {
        return false;
      }
      
      // Filtrer par type
      if (searchFilters.type && establishment.libelle_type_statut_etab !== searchFilters.type) {
        return false;
      }
      
      // Filtrer par infrastructure
      if (searchFilters.withElectricity && establishment.existe_elect !== 'OUI') return false;
      if (searchFilters.withWater && establishment.eau !== 'OUI') return false;
      if (searchFilters.withLatrine && establishment.existe_latrine !== 'OUI') return false;
      if (searchFilters.allSeasonAccess && establishment.acces_toute_saison !== 'OUI') return false;
      
      return true;
    });
    
    // Simuler un délai d'API
    setTimeout(() => {
      setFilteredEstablishments(results);
      setIsLoading(false);
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Carte des établissements</h1>
          
          <SearchFilters 
            onSearch={handleSearch}
            regions={regions}
            prefectures={prefectures}
            types={types}
          />
          
          {/* Compteur de résultats */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {isLoading ? 'Recherche en cours...' : `${filteredEstablishments.length} établissement(s) trouvé(s)`}
            </p>
            <div className="text-sm flex items-center text-gray-500">
              <span className="mr-2">Légende:</span>
              <span className="flex items-center mr-3">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"></span>
                Toutes infrastructures
              </span>
              <span className="flex items-center mr-3">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block mr-1"></span>
                Électricité et eau
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"></span>
                Infrastructures limitées
              </span>
            </div>
          </div>
          
          {/* Carte interactive */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <DynamicMap 
              establishments={filteredEstablishments}
              isLoading={isLoading}
              filters={filters}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapSearchPage;