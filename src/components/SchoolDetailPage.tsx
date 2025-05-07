// "use client";

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';

// // Interface pour correspondre à la structure de l'API
// interface Etablissement {
//     id: number;
//     nom_etablissement: string;
//     libelle_type_statut_etab: string;  // Type (Public, Privé, etc.)
//     region: string;                    // Location
//     prefecture: string;
//     libelle_type_systeme: string;      // Niveau (Primaire, Secondaire, etc.)
//     libelle_type_milieu: string;       // Rural/Urbain
//     existe_elect: boolean;
//     existe_latrine: boolean;
//     existe_latrine_fonct: boolean;
//     acces_toute_saison: boolean;
//     eau: boolean;
//     // Champs additionnels pour la page détaillée
//     code_etablissement?: string;
//     canton_village_autonome?: string;
//     ville_village_quartier?: string;
//     latitude?: string;
//     longitude?: string;
//     sommedenb_eff_g?: number;  // Effectif garçons
//     sommedenb_eff_f?: number;  // Effectif filles
//     tot?: number;              // Total élèves
//     sommedenb_ens_h?: number;  // Enseignants hommes
//     sommedenb_ens_f?: number;  // Enseignants femmes
//     total_ense?: number;       // Total enseignants
//   }

// // Composant pour afficher une entrée d'information
// const InfoItem = ({ label, value, icon }) => {
//   if (value === undefined || value === null) return null;
  
//   return (
//     <div className="flex items-start mb-3">
//       <div className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500">
//         {icon}
//       </div>
//       <div className="ml-3">
//         <span className="text-sm font-medium text-gray-500">{label}</span>
//         <p className="text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// };

// // Composant pour afficher l'indicateur d'infrastructure
// const FacilityIndicator = ({ available, label, icon }) => {
//   return (
//     <div className={`flex items-center p-3 rounded-lg ${available ? 'bg-green-50' : 'bg-gray-50'}`}>
//       <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
//         {icon}
//       </div>
//       <div className="ml-3">
//         <p className="text-sm font-medium">{label}</p>
//         <p className={`text-xs ${available ? 'text-green-600' : 'text-gray-500'}`}>
//           {available ? 'Disponible' : 'Non disponible'}
//         </p>
//       </div>
//     </div>
//   );
// };

// const SchoolDetailPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const [school, setSchool] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // URL de l'API déployée
//   const API_URL = 'https://edumap.edufyplus.com/api';

//   useEffect(() => {
//     const fetchSchoolDetails = async () => {
//       if (!params.id) return;
      
//       setLoading(true);
//       try {
//         const response = await fetch(`${API_URL}/etablissements/${params.id}`);
        
//         if (!response.ok) {
//           throw new Error(`Erreur HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setSchool(data);
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la récupération des détails de l\'établissement';
//         setError(errorMessage);
//         console.error('Erreur lors du chargement des détails de l\'établissement:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchoolDetails();
//   }, [params.id]);

//   // Fonction pour retourner à la page précédente
//   const handleGoBack = () => {
//     router.back();
//   };

//   // Calcul du ratio élèves/enseignants
//   const calculateRatio = () => {
//     if (school && school.tot && school.total_ense && school.total_ense > 0) {
//       return Math.round(school.tot / school.total_ense);
//     }
//     return null;
//   };

//   // État de chargement
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//         <p className="mt-4 text-gray-600">Chargement des détails de l'établissement...</p>
//       </div>
//     );
//   }

//   // Message d'erreur
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
//           <p className="text-gray-700 mb-6">{error}</p>
//           <button
//             onClick={handleGoBack}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Retourner à la liste des établissements
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Si les données de l'école ne sont pas disponibles
//   if (!school) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Établissement non trouvé</h2>
//           <p className="text-gray-700 mb-6">Les informations pour cet établissement ne sont pas disponibles.</p>
//           <button
//             onClick={handleGoBack}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Retourner à la liste des établissements
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Fonction pour obtenir la classe de couleur du badge selon le type d'établissement
//   const getBadgeClass = (type) => {
//     if (!type) return "bg-gray-100 text-gray-800";
    
//     if (type.includes("public") || type.includes("Public")) {
//       return "bg-green-100 text-green-800";
//     }
//     if (type.includes("privé laïc") || type.includes("Privé Laïc")) {
//       return "bg-blue-100 text-blue-800";
//     }
//     if (type.includes("confessionnel protestant") || type.includes("Protestant")) {
//       return "bg-purple-100 text-purple-800";
//     }
//     if (type.includes("catholique") || type.includes("Catholique")) {
//       return "bg-indigo-100 text-indigo-800";
//     }
//     return "bg-orange-100 text-orange-800";
//   };

//   // Rendu principal avec les détails de l'école
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Bouton de retour */}
//       <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
//         <button
//           onClick={handleGoBack}
//           className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Retour aux établissements
//         </button>
//       </div>

//       {/* En-tête avec le nom de l'école et badge de type */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{school.nom_etablissement}</h1>
//               <div className="flex flex-wrap gap-2">
//                 {school.libelle_type_statut_etab && (
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeClass(school.libelle_type_statut_etab)}`}>
//                     {school.libelle_type_statut_etab}
//                   </span>
//                 )}
//                 {school.libelle_type_systeme && (
//                   <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
//                     {school.libelle_type_systeme}
//                   </span>
//                 )}
//                 {school.libelle_type_milieu && (
//                   <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
//                     {school.libelle_type_milieu}
//                   </span>
//                 )}
//               </div>
//             </div>
//             {/* Code d'établissement si disponible */}
//             {school.code_etablissement && (
//               <div className="mt-4 md:mt-0 bg-gray-100 px-4 py-2 rounded-lg">
//                 <span className="text-sm text-gray-500">Code établissement</span>
//                 <p className="font-mono font-medium">{school.code_etablissement}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Contenu principal */}
//       <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Colonne gauche : Informations générales */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <div className="px-6 py-5 border-b border-gray-200">
//                 <h2 className="text-lg font-medium text-gray-900">Informations générales</h2>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Localisation */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Localisation</h3>
//                     <InfoItem 
//                       label="Région" 
//                       value={school.region}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Préfecture" 
//                       value={school.prefecture}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Canton/Village autonome" 
//                       value={school.canton_village_autonome}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Ville/Village/Quartier" 
//                       value={school.ville_village_quartier}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//                       </svg>}
//                     />
//                     {school.commune_etab && (
//                       <InfoItem 
//                         label="Commune" 
//                         value={school.commune_etab}
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//                         </svg>}
//                       />
//                     )}
//                   </div>
                  
//                   {/* Statistiques */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Statistiques</h3>
//                     <InfoItem 
//                       label="Nombre d'élèves garçons" 
//                       value={school.sommedenb_eff_g !== null ? school.sommedenb_eff_g : 'Non disponible'}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Nombre d'élèves filles" 
//                       value={school.sommedenb_eff_f !== null ? school.sommedenb_eff_f : 'Non disponible'}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Total élèves" 
//                       value={school.tot !== null ? school.tot : 'Non disponible'}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                       </svg>}
//                     />
//                     <InfoItem 
//                       label="Nombre d'enseignants" 
//                       value={school.total_ense !== null ? school.total_ense : 'Non disponible'}
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
//                       </svg>}
//                     />
//                     {calculateRatio() && (
//                       <InfoItem 
//                         label="Ratio élèves/enseignant" 
//                         value={calculateRatio() + ' élèves par enseignant'}
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                         </svg>}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* Infrastructure section */}
//                 <div className="mt-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Infrastructure et équipements</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <FacilityIndicator 
//                       available={school.existe_elect} 
//                       label="Électricité" 
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
//                       </svg>}
//                     />
//                     <FacilityIndicator 
//                       available={school.existe_latrine} 
//                       label="Latrines" 
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                       </svg>}
//                     />
//                     <FacilityIndicator 
//                       available={school.existe_latrine_fonct} 
//                       label="Latrines fonctionnelles" 
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                       </svg>}
//                     />
//                     <FacilityIndicator 
//                       available={school.acces_toute_saison} 
//                       label="Accessible toute saison" 
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
//                       </svg>}
//                     />
//                     <FacilityIndicator 
//                       available={school.eau} 
//                       label="Accès à l'eau" 
//                       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
//                       </svg>}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Colonne droite : Carte et coordonnées */}
//           <div>
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <div className="px-6 py-5 border-b border-gray-200"></div>
//               <h2 className="text-lg font-medium text-gray-900">Emplacement</h2>
//               </div>
//               <div className="p-6">
//                 {/* Coordonnées géographiques si disponibles */}
//                 {(school.latitude && school.longitude) ? (
//                   <div className="mb-4">
//                     <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Coordonnées GPS</h3>
//                     <div className="flex items-center space-x-3 mb-4">
//                       <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Latitude: <span className="font-medium text-gray-900">{school.latitude}</span></p>
//                         <p className="text-sm text-gray-500">Longitude: <span className="font-medium text-gray-900">{school.longitude}</span></p>
//                       </div>
//                     </div>
                    
//                     {/* Lien Google Maps */}
//                     <a 
//                       href={`https://www.google.com/maps?q=${school.latitude},${school.longitude}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       Voir sur Google Maps
//                     </a>
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                     </svg>
//                     <p>Aucune coordonnée GPS disponible pour cet établissement</p>
//                   </div>
//                 )}

//                 {/* Section pour visualiser les données sur une carte (placeholder) */}
//                 <div className="mt-6">
//                   <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Carte interactive</h3>
//                   {(school.latitude && school.longitude) ? (
//                     <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center">
//                       {/* Note: Dans une application réelle, vous pourriez intégrer ici une carte interactive */}
//                       <div className="text-center p-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                         </svg>
//                         <p className="text-gray-500">Carte interactive non disponible dans cette version</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="bg-gray-100 rounded-lg overflow-hidden p-6 text-center">
//                       <p className="text-gray-500">Impossible d'afficher la carte sans coordonnées</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Section sur la qualité de l'établissement */}
//             <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
//               <div className="px-6 py-5 border-b border-gray-200">
//                 <h2 className="text-lg font-medium text-gray-900">Qualité des infrastructures</h2>
//               </div>
//               <div className="p-6">
//                 {/* Score calculé basé sur les infrastructures disponibles */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-gray-700 font-medium">Score global</span>
//                     <div className="flex items-center">
//                       {Array.from({ length: 5 }, (_, i) => {
//                         // Calculer le score comme dans la liste des établissements
//                         let score = 3.0;
//                         if (school.existe_elect) score += 0.5;
//                         if (school.existe_latrine) score += 0.3;
//                         if (school.existe_latrine_fonct) score += 0.3;
//                         if (school.acces_toute_saison) score += 0.4;
//                         if (school.eau) score += 0.5;
//                         score = Math.max(1, Math.min(5, score));
                        
//                         const intScore = Math.floor(score);
//                         const decimal = score - intScore;
                        
//                         // Si on est à l'index actuel et qu'il y a une décimale
//                         if (i === intScore && decimal > 0) {
//                           return (
//                             <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 16.277L7.899 18.828l.9-5.233-3.844-3.749 5.249-.764L12 4.25l1.796 4.832 5.249.764-3.844 3.749.9 5.233z" fillOpacity="0.5" />
//                               <path d="M12 4.25v12.027l-4.101 2.551.9-5.233-3.844-3.749 5.249-.764L12 4.25z" />
//                             </svg>
//                           );
//                         }
//                         // Étoile pleine
//                         return i < intScore ? (
//                           <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ) : (
//                           <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Résumé des infrastructures */}
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Électricité</span>
//                     <span className={`font-medium ${school.existe_elect ? 'text-green-600' : 'text-red-600'}`}>
//                       {school.existe_elect ? 'Disponible' : 'Non disponible'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Eau potable</span>
//                     <span className={`font-medium ${school.eau ? 'text-green-600' : 'text-red-600'}`}>
//                       {school.eau ? 'Disponible' : 'Non disponible'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Latrines</span>
//                     <span className={`font-medium ${school.existe_latrine ? 'text-green-600' : 'text-red-600'}`}>
//                       {school.existe_latrine ? 'Disponible' : 'Non disponible'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Latrines fonctionnelles</span>
//                     <span className={`font-medium ${school.existe_latrine_fonct ? 'text-green-600' : 'text-red-600'}`}>
//                       {school.existe_latrine_fonct ? 'Disponible' : 'Non disponible'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Accès toute saison</span>
//                     <span className={`font-medium ${school.acces_toute_saison ? 'text-green-600' : 'text-red-600'}`}>
//                       {school.acces_toute_saison ? 'Oui' : 'Non'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SchoolDetailPage;