import { useState, useEffect } from "react";
import { School } from "../data/schools";
import { determineLevel, determineFacilities } from "../utils/schoolDataUtils";

export default function useSchoolData(id: number) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [similarSchools, setSimilarSchools] = useState<School[]>([]);

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
          level: determineLevel(schoolData),
          rating: schoolData.rating || 0,
          reviews: schoolData.reviews || 0,
          description: schoolData.description || `Établissement scolaire situé à ${schoolData.ville_village_quartier}, ${schoolData.prefecture}, ${schoolData.region}.`,
          address: `${schoolData.ville_village_quartier}, ${schoolData.prefecture}, ${schoolData.region}`,
          contact: schoolData.contact || "Non disponible",
          email: schoolData.email || "Non disponible",
          website: schoolData.website || "",
          facilities: determineFacilities(schoolData),
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

  return { school, similarSchools, loading, error };
}