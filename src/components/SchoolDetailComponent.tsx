// // components/SchoolDetailComponent.jsx
// import React from 'react';
// import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

// const SchoolDetailComponent = ({ school, onClose }) => {
//   if (!school) return null;

//   const infrastructureItems = [
//     { name: 'Électricité', value: school.existe_elect },
//     { name: 'Latrines', value: school.existe_latrine },
//     { name: 'Eau', value: school.eau },
//     { name: 'Accès toute saison', value: school.acces_toute_saison },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
//       <div className="flex justify-between items-start mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">{school.nom_etablissement}</h2>
//         <button 
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Informations générales</h3>
//           <table className="w-full">
//             <tbody>
//               <tr>
//                 <td className="py-1 text-gray-600 font-medium">Type:</td>
//                 <td>{school.libelle_type_statut_etab}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 text-gray-600 font-medium">Système:</td>
//                 <td>{school.libelle_type_systeme}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 text-gray-600 font-medium">Région:</td>
//                 <td>{school.region}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 text-gray-600 font-medium">Préfecture:</td>
//                 <td>{school.prefecture}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 text-gray-600 font-medium">Localité:</td>
//                 <td>{school.ville_village_quartier}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Infrastructures</h3>
//           <ul className="space-y-2">
//             {infrastructureItems.map((item, index) => (
//               <li key={index} className="flex items-center">
//                 {item.value ? (
//                   <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
//                 ) : (
//                   <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
//                 )}
//                 <span className={item.value ? 'text-gray-800' : 'text-gray-500'}>
//                   {item.name}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {(school.LATITUDE && school.LONGITUDE) && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Coordonnées</h3>
//           <p>Latitude: {school.LATITUDE}, Longitude: {school.LONGITUDE}</p>
//         </div>
//       )}

//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={onClose}
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
//         >
//           Fermer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SchoolDetailComponent;