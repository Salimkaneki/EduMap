// app/schools/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import FiltersComponent from '@/components/FiltersComponent';
import SchoolDetailComponent from '@/components/SchoolDetailComponent';
import dynamic from 'next/dynamic';

// Importer MapComponent côté client uniquement (pour éviter les erreurs SSR avec Leaflet)
const DynamicMap = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center bg-gray-100">Chargement de la carte...</div>
});

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Données statiques pour les options de filtres
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  const prefectures = [
    { id: 1, name: 'Lomé', region: 'Maritime' },
    { id: 2, name: 'Golfe', region: 'Maritime' },
    { id: 3, name: 'Vo', region: 'Maritime' },
    { id: 4, name: 'Kloto', region: 'Plateaux' },
    { id: 5, name: 'Agou', region: 'Plateaux' },
    { id: 6, name: 'Sotouboua', region: 'Centrale' },
    { id: 7, name: 'Tchaoudjo', region: 'Centrale' },
    { id: 8, name: 'Kozah', region: 'Kara' },
    { id: 9, name: 'Kéran', region: 'Kara' },
    { id: 10, name: 'Tone', region: 'Savanes' },
    { id: 11, name: 'Oti', region: 'Savanes' },
  ];
  const schoolTypes = ['Public', 'Privé', 'Confessionnel', 'Communautaire'];

  useEffect(() => {
    // Fonction pour charger les données des écoles
    const fetchSchools = async () => {
      try {
        setLoading(true);
        
        // En production, remplacez ceci par votre API réelle
        // const response = await fetch('/api/schools');
        // const data = await response.json();
        
        // Pour le moment, utilisons des données fictives
        const mockData = generateMockSchools();
        
        setSchools(mockData);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchSchools();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowMobileFilters(false);
  };

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };
  
  const closeSchoolDetail = () => {
    setSelectedSchool(null);
  };
  
  // Fonction auxiliaire pour générer des données fictives (à remplacer par votre API)
  const generateMockSchools = () => {
    const mockSchools = [];
    const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
    const prefectures = {
      'Maritime': ['Lomé', 'Golfe', 'Vo'],
      'Plateaux': ['Kloto', 'Agou', 'Amou'],
      'Centrale': ['Sotouboua', 'Tchaoudjo', 'Blitta'],
      'Kara': ['Kozah', 'Binah', 'Kéran'],
      'Savanes': ['Tone', 'Oti', 'Tandjouaré']
    };
    const types = ['Public', 'Privé', 'Confessionnel', 'Communautaire'];
    const systems = ['Général', 'Technique', 'Professionnel'];
    
    // Coordonnées approximatives du Togo
    const baseCoords = {
      'Maritime': { lat: 6.1750, lng: 1.3500 },
      'Plateaux': { lat: 7.0000, lng: 1.0000 },
      'Centrale': { lat: 8.0000, lng: 1.0000 },
      'Kara': { lat: 9.5500, lng: 1.1700 },
      'Savanes': { lat: 10.5000, lng: 0.5000 }
    };
    
    // Générer 50 écoles fictives
    for (let i = 1; i <= 50; i++) {
      const region = regions[Math.floor(Math.random() * regions.length)];
      const prefecture = prefectures[region][Math.floor(Math.random() * prefectures[region].length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const system = systems[Math.floor(Math.random() * systems.length)];
      
      // Ajouter une variation aux coordonnées de base
      const latVar = (Math.random() - 0.5) * 0.5;
      const lngVar = (Math.random() - 0.5) * 0.5;
      
      mockSchools.push({
        id: i,
        nom_etablissement: `École ${type} ${i}`,
        region: region,
        prefecture: prefecture,
        ville_village_quartier: `Localité ${i}`,
        libelle_type_statut_etab: type,
        libelle_type_systeme: system,
        existe_elect: Math.random() > 0.3,
        existe_latrine: Math.random() > 0.4,
        eau: Math.random() > 0.5,
        acces_toute_saison: Math.random() > 0.2,
        LATITUDE: (baseCoords[region].lat + latVar).toFixed(4),
        LONGITUDE: (baseCoords[region].lng + lngVar).toFixed(4)
      });
    }
    
    return mockSchools;
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Établissements scolaires</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner-border animate-spin h-8 w-8 border-b-2 rounded-full"></div>
            <p className="ml-2">Chargement des données...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filtres pour mobile */}
            <div className="md:hidden mb-4">
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1z" />
                </svg>
                {showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
              </button>
              
              {showMobileFilters && (
                <div className="mt-4">
                  <FiltersComponent 
                    onFilterChange={handleFilterChange} 
                    regions={regions}
                    prefectures={prefectures}
                    types={schoolTypes}
                  />
                </div>
              )}
            </div>
            
            {/* Filtres pour desktop */}
            <div className="hidden md:block md:w-1/3 lg:w-1/4">
              <FiltersComponent 
                onFilterChange={handleFilterChange} 
                regions={regions}
                prefectures={prefectures}
                types={schoolTypes}
              />
            </div>
            
            {/* Carte */}
            <div className="md:w-2/3 lg:w-3/4">
              <DynamicMap 
                schools={schools} 
                filters={filters}
                onSchoolClick={handleSchoolClick}
              />
              
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Statistiques</h2>
                <p><span className="font-medium">Total des établissements:</span> {schools.length}</p>
                <p><span className="font-medium">Établissements avec électricité:</span> {schools.filter(s => s.existe_elect).length}</p>
                <p><span className="font-medium">Établissements avec latrines:</span> {schools.filter(s => s.existe_latrine).length}</p>
                <p><span className="font-medium">Établissements avec accès à l'eau:</span> {schools.filter(s => s.eau).length}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal pour afficher les détails d'un établissement */}
        {selectedSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-4xl w-full">
              <SchoolDetailComponent 
                school={selectedSchool}
                onClose={closeSchoolDetail}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SchoolsPage;