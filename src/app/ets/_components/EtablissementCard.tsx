"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Building,
  GraduationCap,
  Zap,
  Droplets,
  Home,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Etablissement } from "../_model/etablissement";

interface EtablissementCardProps {
  etablissement: Etablissement;
  onViewDetails?: (id: number) => void;
  onViewOnMap?: (lat: number, lng: number) => void;
}

export default function EtablissementCard({
  etablissement,
  onViewDetails,
  onViewOnMap,
}: EtablissementCardProps) {
  const totalEleves =
    etablissement.effectif.sommedenb_eff_g +
    etablissement.effectif.sommedenb_eff_f;
  const totalEnseignants =
    etablissement.effectif.sommedenb_ens_h +
    etablissement.effectif.sommedenb_ens_f;
  const totalSalles =
    etablissement.infrastructure.sommedenb_salles_classes_dur +
    etablissement.infrastructure.sommedenb_salles_classes_banco +
    etablissement.infrastructure.sommedenb_salles_classes_autre;

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Public":
        return "bg-green-100 text-green-800 border-green-200";
      case "Privé Laïc":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Privé Catholique":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Privé Protestant":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Privé Islamique":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Communautaire":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSystemeColor = (systeme: string) => {
    switch (systeme) {
      case "PRESCOLAIRE":
        return "bg-pink-100 text-pink-800";
      case "PRIMAIRE":
        return "bg-blue-100 text-blue-800";
      case "SECONDAIRE I":
        return "bg-indigo-100 text-indigo-800";
      case "SECONDAIRE II":
        return "bg-violet-100 text-violet-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {etablissement.nom_etablissement}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Code: {etablissement.code_etablissement}
            </p>
          </div>
        </div>

        {/* Badges de statut et système */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            className={`${getStatutColor(
              etablissement.statut.libelle_type_statut_etab
            )} border`}
          >
            {etablissement.statut.libelle_type_statut_etab}
          </Badge>
          <Badge
            variant="secondary"
            className={getSystemeColor(
              etablissement.systeme.libelle_type_systeme
            )}
          >
            {etablissement.systeme.libelle_type_systeme}
          </Badge>
        </div>

        {/* Localisation */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium">{etablissement.localisation.region}</p>
            <p>{etablissement.localisation.prefecture}</p>
            <p className="text-xs">
              {etablissement.localisation.ville_village_quartier}
            </p>
          </div>
        </div>

        {/* Milieu */}
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Milieu {etablissement.milieu.libelle_type_milieu}
          </span>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{totalEleves}</p>
            <p className="text-xs text-gray-600">Élèves</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <GraduationCap className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {totalEnseignants}
            </p>
            <p className="text-xs text-gray-600">Enseignants</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Building className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{totalSalles}</p>
            <p className="text-xs text-gray-600">Salles</p>
          </div>
        </div>

        {/* Infrastructures */}
        <div className="flex justify-center gap-4 mb-4">
          <div
            className={`flex items-center gap-1 ${
              etablissement.equipement.existe_elect
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">Électricité</span>
          </div>

          <div
            className={`flex items-center gap-1 ${
              etablissement.equipement.eau ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span className="text-xs">Eau</span>
          </div>

          <div
            className={`flex items-center gap-1 ${
              etablissement.equipement.existe_latrine
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">Latrines</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() =>
              onViewOnMap?.(
                parseFloat(etablissement.latitude),
                parseFloat(etablissement.longitude)
              )
            }
          >
            <MapPin className="w-4 h-4 mr-1" />
            Carte
          </Button>

          <Button
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(etablissement.id)}
          >
            <Eye className="w-4 h-4 mr-1" />
            Détails
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
