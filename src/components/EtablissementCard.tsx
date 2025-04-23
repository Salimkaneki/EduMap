"use client";

import React from 'react';

interface School {
  id: number;
  name: string;
  type: string;
  location: string;
  level: string;
  rating?: number;
  studentCount?: number;
  reviews: number;
  tags?: string[];
}

// Composant pour une carte d'établissement
const EtablissementCard = ({ school, onClick }: { school: School, onClick?: () => void }) => {
  return (
    <div className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" onClick={onClick}>
      {/* Placeholder coloré pour l'image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{school.name.substring(0, 2)}</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            school.type === "Public" ? "bg-green-100 text-green-800" :
            school.type === "Privé Laïc" ? "bg-blue-100 text-blue-800" :
            school.type === "Protestant" ? "bg-purple-100 text-purple-800" :
            school.type === "Catholique" ? "bg-indigo-100 text-indigo-800" :
            "bg-orange-100 text-orange-800"
          }`}>
            {school.type}
          </span>
        </div>
      </div>

      {/* Informations de l'établissement */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{school.name}</h3>
        </div>
        
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500">{school.location}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{school.level}</span>
        </div>
        
        <div className="flex items-center mt-1">
          {school.rating ? (
            <>
              <svg 
                className="w-4 h-4 text-yellow-400"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="ml-1 text-sm text-gray-700">{school.rating.toFixed(1)}</span>
              <span className="mx-1 text-gray-400">•</span>
            </>
          ) : school.studentCount ? (
            <>
              <svg 
                className="w-4 h-4 text-blue-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-1 text-sm text-gray-700">{school.studentCount} élèves</span>
              <span className="mx-1 text-gray-400">•</span>
            </>
          ) : null}
          <span className="text-sm text-gray-500">{school.reviews} avis</span>
        </div>
        
        {/* Tags si disponibles */}
        {school.tags && school.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {school.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
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