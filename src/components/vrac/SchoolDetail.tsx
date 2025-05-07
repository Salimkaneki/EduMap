// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // Interface pour correspondre à la structure de l'API
// interface Etablissement {
//   id: number;
//   nom_etablissement: string;
//   libelle_type_statut_etab: string;  // Type (Public, Privé, etc.)
//   region: string;                    // Location
//   prefecture: string;
//   libelle_type_systeme: string;      // Niveau (Primaire, Secondaire, etc.)
//   libelle_type_milieu: string;       // Rural/Urbain
//   existe_elect: boolean;
//   existe_latrine: boolean;
//   existe_latrine_fonct: boolean;
//   acces_toute_saison: boolean;
//   eau: boolean;
//   // Champs additionnels pour la page détaillée
//   code_etablissement?: string;
//   canton_village_autonome?: string;
//   ville_village_quartier?: string;
//   latitude?: string;
//   longitude?: string;
//   sommedenb_eff_g?: number;  // Effectif garçons
//   sommedenb_eff_f?: number;  // Effectif filles
//   tot?: number;              // Total élèves
//   sommedenb_ens_h?: number;  // Enseignants hommes
//   sommedenb_ens_f?: number;  // Enseignants femmes
//   total_ense?: number;       // Total enseignants
// }

// // Composant de page pour la route dynamique /schools/[id]
// export default function SchoolDetailPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const [school, setSchool] = useState<Etablissement | null>(null);
//   const [similarSchools, setSimilarSchools] = useState<Etablissement[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // URL de l'API déployée
//   const API_URL = 'https://edumap.edufyplus.com/api';
  
//   // Calculer un "score" pour simuler un système de notation basé sur les infrastructures
//   const calculateFacilityScore = (etablissement: Etablissement): number => {
//     let score = 3.0; // Score de base
//     if (etablissement.existe_elect) score += 0.5;
//     if (etablissement.existe_latrine) score += 0.3;
//     if (etablissement.existe_latrine_fonct) score += 0.3;
//     if (etablissement.acces_toute_saison) score += 0.4;
//     if (etablissement.eau) score += 0.5;
    
//     // S'assurer que le score est entre 1 et 5
//     return Math.max(1, Math.min(5, score));
//   };

//   // Générer un nombre fictif d'avis basé sur l'ID
//   const generateReviewCount = (id: number): number => {
//     return 30 + (id % 100);
//   };

//   // Récupérer les détails de l'école
//   useEffect(() => {
//     const fetchSchoolDetails = async () => {
//       setLoading(true);
//       try {
//         // Récupérer les données de l'école
//         const response = await fetch(`${API_URL}/etablissements/${params.id}`);
        
//         if (!response.ok) {
//           throw new Error(`Erreur HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setSchool(data);
        
//         // Récupérer les établissements similaires (même niveau scolaire)
//         if (data.libelle_type_systeme) {
//           const similarResponse = await fetch(
//             `${API_URL}/etablissements?libelle_type_systeme=${encodeURIComponent(data.libelle_type_systeme)}&per_page=4`
//           );
          
//           if (!similarResponse.ok) {
//             throw new Error(`Erreur HTTP pour les écoles similaires: ${similarResponse.status}`);
//           }
          
//           const similarData = await similarResponse.json();
//           // Filtrer pour ne pas inclure l'école actuelle
//           const filteredSimilarSchools = similarData.data.filter(
//             (s: Etablissement) => s.id !== parseInt(params.id)
//           ).slice(0, 3); // Limiter à 3 écoles similaires
//           setSimilarSchools(filteredSimilarSchools);
//         }
        
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
//         setError(errorMessage);
//         console.error('Erreur lors du chargement des détails de l\'établissement:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchoolDetails();
//   }, [params.id]);

//   // Afficher un message de chargement
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-gray-700">Chargement des informations...</h2>
//         </div>
//       </div>
//     );
//   }

//   // Afficher un message d'erreur
//   if (error || !school) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8 max-w-md">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Établissement non trouvé</h2>
//           <p className="text-gray-600 mb-6">
//             {error || "L'établissement que vous recherchez n'existe pas ou a été supprimé."}
//           </p>
//           <Link href="/" className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Retour à la liste
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Calculer le score et le nombre d'avis
//   const rating = calculateFacilityScore(school);
//   const reviewCount = generateReviewCount(school.id);

//   // Fonction pour déterminer la couleur du badge selon le type d'établissement
//   const getBadgeClass = (type: string) => {
//     if (type?.toLowerCase().includes("public")) {
//       return "bg-green-100 text-green-800";
//     }
//     if (type?.toLowerCase().includes("privé laïc") || type?.toLowerCase().includes("prive laic")) {
//       return "bg-blue-100 text-blue-800";
//     }
//     if (type?.toLowerCase().includes("confessionnel protestant") || type?.toLowerCase().includes("protestant")) {
//       return "bg-purple-100 text-purple-800";
//     }
//     if (type?.toLowerCase().includes("catholique")) {
//       return "bg-indigo-100 text-indigo-800";
//     }
//     return "bg-orange-100 text-orange-800";
//   };

//   // Préparer les installations disponibles
//   const facilities = [];
//   if (school.existe_elect) facilities.push("Électricité");
//   if (school.existe_latrine) facilities.push("Latrines");
//   if (school.existe_latrine_fonct) facilities.push("Latrines fonctionnelles");
//   if (school.acces_toute_saison) facilities.push("Accès toute saison");
//   if (school.eau) facilities.push("Accès à l'eau");

//   return (
//     <div className="bg-white min-h-screen">
//       {/* En-tête avec image de fond */}
//       <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center max-w-2xl mx-4">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{school.nom_etablissement}</h1>
//             <div className="flex items-center justify-center mt-2">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeClass(school.libelle_type_statut_etab)}`}>
//                 {school.libelle_type_statut_etab}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-4 left-4 md:left-10">
//           <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-black/40 hover:bg-black/60 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Retour
//           </Link>
//         </div>
//       </div>

//       {/* Contenu principal */}
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         {/* Informations principales */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Colonne gauche - Informations essentielles */}
//           <div className="md:col-span-2">
//             <div className="flex items-center mb-4">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                 </svg>
//                 <span className="ml-1 text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
//                 <span className="mx-1 text-gray-400">•</span>
//                 <span className="text-gray-600">{reviewCount} avis</span>
//               </div>
//               <div className="ml-auto">
//                 <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                   Partager
//                 </button>
//               </div>
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos de {school.nom_etablissement}</h2>
//             <p className="text-gray-700 mb-6">
//               {school.nom_etablissement} est un établissement {school.libelle_type_statut_etab?.toLowerCase() || ''} 
//               situé dans la région de {school.region}. Il s'agit d'un établissement de niveau {school.libelle_type_systeme?.toLowerCase() || ''} 
//               en zone {school.libelle_type_milieu?.toLowerCase() || ''}.
//             </p>
            
//             {/* Section des caractéristiques de l'école */}
//             <div className="border-t border-gray-200 pt-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Les caractéristiques</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   </svg>
//                   <span className="text-gray-700">Région: {school.region}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <span className="text-gray-700">Préfecture: {school.prefecture}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                   <span className="text-gray-700">Niveau: {school.libelle_type_systeme}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                   <span className="text-gray-700">Type: {school.libelle_type_statut_etab}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                   </svg>
//                   <span className="text-gray-700">Milieu: {school.libelle_type_milieu}</span>
//                 </div>
//                 {school.code_etablissement && (
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                     </svg>
//                     <span className="text-gray-700">Code: {school.code_etablissement}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Section des effectifs */}
//             {(school.sommedenb_eff_g !== undefined || school.sommedenb_eff_f !== undefined || school.tot !== undefined) && (
//               <div className="border-t border-gray-200 pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Effectifs</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {school.sommedenb_eff_g !== undefined && (
//                     <div className="bg-blue-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-blue-600 font-medium">Garçons</p>
//                       <p className="text-2xl font-bold text-blue-700">{school.sommedenb_eff_g}</p>
//                     </div>
//                   )}
//                   {school.sommedenb_eff_f !== undefined && (
//                     <div className="bg-pink-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-pink-600 font-medium">Filles</p>
//                       <p className="text-2xl font-bold text-pink-700">{school.sommedenb_eff_f}</p>
//                     </div>
//                   )}
//                   {school.tot !== undefined && (
//                     <div className="bg-purple-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-purple-600 font-medium">Total élèves</p>
//                       <p className="text-2xl font-bold text-purple-700">{school.tot}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Section des enseignants */}
//             {(school.sommedenb_ens_h !== undefined || school.sommedenb_ens_f !== undefined || school.total_ense !== undefined) && (
//               <div className="border-t border-gray-200 pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Personnel enseignant</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {school.sommedenb_ens_h !== undefined && (
//                     <div className="bg-gray-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-gray-600 font-medium">Hommes</p>
//                       <p className="text-2xl font-bold text-gray-700">{school.sommedenb_ens_h}</p>
//                     </div>
//                   )}
//                   {school.sommedenb_ens_f !== undefined && (
//                     <div className="bg-gray-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-gray-600 font-medium">Femmes</p>
//                       <p className="text-2xl font-bold text-gray-700">{school.sommedenb_ens_f}</p>
//                     </div>
//                   )}
//                   {school.total_ense !== undefined && (
//                     <div className="bg-gray-50 p-4 rounded-lg text-center">
//                       <p className="text-sm text-gray-600 font-medium">Total enseignants</p>
//                       <p className="text-2xl font-bold text-gray-700">{school.total_ense}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Section des installations */}
//             {facilities.length > 0 && (
//               <div className="border-t border-gray-200 pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Les installations</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {facilities.map((facility, index) => (
//                     <div key={index} className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-gray-700">{facility}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* Section des écoles similaires */}
//             {similarSchools.length > 0 && (
//               <div className="border-t border-gray-200 pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Écoles similaires</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {similarSchools.map((similarSchool) => (
//                     <div 
//                       key={similarSchool.id}
//                       className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
//                       onClick={() => router.push(`/schools/${similarSchool.id}`)}
//                     >
//                       <h4 className="font-medium text-gray-900 mb-1 truncate">{similarSchool.nom_etablissement}</h4>
//                       <div className="flex items-center text-sm text-gray-600 mb-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         </svg>
//                         <span className="truncate">{similarSchool.region}, {similarSchool.prefecture}</span>
//                       </div>
//                       <div className="flex items-center mt-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClass(similarSchool.libelle_type_statut_etab)}`}>
//                           {similarSchool.libelle_type_statut_etab}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Colonne droite - Contact et informations complémentaires */}
//           <div className="bg-gray-50 p-6 rounded-xl h-fit">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Localisation</h3>
            
//             <div className="space-y-4">
//               {school.prefecture && (
//                 <div className="flex">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span className="text-gray-700">Préfecture: {school.prefecture}</span>
//                 </div>
//               )}
              
//               {school.canton_village_autonome && (
//                 <div className="flex">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                   <span className="text-gray-700">Canton: {school.canton_village_autonome}</span>
//                 </div>
//               )}
              
//               {school.ville_village_quartier && (
//                 <div className="flex">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <span className="text-gray-700">Localité: {school.ville_village_quartier}</span>
//                 </div>
//               )}
              
//               {school.latitude && school.longitude && (
//                 <div className="mt-4">
//                   <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 mb-3">
//                     {/* Emplacement futur pour afficher une carte basée sur les coordonnées */}
//                     <div className="flex items-center justify-center h-full text-gray-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Latitude: {school.latitude}</span>
//                     <span>Longitude: {school.longitude}</span>
//                   </div>
//                 </div>
//               )}
              
//               {/* Ajouter un bouton pour voir sur Google Maps */}
//               {school.latitude && school.longitude && (
//                 <a 
//                   href={`https://www.google.com/maps?q=${school.latitude},${school.longitude}`}
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-3 inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   Voir sur Google Maps
//                 </a>
//               )}
//             </div>
            
//             {/* Section contact ou rapport */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              
//               <button className="mb-3 inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//                 Signaler une erreur
//               </button>
              
//               <button className="inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Demander des informations
//               </button>
//             </div>
            
//             {/* Section code QR */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Code QR</h3>
//               <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
//                 <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
//                   {/* Emplacement pour un futur code QR */}
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                   </svg>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-3">Scannez pour partager l'établissement</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Pied de page */}
//       <footer className="bg-gray-100 py-6 mt-12">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <p className="text-gray-600 text-sm">© 2025 EduMap - Tous droits réservés</p>
//             </div>
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-600 hover:text-gray-900">
//                 <span className="sr-only">À propos</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-600 hover:text-gray-900">
//                 <span className="sr-only">Contact</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }