// src/components/SchoolDetail.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Import from the correct relative path (adjust if needed)
// Import depuis le bon chemin
import { schoolsData } from "../data/schools";
// Et si vous avez besoin d'utiliser l'interface
import { School } from "../types/school";
// Define School interface based on the properties used in the component
// interface School {
//   id: number;
//   name: string;
//   type: string;
//   rating: number;
//   reviews: number;
//   description: string;
//   programs?: string[];
//   facilities?: string[];
//   admissionInfo: string;
//   fees: string;
//   address: string;
//   contact: string;
//   email: string;
//   website: string;
//   level: string;
//   location: string;
// }

const SchoolDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = parseInt(params.id);
  
  const school = schoolsData.find((s: School) => s.id === id);
  
  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Établissement non trouvé</h2>
          <p className="text-gray-600 mb-6">L'établissement que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link href="/schools" className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // Fonction pour naviguer vers une école similaire
  const goToSimilarSchool = (schoolId: number) => {
    // Ajout de logs pour débogage
    console.log("Navigating to school ID:", schoolId);
    router.push(`/schools/${schoolId}`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* En-tête avec image de fond */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
            <div className="flex items-center justify-center mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
        </div>
        <div className="absolute bottom-4 left-4 md:left-10">
          <Link href="/schools" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-black/40 hover:bg-black/60 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations essentielles */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-lg font-semibold text-gray-900">{school.rating.toFixed(1)}</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-gray-600">{school.reviews} avis</span>
              </div>
              <div className="ml-auto">
                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partager
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos de {school.name}</h2>
            <p className="text-gray-700 mb-6">{school.description}</p>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Les programmes</h3>
              <ul className="grid grid-cols-1 gap-2">
                {school.programs?.map((program: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* ... Le reste du contenu - section installations */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Les installations</h3>
              <div className="grid grid-cols-2 gap-3">
                {school.facilities?.map((facility: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Section admission */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Admission</h3>
              <p className="text-gray-700 mb-4">{school.admissionInfo}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Frais</p>
                <p className="text-gray-700">{school.fees}</p>
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Coordonnées et formulaire */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coordonnées</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Adresse</p>
              <p className="text-gray-800">{school.address}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Contact</p>
              <p className="text-gray-800">{school.contact}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{school.email}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500">Site Web</p>
              <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{school.website}</a>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Prenez contact</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <input type="text" placeholder="Votre nom" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-3">
                  <input type="email" placeholder="Votre email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <textarea placeholder="Votre message" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Autres établissements similaires */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Établissements similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {schoolsData
              .filter((s: School) => s.id !== school.id && s.level === school.level)
              .slice(0, 3)
              .map((similarSchool: School) => (
                <div 
                  key={similarSchool.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => goToSimilarSchool(similarSchool.id)}
                >
                  <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-700">{similarSchool.name.substring(0, 2)}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{similarSchool.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500">{similarSchool.location}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{similarSchool.type}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-1 text-sm text-gray-700">{similarSchool.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Section des avis */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          {/* ... Le contenu de la section avis reste le même */}
        </div>
      </div>
      
      {/* Footer simple */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 EduFind Togo. Tous droits réservés.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-800">À propos</a>
            <a href="#" className="text-gray-500 hover:text-gray-800">Aide</a>
            <a href="#" className="text-gray-500 hover:text-gray-800">Confidentialité</a>
            <a href="#" className="text-gray-500 hover:text-gray-800">Conditions</a>
            <a href="#" className="text-gray-500 hover:text-gray-800">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SchoolDetail;