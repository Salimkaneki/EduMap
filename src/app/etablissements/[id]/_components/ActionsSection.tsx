"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  Download, 
  Calendar,
  Clock,
  Info,
  ExternalLink,
  FileText,
  MapPin,
  Building2
} from "lucide-react";
import { Etablissement } from "../../_model/etablissement";
import Link from "next/link";

interface ActionsSectionProps {
  etablissement: Etablissement;
}

export default function ActionsSection({ etablissement }: ActionsSectionProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${etablissement.nom_etablissement} - EduMap`,
          text: `Découvrez les informations de ${etablissement.nom_etablissement}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé', error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API de partage
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleDownload = () => {
    // Créer un objet avec les données de l'établissement
    const data = {
      etablissement: {
        nom: etablissement.nom_etablissement,
        code: etablissement.code_etablissement,
        coordonnees: {
          latitude: etablissement.latitude,
          longitude: etablissement.longitude
        },
        localisation: etablissement.localisation,
        milieu: etablissement.milieu?.libelle_type_milieu,
        statut: etablissement.statut?.libelle_type_statut_etab,
        systeme: etablissement.systeme?.libelle_type_systeme,
        effectifs: etablissement.effectif,
        infrastructure: etablissement.infrastructure,
        equipement: etablissement.equipement
      },
      exportDate: new Date().toISOString(),
      source: 'EduMap'
    };

    // Créer et télécharger le fichier JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etablissement-${etablissement.code_etablissement}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non spécifié';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Actions rapides */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Share2 className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 group"
          >
            <Share2 className="h-5 w-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Partager</p>
              <p className="text-sm text-blue-700">Partager cet établissement</p>
            </div>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200 group"
          >
            <Download className="h-5 w-5 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="font-medium text-green-900">Télécharger</p>
              <p className="text-sm text-green-700">Exporter les données</p>
            </div>
          </button>
        </div>
      </Card>

      {/* Informations système */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Info className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Informations système</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Code établissement</span>
              </div>
              <p className="font-mono text-sm bg-white px-2 py-1 rounded border">
                {etablissement.code_etablissement}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Building2 className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Type d'établissement</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {etablissement.milieu?.libelle_type_milieu || 'Non spécifié'}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Statut</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {etablissement.statut?.libelle_type_statut_etab || 'Non spécifié'}
              </Badge>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Système</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {etablissement.systeme?.libelle_type_systeme || 'Non spécifié'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Métadonnées */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Dernières mises à jour</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Établissement:</span>
            <span className="font-medium">{formatDate(etablissement.updated_at)}</span>
          </div>
          
          {etablissement.effectif?.updated_at && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Effectifs:</span>
              <span className="font-medium">{formatDate(etablissement.effectif.updated_at)}</span>
            </div>
          )}
          
          {etablissement.infrastructure?.updated_at && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Infrastructure:</span>
              <span className="font-medium">{formatDate(etablissement.infrastructure.updated_at)}</span>
            </div>
          )}
          
          {etablissement.equipement?.updated_at && (
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Équipement:</span>
              <span className="font-medium">{formatDate(etablissement.equipement.updated_at)}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Données fournies par EduMap • Dernière synchronisation: {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </Card>

      {/* Liens utiles */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <ExternalLink className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Liens utiles</h3>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/etablissements"
            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <Building2 className="h-4 w-4 text-gray-600 mr-3" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
              Retour à la liste des établissements
            </span>
            <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
          </Link>

          <Link
            href="/map"
            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <MapPin className="h-4 w-4 text-gray-600 mr-3" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
              Voir sur la carte générale
            </span>
            <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
