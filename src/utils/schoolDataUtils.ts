// Définition des interfaces
interface SchoolData {
  niveau?: string;
  nom_etablissement: string;
  code_minesec?: number | string;
  code_minedub?: number | string;
  existe_elect?: boolean | number;
  existe_latrine?: boolean | number;
  eau?: boolean | number;
  acces_toute_saison?: boolean | number;
  sommedenb_salles_classes_dur?: number;
  bibliotheque?: boolean | number;
  internet?: boolean | number;
  cantine?: boolean | number;
  infirmerie?: boolean | number;
}

// Fonction pour déterminer le niveau d'une école
export function determineLevel(data: SchoolData): string {
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
export function determineFacilities(data: SchoolData): string[] {
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
  
// Fonction pour déterminer la couleur en fonction du type d'établissement
export function getSchoolTypeColor(type: string): string {
    if (type === "Public") return "bg-green-100 text-green-800";
    if (type.includes("Laïc")) return "bg-blue-100 text-blue-800";
    if (type.includes("Protestant")) return "bg-purple-100 text-purple-800";
    if (type.includes("Catholique")) return "bg-indigo-100 text-indigo-800";
    return "bg-orange-100 text-orange-800";
}