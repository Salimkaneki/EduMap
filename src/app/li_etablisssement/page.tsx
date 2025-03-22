"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import EtablissementCard from '@/components/EtablissementCard';

// Données fictives pour les établissements
const schoolsData = [
  {
    id: 1,
    name: "Lycée de l'Excellence",
    type: "Public",
    location: "Lomé",
    level: "Secondaire",
    studentCount: 1250,
    reviews: 128,
    tags: ["Sciences", "Internat"],
  },
  {
    id: 2,
    name: "École Primaire Saint Joseph",
    type: "Catholique",
    location: "Kara",
    level: "Primaire",
    studentCount: 850,
    reviews: 75,
    tags: ["Arts"],
  },
  {
    id: 3,
    name: "Collège Protestant",
    type: "Protestant",
    location: "Atakpamé",
    level: "Secondaire",
    studentCount: 920,
    reviews: 62,
  },
  {
    id: 4,
    name: "École Internationale de Lomé",
    type: "Privé Laïc",
    location: "Lomé",
    level: "Primaire & Secondaire",
    studentCount: 1500,
    reviews: 142,
    tags: ["International", "Bilingue"],
  },
  {
    id: 5,
    name: "Institut Technique de Sokodé",
    type: "Public",
    location: "Sokodé",
    level: "Technique",
    studentCount: 780,
    reviews: 56,
    tags: ["Professionnel", "Technologie"],
  },
];

const EtablissementsPage = () => {
  // État pour la recherche et les filtres simples
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [locationFilter, setLocationFilter] = useState("Tous");
  const [sortOption, setSortOption] = useState("relevance");
  
  // Extraire les options pour les filtres
  const typeOptions = ["Tous", ...Array.from(new Set(schoolsData.map(school => school.type)))];
  const locationOptions = ["Tous", ...Array.from(new Set(schoolsData.map(school => school.location)))];
  
  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("Tous");
    setLocationFilter("Tous");
    setSortOption("relevance");
  };
  
  // Filtrer les écoles selon les critères sélectionnés
  const filteredSchools = schoolsData.filter(school => {
    const matchesSearch = searchTerm === "" || 
      school.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "Tous" || 
      school.type === typeFilter;
    
    const matchesLocation = locationFilter === "Tous" || 
      school.location === locationFilter;
    
    return matchesSearch && matchesType && matchesLocation;
  });
  
  // Trier les écoles selon l'option sélectionnée
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    switch (sortOption) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "studentsHigh":
        return b.studentCount - a.studentCount;
      case "reviewsHigh":
        return b.reviews - a.reviews;
      default:
        return 0; // Par défaut, conserver l'ordre original
    }
  });
  
  return (
    <>
      <Header />
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Établissements</h2>
            
            {/* Barre de recherche et filtres simples */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Recherche par nom */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher un établissement..."
                      className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-10 py-3"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Type d'établissement */}
                <div className="md:w-48">
                  <select
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-3"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="Tous">Tous les types</option>
                    {typeOptions.filter(t => t !== "Tous").map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                {/* Ville */}
                <div className="md:w-48">
                  <select
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-3"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="Tous">Toutes les villes</option>
                    {locationOptions.filter(l => l !== "Tous").map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                {/* Tri */}
                <div className="md:w-60">
                  <select
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-3"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Trier par pertinence</option>
                    <option value="nameAsc">Nom (A-Z)</option>
                    <option value="nameDesc">Nom (Z-A)</option>
                    <option value="studentsHigh">Nombre d&apos;élèves</option>
                    <option value="reviewsHigh">Nombre d&apos;avis</option>
                  </select>
                </div>
              </div>
              
              {/* Indicateur de filtres et bouton de réinitialisation */}
              {(searchTerm || typeFilter !== "Tous" || locationFilter !== "Tous" || sortOption !== "relevance") && (
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    onClick={resetFilters}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Réinitialiser tous les filtres
                  </button>
                  <div className="text-sm text-gray-600">
                    {filteredSchools.length} établissement(s) trouvé(s)
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Grille d'établissements */}
          {sortedSchools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedSchools.map(school => (
                <EtablissementCard 
                  key={school.id} 
                  school={school} 
                  onClick={() => console.log(`Voir détails de ${school.name}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun résultat</h3>
              <p className="mt-1 text-gray-500">Aucun établissement ne correspond à vos critères de recherche.</p>
              <button 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={resetFilters}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EtablissementsPage;