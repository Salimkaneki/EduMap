"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface School {
  id: number;
  name: string;
  type: string;
  location: string;
  level: string;
  rating: number;
  reviews: number;
  // Ajoutez d'autres champs pour la page détaillée
  description?: string;
  address?: string;
  contact?: string;
  email?: string;
  website?: string;
  facilities?: string[];
  programs?: string[];
  admissionInfo?: string;
  fees?: string;
}

// Données fictives plus complètes pour les établissements
const schoolsData: School[] = [
  {
    id: 1,
    name: "Lycée de l'Excellence",
    type: "Public",
    location: "Lomé",
    level: "Secondaire",
    rating: 4.7,
    reviews: 128,
    description: "Le Lycée de l'Excellence est un établissement public de renom situé au cœur de Lomé. Depuis sa création en 1985, il offre une formation académique rigoureuse qui prépare les élèves aux standards internationaux.",
    address: "123 Avenue de l'Indépendance, Lomé",
    contact: "+228 22 21 XX XX",
    email: "contact@lycee-excellence.tg",
    website: "www.lycee-excellence.tg",
    facilities: ["Laboratoires scientifiques", "Bibliothèque moderne", "Terrain de sport", "Salle informatique", "Cantine"],
    programs: ["Série scientifique", "Série littéraire", "Série économique"],
    admissionInfo: "Admission sur concours ou dossier selon les places disponibles. Inscriptions de mai à juillet.",
    fees: "Frais d'inscription: 15,000 FCFA, Frais de scolarité: Gratuit (établissement public)"
  },
  {
    id: 2,
    name: "École Primaire Les Petits Génies",
    type: "Privé Laïc",
    location: "Lomé",
    level: "Primaire",
    rating: 4.5,
    reviews: 94,
    description: "L'École Primaire Les Petits Génies est connue pour son approche pédagogique innovante qui stimule la créativité et l'esprit critique des enfants dès leur plus jeune âge.",
    address: "45 Rue des Flamboyants, Quartier Tokoin, Lomé",
    contact: "+228 90 15 XX XX",
    email: "info@petitsgenies.edu.tg",
    website: "www.petitsgenies.edu.tg",
    facilities: ["Aires de jeux", "Salle multimédia", "Cantine bio", "Jardin pédagogique"],
    programs: ["Programme national", "Initiation à l'anglais", "Arts créatifs", "Codage informatique débutant"],
    admissionInfo: "Inscriptions ouvertes toute l'année selon les places disponibles. Entretien avec les parents et l'enfant.",
    fees: "Frais d'inscription: 50,000 FCFA, Frais de scolarité: 250,000 FCFA/an"
  },
  {
    id: 3,
    name: "Collège Saint Joseph",
    type: "Privé Catholique",
    location: "Kpalimé",
    level: "Secondaire",
    rating: 4.8,
    reviews: 156,
    description: "Fondé par les Frères des Écoles Chrétiennes, le Collège Saint Joseph est réputé pour son excellence académique et son éducation aux valeurs chrétiennes et humaines.",
    address: "Route de Missahoé, Kpalimé",
    contact: "+228 24 42 XX XX",
    email: "direction@collegestjoseph.org",
    website: "www.collegestjoseph.org",
    facilities: ["Chapelle", "Internat", "Laboratoires", "Terrains sportifs", "Bibliothèque"],
    programs: ["Premier cycle (6ème à 3ème)", "Second cycle (2nde à Terminale)", "Séries scientifiques et littéraires"],
    admissionInfo: "Admission sur test d'entrée et étude de dossier. Période d'inscription: avril à août.",
    fees: "Frais d'inscription: 40,000 FCFA, Frais de scolarité: 300,000 FCFA/an, Internat: 500,000 FCFA/an supplémentaires"
  },
  {
    id: 4,
    name: "Institut Supérieur de Technologies",
    type: "Public",
    location: "Sokodé",
    level: "Supérieur",
    rating: 4.3,
    reviews: 87,
    description: "L'Institut Supérieur de Technologies forme les ingénieurs et techniciens de demain dans divers domaines technologiques essentiels au développement du pays.",
    address: "Zone Administrative, Sokodé",
    contact: "+228 25 51 XX XX",
    email: "scolarite@ist.edu.tg",
    website: "www.ist.edu.tg",
    facilities: ["Amphithéâtres", "Laboratoires spécialisés", "Centre de recherche", "Résidence universitaire"],
    programs: ["Génie informatique", "Génie civil", "Électrotechnique", "Énergies renouvelables", "Agronomie"],
    admissionInfo: "Admission sur concours national ou sur dossier pour les titulaires d'un baccalauréat scientifique.",
    fees: "Frais d'inscription: 25,000 FCFA, Frais universitaires: 100,000 FCFA/an (subventionnés par l'État)"
  },
  {
    id: 5,
    name: "École Primaire du Progrès",
    type: "Privé Protestant",
    location: "Atakpamé",
    level: "Primaire",
    rating: 4.6,
    reviews: 71,
    description: "L'École du Progrès offre un enseignement de qualité inspiré par les valeurs protestantes tout en étant ouverte aux élèves de toutes confessions.",
    address: "Quartier Djama, Atakpamé",
    contact: "+228 44 22 XX XX",
    email: "ecole.progres@gmail.com",
    website: "www.ecoleduprogrès.edu.tg",
    facilities: ["Salles climatisées", "Espace de culte", "Infirmerie", "Terrain de jeux"],
    programs: ["Programme national", "Enseignement religieux", "Initiation à l'informatique", "Activités artistiques"],
    admissionInfo: "Inscriptions de mars à août. Test de niveau pour les transferts d'autres écoles.",
    fees: "Frais d'inscription: 30,000 FCFA, Frais de scolarité: 180,000 FCFA/an"
  },
  {
    id: 6,
    name: "Lycée Moderne",
    type: "Public",
    location: "Tsévié",
    level: "Secondaire",
    rating: 4.2,
    reviews: 103,
    description: "Le Lycée Moderne de Tsévié est un établissement public qui met l'accent sur l'innovation pédagogique et l'adaptation aux réalités contemporaines.",
    address: "Avenue Principale, Tsévié",
    contact: "+228 23 36 XX XX",
    email: "lyceemoderne@education.gouv.tg",
    website: "www.lyceemoderne-tsevie.gouv.tg",
    facilities: ["Laboratoire informatique", "Bibliothèque numérique", "Terrains sportifs"],
    programs: ["Enseignement général", "Option sciences", "Option lettres"],
    admissionInfo: "Inscription directe pour les élèves ayant réussi le BEPC. Transferts possibles selon places disponibles.",
    fees: "Frais d'inscription: 10,000 FCFA, Frais de scolarité: Gratuit (établissement public)"
  },
  {
    id: 7,
    name: "Collège Notre Dame",
    type: "Privé Catholique",
    location: "Dapaong",
    level: "Secondaire",
    rating: 4.9,
    reviews: 112,
    description: "Le Collège Notre Dame est réputé pour son excellence académique et son éducation holistique qui développe les talents intellectuels, sportifs et artistiques des élèves.",
    address: "Quartier Nanergou, Dapaong",
    contact: "+228 27 70 XX XX",
    email: "notredame@diocese-dapaong.org",
    website: "www.collegenotredame-dapaong.org",
    facilities: ["Chapelle", "Internat filles et garçons", "Médiathèque", "Complexe sportif", "Studio artistique"],
    programs: ["Cycle complet du secondaire", "Option sciences", "Option lettres", "Option arts"],
    admissionInfo: "Admission sur concours organisé en juin. Dossiers à retirer dès mars.",
    fees: "Frais d'inscription: 45,000 FCFA, Frais de scolarité: 320,000 FCFA/an, Internat: 450,000 FCFA/an"
  },
  {
    id: 8,
    name: "École Primaire Avenir",
    type: "Privé Laïc",
    location: "Lomé",
    level: "Primaire",
    rating: 4.4,
    reviews: 68,
    description: "L'École Primaire Avenir se distingue par son approche pédagogique centrée sur l'enfant et son bilinguisme français-anglais dès le plus jeune âge.",
    address: "53 Rue des Acacias, Quartier Adidogomé, Lomé",
    contact: "+228 91 23 XX XX",
    email: "contact@ecole-avenir.com",
    website: "www.ecole-avenir.com",
    facilities: ["Classes à effectif réduit", "Laboratoire de langues", "Piscine", "Atelier créatif"],
    programs: ["Programme bilingue", "Initiation aux langues", "Éveil musical", "Sports diversifiés"],
    admissionInfo: "Inscriptions de janvier à août. Entretien avec les parents et évaluation ludique de l'enfant.",
    fees: "Frais d'inscription: 60,000 FCFA, Frais de scolarité: 350,000 FCFA/an"
  },
];

// Composant pour une carte d'établissement style Airbnb
const ModernSchoolCard = ({ school }: { school: School }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/schools/${school.id}`);
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
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