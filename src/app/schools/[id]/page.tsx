"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { School } from "../../../data/schools"; // Nous gardons l'interface School

// Composant de page pour la route dynamique /schools/[id]
export default function SchoolDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = parseInt(params.id);
  
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [similarSchools, setSimilarSchools] = useState<School[]>([]);

  // Récupérer les données de l'école et les écoles similaires
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Appel à l'API pour récupérer les détails de l'école
        const schoolResponse = await fetch(`/api/etablissements/${id}`);
        
        if (!schoolResponse.ok) {
          throw new Error(`Erreur ${schoolResponse.status}: L'établissement n'a pas pu être chargé`);
        }
        
        const schoolData = await schoolResponse.json();
        
        // Adapter les données de l'API au format de notre interface School
        const adaptedData: School = {
          id: schoolData.id,
          name: schoolData.nom_etablissement,
          type: schoolData.libelle_type_statut_etab || "Non spécifié", 
          location: schoolData.ville_village_quartier || schoolData.prefecture || schoolData.region,
          level: determineLevel(schoolData), // Fonction pour déterminer le niveau scolaire
          rating: schoolData.rating || 0, // Si l'API ne fournit pas de note
          reviews: schoolData.reviews || 0, // Si l'API ne fournit pas d'avis
          description: schoolData.description || `Établissement scolaire situé à ${schoolData.ville_village_quartier}, ${schoolData.prefecture}, ${schoolData.region}.`,
          address: `${schoolData.ville_village_quartier}, ${schoolData.prefecture}, ${schoolData.region}`,
          contact: schoolData.contact || "Non disponible",
          email: schoolData.email || "Non disponible",
          website: schoolData.website || "",
          facilities: determineFacilities(schoolData), // Fonction pour déterminer les installations
          programs: schoolData.programs || [],
        };
        
        setSchool(adaptedData);
        
        // Récupérer des écoles similaires
        const similarResponse = await fetch(`/api/etablissements/${id}/similar?limit=4`);
        
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          
          // Adapter les données des écoles similaires
          const adaptedSimilarSchools: School[] = similarData.data.map((item: any) => ({
            id: item.id,
            name: item.nom_etablissement,
            type: item.libelle_type_statut_etab || "Non spécifié",
            location: item.ville_village_quartier || item.prefecture || item.region,
            level: determineLevel(item),
            rating: item.rating || 0,
            reviews: item.reviews || 0
          }));
          
          setSimilarSchools(adaptedSimilarSchools);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Fonction pour déterminer le niveau d'une école
  function determineLevel(data: any): string {
    // Cette logique dépendra de la structure de vos données API
    // Par exemple, vous pourriez avoir un champ 'niveau' ou déduire à partir d'autres informations
    
    // Si le niveau est explicitement fourni
    if (data.niveau) return data.niveau;
    
    // Ou déterminer à partir du nom ou d'autres attributs
    const name = data.nom_etablissement.toLowerCase();
    if (name.includes('primaire') || name.includes('elementaire') || name.includes('élémentaire')) return 'Primaire';
    if (name.includes('lycée')) return 'Secondaire';
    if (name.includes('collège')) return 'Secondaire';
    if (name.includes('institut') || name.includes('université') || name.includes('ets') || name.includes('sup')) return 'Supérieur';
    
    // Si le code MINESECS/MINEDUB est disponible
    if (data.code_minesec) return 'Secondaire';
    if (data.code_minedub) return 'Primaire';
    
    return 'Non spécifié';
  }

  // Fonction pour déterminer les installations
  function determineFacilities(data: any): string[] {
    const facilities: string[] = [];
    
    // Ajout des installations en fonction des données
    if (data.existe_elect === true || data.existe_elect === 1) 
      facilities.push('Électricité');
    
    if (data.existe_latrine === true || data.existe_latrine === 1) 
      facilities.push('Latrines');
    
    if (data.eau === true || data.eau === 1) 
      facilities.push('Accès à l\'eau');
    
    if (data.acces_toute_saison === true || data.acces_toute_saison === 1) 
      facilities.push('Accès toute saison');
    
    if (data.sommedenb_salles_classes_dur && data.sommedenb_salles_classes_dur > 0)
      facilities.push(`${data.sommedenb_salles_classes_dur} salles de classe en dur`);
    
    if (data.bibliotheque === true || data.bibliotheque === 1)
      facilities.push('Bibliothèque');
      
    if (data.internet === true || data.internet === 1)
      facilities.push('Connexion Internet');
      
    if (data.cantine === true || data.cantine === 1)
      facilities.push('Cantine scolaire');
      
    if (data.infirmerie === true || data.infirmerie === 1)
      facilities.push('Infirmerie');
    
    return facilities;
  }

  // Fonction pour naviguer vers une école similaire
  const goToSimilarSchool = (schoolId: number) => {
    router.push(`/schools/${schoolId}`);
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données de l'établissement...</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error || !school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Établissement non trouvé</h2>
          <p className="text-gray-600 mb-6">{error || "L'établissement que vous recherchez n'existe pas ou a été supprimé."}</p>
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

  return (
    <div className="bg-white min-h-screen">
      {/* En-tête avec image de fond */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
            <div className="flex items-center justify-center mt-2 space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                school.type === "Public" ? "bg-green-100 text-green-800" :
                school.type.includes("Laïc") ? "bg-blue-100 text-blue-800" :
                school.type.includes("Protestant") ? "bg-purple-100 text-purple-800" :
                school.type.includes("Catholique") ? "bg-indigo-100 text-indigo-800" :
                "bg-orange-100 text-orange-800"
              }`}>
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
            
            {school.programs && school.programs.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Les programmes</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {school.programs.map((program, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {school.facilities && school.facilities.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Les installations</h3>
                <div className="grid grid-cols-2 gap-3">
                  {school.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Colonne droite - Contact et informations complémentaires */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de contact</h3>
            
            <div className="space-y-4">
              {school.address && (
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{school.address}</span>
                </div>
              )}
              
              {school.contact && (
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">{school.contact}</span>
                </div>
              )}
              
              {school.email && (
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-600 hover:underline">{school.email}</span>
                </div>
              )}
              
              {school.website && (
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href={school.website.startsWith('http') ? school.website : `https://${school.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {school.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Contacter l'établissement
              </button>
            </div>
            
            <div className="mt-4">
              <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Voir sur la carte
              </button>
            </div>
          </div>
        </div>
        
        {/* Établissements similaires */}
        {similarSchools.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Établissements similaires</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarSchools.map((similar) => (
                <div 
                  key={similar.id} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => goToSimilarSchool(similar.id)}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-24 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{similar.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-1">{similar.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          similar.type === "Public" ? "bg-green-100 text-green-800" :
                          similar.type.includes("Laïc") ? "bg-blue-100 text-blue-800" :
                          similar.type.includes("Protestant") ? "bg-purple-100 text-purple-800" :
                          similar.type.includes("Catholique") ? "bg-indigo-100 text-indigo-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          {similar.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-1 text-sm text-gray-700">{similar.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/schools" className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Voir plus d'établissements
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Bouton de retour en haut */}
        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-blue-600 rounded-full shadow-lg text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}