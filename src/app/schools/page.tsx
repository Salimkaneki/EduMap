// // app/schools/page.jsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import dynamic from 'next/dynamic';
// import { ErrorBoundary } from 'react-error-boundary';

// // Importer MapComponent côté client uniquement (pour éviter les erreurs SSR avec Leaflet)
// // const DynamicMap = dynamic(() => import('@/components/MapComponent'), {
// //   ssr: false,
// //   loading: () => <div className="h-[600px] flex items-center justify-center bg-gray-100">Chargement de la carte...</div>
// // });

// // Fallback pour l'ErrorBoundary
// const ErrorFallback = ({ error }) => (
//   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//     <h2 className="text-lg font-semibold">Une erreur est survenue</h2>
//     <p>{error.message}</p>
//   </div>
// );

// const SchoolsPage = () => {
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
  
//   // Données statiques pour les options de filtres
//   const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
//   const schoolTypes = ['Public', 'Privé', 'Confessionnel', 'Communautaire'];
//   const prefectures = [
//     { id: 1, name: 'Lomé', region: 'Maritime' },
//     { id: 2, name: 'Golfe', region: 'Maritime' },
//     { id: 3, name: 'Vo', region: 'Maritime' },
//     { id: 4, name: 'Kloto', region: 'Plateaux' },
//     { id: 5, name: 'Agou', region: 'Plateaux' },
//     { id: 6, name: 'Sotouboua', region: 'Centrale' },
//     { id: 7, name: 'Tchaoudjo', region: 'Centrale' },
//     { id: 8, name: 'Kozah', region: 'Kara' },
//     { id: 9, name: 'Kéran', region: 'Kara' },
//     { id: 10, name: 'Tone', region: 'Savanes' },
//     { id: 11, name: 'Oti', region: 'Savanes' },
//   ];

//   useEffect(() => {
//     // Fonction pour charger les données des écoles
//     const fetchSchools = async () => {
//       try {
//         setLoading(true);
        
//         // En production, remplacez ceci par votre API réelle
//         // const response = await fetch('/api/schools');
//         // const data = await response.json();
        
//         // Pour le moment, utilisons des données fictives
//         const mockData = generateMockSchools();
        
//         setSchools(mockData);
//         setLoading(false);
//       } catch (err) {
//         setError('Erreur lors du chargement des données');
//         setLoading(false);
//         console.error(err);
//       }
//     };
    
//     fetchSchools();
//   }, []);

//   const handleFilterChange = (newFilters) => {
//     // S'assurer que newFilters n'est pas null ou undefined
//     setFilters(newFilters || {});
//     setShowMobileFilters(false);
//   };

//   const handleSchoolClick = (school) => {
//     // Vérifier si school est valide avant de le définir
//     if (school && school.id) {
//       setSelectedSchool(school);
//     }
//   };
  
//   const closeSchoolDetail = () => {
//     setSelectedSchool(null);
//   };
  
//   // Fonction auxiliaire pour générer des données fictives (à remplacer par votre API)
//   const generateMockSchools = () => {
//     const mockSchools = [];
//     const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
//     const prefectures = {
//       'Maritime': ['Lomé', 'Golfe', 'Vo'],
//       'Plateaux': ['Kloto', 'Agou', 'Amou'],
//       'Centrale': ['Sotouboua', 'Tchaoudjo', 'Blitta'],
//       'Kara': ['Kozah', 'Binah', 'Kéran'],
//       'Savanes': ['Tone', 'Oti', 'Tandjouaré']
//     };
//     const types = ['Public', 'Privé', 'Confessionnel', 'Communautaire'];
//     const systems = ['Général', 'Technique', 'Professionnel'];
    
//     // Coordonnées approximatives du Togo
//     const baseCoords = {
//       'Maritime': { lat: 6.1750, lng: 1.3500 },
//       'Plateaux': { lat: 7.0000, lng: 1.0000 },
//       'Centrale': { lat: 8.0000, lng: 1.0000 },
//       'Kara': { lat: 9.5500, lng: 1.1700 },
//       'Savanes': { lat: 10.5000, lng: 0.5000 }
//     };
    
//     // Générer 50 écoles fictives
//     for (let i = 1; i <= 50; i++) {
//       const region = regions[Math.floor(Math.random() * regions.length)];
//       const prefecture = prefectures[region][Math.floor(Math.random() * prefectures[region].length)];
//       const type = types[Math.floor(Math.random() * types.length)];
//       const system = systems[Math.floor(Math.random() * systems.length)];
      
//       // Ajouter une variation aux coordonnées de base
//       const latVar = (Math.random() - 0.5) * 0.5;
//       const lngVar = (Math.random() - 0.5) * 0.5;
      
//       mockSchools.push({
//         id: i,
//         nom_etablissement: `École ${type} ${i}`,
//         region: region,
//         prefecture: prefecture,
//         ville_village_quartier: `Localité ${i}`,
//         libelle_type_statut_etab: type,
//         libelle_type_systeme: system,
//         existe_elect: Math.random() > 0.3,
//         existe_latrine: Math.random() > 0.4,
//         eau: Math.random() > 0.5,
//         acces_toute_saison: Math.random() > 0.2,
//         LATITUDE: (baseCoords[region].lat + latVar).toFixed(4),
//         LONGITUDE: (baseCoords[region].lng + lngVar).toFixed(4)
//       });
//     }
    
//     return mockSchools;
//   };
  
//   // Fonction pour calculer les statistiques en toute sécurité
//   const calculateStats = () => {
//     if (!schools || schools.length === 0) {
//       return {
//         total: 0,
//         withElectricity: 0,
//         withLatrines: 0,
//         withWater: 0
//       };
//     }
    
//     return {
//       total: schools.length,
//       withElectricity: schools.filter(s => s?.existe_elect).length,
//       withLatrines: schools.filter(s => s?.existe_latrine).length,
//       withWater: schools.filter(s => s?.eau).length
//     };
//   };
  
//   const stats = calculateStats();
  
//   return (
//     <div>
//       <Header />
//       <main className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6">Établissements scolaires</h1>
        
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="spinner-border animate-spin h-8 w-8 border-b-2 rounded-full"></div>
//             <p className="ml-2">Chargement des données...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         ) : (
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Filtres pour mobile */}
//             <div className="md:hidden mb-4">
//               <button 
//                 onClick={() => setShowMobileFilters(!showMobileFilters)}
//                 className="w-full bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
//               >
//                 <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1z" />
//                 </svg>
//                 {showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
//               </button>
              
//               {showMobileFilters && (
//                 <div className="mt-4">
//                   <ErrorBoundary FallbackComponent={ErrorFallback}>
//                     <FiltersComponent 
//                       onFilterChange={handleFilterChange} 
//                       regions={regions}
//                       prefectures={prefectures}
//                       types={schoolTypes}
//                     />
//                   </ErrorBoundary>
//                 </div>
//               )}
//             </div>
            
//             {/* Filtres pour desktop */}
//             <div className="hidden md:block md:w-1/3 lg:w-1/4">
//               <ErrorBoundary FallbackComponent={ErrorFallback}>
//                 <FiltersComponent 
//                   onFilterChange={handleFilterChange} 
//                   regions={regions}
//                   prefectures={prefectures}
//                   types={schoolTypes}
//                 />
//               </ErrorBoundary>
//             </div>
            
//             {/* Carte */}
//             <div className="md:w-2/3 lg:w-3/4">
//               <ErrorBoundary FallbackComponent={ErrorFallback}>
//                 <DynamicMap 
//                   schools={schools || []} 
//                   filters={filters || {}}
//                   onSchoolClick={handleSchoolClick}
//                 />
//               </ErrorBoundary>
              
//               <div className="mt-4 p-4 bg-blue-50 rounded-md">
//                 <h2 className="text-lg font-semibold text-blue-800 mb-2">Statistiques</h2>
//                 <p><span className="font-medium">Total des établissements:</span> {stats.total}</p>
//                 <p><span className="font-medium">Établissements avec électricité:</span> {stats.withElectricity}</p>
//                 <p><span className="font-medium">Établissements avec latrines:</span> {stats.withLatrines}</p>
//                 <p><span className="font-medium">Établissements avec accès à l'eau:</span> {stats.withWater}</p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Modal pour afficher les détails d'un établissement */}
//         {selectedSchool && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="max-w-4xl w-full">
//               <ErrorBoundary FallbackComponent={ErrorFallback}>
//                 <SchoolDetailComponent 
//                   school={selectedSchool}
//                   onClose={closeSchoolDetail}
//                 />
//               </ErrorBoundary>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// // Définir FiltersComponent ici pour s'assurer qu'il utilise correctement les props
// const FiltersComponent = ({ onFilterChange, regions, prefectures, types }) => {
//   const [filterState, setFilterState] = useState({
//     region: '',
//     prefecture: '',
//     type: ''
//   });
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newFilterState = { ...filterState, [name]: value };
    
//     // Si on change la région, réinitialiser la préfecture
//     if (name === 'region') {
//       newFilterState.prefecture = '';
//     }
    
//     setFilterState(newFilterState);
    
//     // Informer le composant parent du changement
//     if (onFilterChange) {
//       onFilterChange(newFilterState);
//     }
//   };
  
//   const handleReset = () => {
//     const resetState = {
//       region: '',
//       prefecture: '',
//       type: ''
//     };
//     setFilterState(resetState);
    
//     if (onFilterChange) {
//       onFilterChange(resetState);
//     }
//   };
  
//   // Filtrer les préfectures selon la région sélectionnée
//   const filteredPrefectures = prefectures
//     ? (filterState.region 
//         ? prefectures.filter(p => p.region === filterState.region)
//         : prefectures)
//     : [];
    
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Filtres</h2>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Région
//         </label>
//         <select 
//           name="region"
//           value={filterState.region}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-md px-3 py-2"
//         >
//           <option value="">Toutes les régions</option>
//           {regions && regions.map((region, index) => (
//             <option key={index} value={region}>{region}</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Préfecture
//         </label>
//         <select 
//           name="prefecture"
//           value={filterState.prefecture}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-md px-3 py-2"
//           disabled={!filterState.region}
//         >
//           <option value="">Toutes les préfectures</option>
//           {filteredPrefectures.map((prefecture) => (
//             <option key={prefecture.id} value={prefecture.name}>
//               {prefecture.name}
//             </option>
//           ))}
//         </select>
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Type d'établissement
//         </label>
//         <select 
//           name="type"
//           value={filterState.type}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-md px-3 py-2"
//         >
//           <option value="">Tous les types</option>
//           {types && types.map((type, index) => (
//             <option key={index} value={type}>{type}</option>
//           ))}
//         </select>
//       </div>
      
//       <button
//         onClick={handleReset}
//         className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
//       >
//         Réinitialiser les filtres
//       </button>
//     </div>
//   );
// };

// // Implémentation basique du composant SchoolDetailComponent
// const SchoolDetailComponent = ({ school, onClose }) => {
//   // Vérification de sécurité
//   if (!school) return null;
  
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//         <h3 className="text-xl font-bold">{school.nom_etablissement || 'Détails de l\'établissement'}</h3>
//         <button 
//           onClick={onClose}
//           className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors"
//         >
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Informations générales</h4>
//             <p><span className="font-medium">Type:</span> {school.libelle_type_statut_etab || 'Non spécifié'}</p>
//             <p><span className="font-medium">Système:</span> {school.libelle_type_systeme || 'Non spécifié'}</p>
//             <p><span className="font-medium">Région:</span> {school.region || 'Non spécifiée'}</p>
//             <p><span className="font-medium">Préfecture:</span> {school.prefecture || 'Non spécifiée'}</p>
//             <p><span className="font-medium">Localité:</span> {school.ville_village_quartier || 'Non spécifiée'}</p>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Infrastructure</h4>
//             <p>
//               <span className="font-medium">Électricité:</span> 
//               {school.existe_elect ? (
//                 <span className="text-green-600 ml-1">Disponible</span>
//               ) : (
//                 <span className="text-red-600 ml-1">Non disponible</span>
//               )}
//             </p>
//             <p>
//               <span className="font-medium">Latrines:</span> 
//               {school.existe_latrine ? (
//                 <span className="text-green-600 ml-1">Disponibles</span>
//               ) : (
//                 <span className="text-red-600 ml-1">Non disponibles</span>
//               )}
//             </p>
//             <p>
//               <span className="font-medium">Accès à l'eau:</span> 
//               {school.eau ? (
//                 <span className="text-green-600 ml-1">Disponible</span>
//               ) : (
//                 <span className="text-red-600 ml-1">Non disponible</span>
//               )}
//             </p>
//             <p>
//               <span className="font-medium">Accès toute saison:</span> 
//               {school.acces_toute_saison ? (
//                 <span className="text-green-600 ml-1">Oui</span>
//               ) : (
//                 <span className="text-red-600 ml-1">Non</span>
//               )}
//             </p>
//           </div>
//         </div>
        
//         {/* Coordonnées GPS */}
//         <div className="mt-6">
//           <h4 className="text-lg font-semibold mb-2">Coordonnées GPS</h4>
//           <p><span className="font-medium">Latitude:</span> {school.LATITUDE || 'Non disponible'}</p>
//           <p><span className="font-medium">Longitude:</span> {school.LONGITUDE || 'Non disponible'}</p>
//         </div>
        
//         <div className="mt-6 flex justify-end">
//           <button 
//             onClick={onClose}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
//           >
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchoolsPage;