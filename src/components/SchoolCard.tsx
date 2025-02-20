"use client";

import React from 'react';

// Données fictives pour les établissements
const schoolsData = [
  {
    id: 1,
    name: "Lycée de l'Excellence",
    type: "Public",
    location: "Lomé",
    level: "Secondaire",
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 2,
    name: "École Primaire Les Petits Génies",
    type: "Privé Laïc",
    location: "Lomé",
    level: "Primaire",
    rating: 4.5,
    reviews: 94,
  },
  {
    id: 3,
    name: "Collège Saint Joseph",
    type: "Privé Catholique",
    location: "Kpalimé",
    level: "Secondaire",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 4,
    name: "Institut Supérieur de Technologies",
    type: "Public",
    location: "Sokodé",
    level: "Supérieur",
    rating: 4.3,
    reviews: 87,
  },
  {
    id: 5,
    name: "École Primaire du Progrès",
    type: "Privé Protestant",
    location: "Atakpamé",
    level: "Primaire",
    rating: 4.6,
    reviews: 71,
  },
  {
    id: 6,
    name: "Lycée Moderne",
    type: "Public",
    location: "Tsévié",
    level: "Secondaire",
    rating: 4.2,
    reviews: 103,
  },
  {
    id: 7,
    name: "Collège Notre Dame",
    type: "Privé Catholique",
    location: "Dapaong",
    level: "Secondaire",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 8,
    name: "École Primaire Avenir",
    type: "Privé Laïc",
    location: "Lomé",
    level: "Primaire",
    rating: 4.4,
    reviews: 68,
  },
];

// Composant pour une carte d'établissement style Airbnb
const ModernSchoolCard = ({ school }) => {
  return (
    <div className="group cursor-pointer">
      {/* Placeholder coloré pour l'image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{school.name.substring(0, 2)}</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            school.type === "Public" ? "bg-green-100 text-green-800" :
            school.type.includes("Laïc") ? "bg-blue-100 text-blue-800" :
            school.type.includes("Protestant") ? "bg-purple-100 text-purple-800" :
            school.type.includes("Catholique") ? "bg-indigo-100 text-indigo-800" :
            "bg-orange-100 text-orange-800"
          }`}>
            {school.type}
          </span>
        </div>
      </div>

      {/* Informations de l'établissement */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{school.name}</h3>
        </div>
        
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500">{school.location}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{school.level}</span>
        </div>
        
        <div className="flex items-center mt-1">
          <svg 
            className="w-4 h-4 text-yellow-400"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="ml-1 text-sm text-gray-700">{school.rating.toFixed(1)}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{school.reviews} avis</span>
        </div>
      </div>
    </div>
  );
};

// Composant principal qui affiche la grille de cartes
const ModernSchoolsGrid = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Établissements populaires</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
            Tout voir
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {schoolsData.map(school => (
            <ModernSchoolCard key={school.id} school={school} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button className="flex items-center bg-white border border-gray-300 rounded-full px-6 py-3 text-gray-800 font-medium hover:shadow-md transition-shadow">
            Afficher plus
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernSchoolsGrid;