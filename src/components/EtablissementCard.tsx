"use client";

import React from 'react';
import Image from 'next/image';

// Interface mise à jour pour inclure le nombre d'élèves
interface SchoolProps {
  school: {
    id: number;
    name: string;
    type: string;
    location: string;
    level: string;
    studentCount: number; // Remplace rating par le nombre d'élèves
    reviews: number;
    imageUrl?: string;
    tags?: string[];
  };
  onClick?: () => void;
}

const EtablissementCard = ({ school, onClick }: SchoolProps) => {
  // Fonction pour déterminer la couleur du badge selon le type d'établissement
  const getBadgeStyle = (type: string) => {
    switch (true) {
      case type === "Public":
        return "bg-green-100 text-green-800";
      case type.includes("Laïc"):
        return "bg-blue-100 text-blue-800";
      case type.includes("Protestant"):
        return "bg-purple-100 text-purple-800";
      case type.includes("Catholique"):
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div 
      className="group cursor-pointer transition-all rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:scale-[1.01]"
      onClick={onClick}
      aria-label={`Voir détails de ${school.name}`}
    >
      {/* Zone d'image avec fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {school.imageUrl ? (
          <div className="h-full w-full">
            <Image 
              src={school.imageUrl} 
              alt={school.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{school.name.substring(0, 2)}</span>
            </div>
          </div>
        )}
        
        {/* Badge de type */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getBadgeStyle(school.type)}`}>
            {school.type}
          </span>
        </div>
      </div>

      {/* Informations de l'établissement */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" title={school.name}>
            {school.name}
          </h3>
        </div>
        
        <div className="flex items-center mt-1">
          <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-500">{school.location}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{school.level}</span>
        </div>
        
        <div className="flex items-center mt-1">
          {/* Icône d'étudiants */}
          <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-sm text-gray-700 font-medium">
            {school.studentCount.toLocaleString()} élèves
          </span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{school.reviews} avis</span>
        </div>
        
        {/* Tags optionnels */}
        {school.tags && school.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {school.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EtablissementCard;