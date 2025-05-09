"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Etablissement } from '../lib/actions';

// Composant pour afficher une carte d'établissement
const SchoolCard = ({ etablissement }: { etablissement: Etablissement }) => {
  const router = useRouter();

  if (!etablissement) return null; 

  const handleClick = () => {
    router.push(`/schools/${etablissement.id}`);
  };

  // Fonction pour déterminer la couleur du badge selon le type d'établissement
  const getBadgeClass = (type: string) => {
    if (type.includes("public") || type.includes("Public")) {
      return "bg-green-100 text-green-800";
    }
    if (type.includes("privé laïc") || type.includes("Privé Laïc")) {
      return "bg-blue-100 text-blue-800";
    }
    if (type.includes("confessionnel protestant") || type.includes("Protestant")) {
      return "bg-purple-100 text-purple-800";
    }
    if (type.includes("catholique") || type.includes("Catholique")) {
      return "bg-indigo-100 text-indigo-800";
    }
    return "bg-orange-100 text-orange-800";
  };

  // Calcul d'un "score" pour simuler un système de notation
  const calculateFacilityScore = () => {
    let score = 3.0; // Score de base
    if (etablissement.existe_elect) score += 0.5;
    if (etablissement.existe_latrine) score += 0.3;
    if (etablissement.existe_latrine_fonct) score += 0.3;
    if (etablissement.acces_toute_saison) score += 0.4;
    if (etablissement.eau) score += 0.5;
  
    return Math.max(1, Math.min(5, score));
  };
  
  // Générer un nombre fictif d'avis basé sur l'ID
  const generateReviewCount = (id: number) => {
    return 30 + (id % 100);
  };

  const rating = calculateFacilityScore();
  const reviewCount = generateReviewCount(etablissement.id);

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      {/* Placeholder coloré pour l'image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {etablissement.nom_etablissement.substring(0, 2)}
            </span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getBadgeClass(etablissement.libelle_type_statut_etab)}`}>
            {etablissement.libelle_type_statut_etab}
          </span>
        </div>
      </div>

      {/* Informations de l'établissement */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {etablissement.nom_etablissement}
          </h3>
        </div>
        
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500">{etablissement.region}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{etablissement.libelle_type_systeme}</span>
        </div>
        
        <div className="flex items-center mt-1">
          <svg 
            className="w-4 h-4 text-yellow-400"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="ml-1 text-sm text-gray-700">{rating.toFixed(1)}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{reviewCount} avis</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;