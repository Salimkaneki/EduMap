import React from "react";
import Link from "next/link";
import { School } from "../../data/schools";
import { getSchoolTypeColor } from "../../utils/schoolDataUtils";

interface SchoolHeaderProps {
  school: School;
}

export default function SchoolHeader({ school }: SchoolHeaderProps) {
  const typeColorClass = getSchoolTypeColor(school.type);

  return (
    <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
          <div className="flex items-center justify-center mt-2 space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColorClass}`}>
              {school.type}
            </span>
            
            {school.level && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {school.level}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 md:left-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-black/40 hover:bg-black/60 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </Link>
      </div>
    </div>
  );
}