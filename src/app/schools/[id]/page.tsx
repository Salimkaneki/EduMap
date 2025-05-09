"use client";

import React from "react";
import { useRouter } from "next/navigation";
// L'import de School est commenté, ce qui est correct
// import { School } from "../../../data/schools";

import SchoolHeader from "@/components/schools/SchoolHeader";
import SchoolInfo from "@/components/schools/SchoolInfo";
import ContactInfo from "@/components/schools/ContactInfo";
import SimilarSchools from "@/components/schools/SimilarSchools";
import LoadingState from "@/components/schools/LoadingState";
import ErrorState from "@/components/schools/ErrorState";
import BackToTopButton from "@/components/ui/BackToTopButton";

import useSchoolData from "../../../hooks/useSchoolData";

// Définir le type pour les paramètres
type SchoolParams = {
  id: string;
};

// Fonction wrapper qui reçoit les paramètres et les passe au composant réel
export default function SchoolDetailPageWrapper({ params }: { params: Promise<SchoolParams> }) {
  // Utiliser React.use pour "unwrap" les paramètres et faire une assertion de type
  const resolvedParams = React.use(params) as SchoolParams;
  
  // Rendre le composant réel avec les paramètres résolus
  return <SchoolDetailPageContent id={resolvedParams.id} />;
}

// Le composant réel qui fait tout le travail
function SchoolDetailPageContent({ id }: { id: string }) {
  const router = useRouter();
  const numericId = parseInt(id);
  
  const {
    school,
    similarSchools,
    loading,
    error
  } = useSchoolData(numericId);

  // Fonction pour naviguer vers une école similaire
  const goToSimilarSchool = (schoolId: number) => {
    router.push(`/schools/${schoolId}`);
  };

  // Affichage pendant le chargement
  if (loading) {
    return <LoadingState />;
  }

  // Affichage en cas d'erreur
  if (error || !school) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* En-tête avec image de fond */}
      <SchoolHeader school={school} />
      
      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations essentielles */}
          <div className="md:col-span-2">
            <SchoolInfo school={school} />
          </div>
          
          {/* Colonne droite - Contact et informations complémentaires */}
          <ContactInfo school={school} />
        </div>
        
        {/* Établissements similaires */}
        {similarSchools.length > 0 && (
          <SimilarSchools 
            similarSchools={similarSchools}
            onSelectSchool={goToSimilarSchool}
          />
        )}
        
        {/* Bouton de retour en haut */}
        <BackToTopButton />
      </div>
    </div>
  );
}