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
  Star,
  Heart,
  Share2,
} from "lucide-react";
import { Etablissement } from "../_model/etablissement";

interface ModernEtablissementCardProps {
  etablissement: Etablissement;
  onViewDetails?: (id: number) => void;
  onViewOnMap?: (lat: number, lng: number) => void;
  onAddToFavorites?: (id: number) => void;
  isFavorite?: boolean;
}

export default function ModernEtablissementCard({
  etablissement,
  onViewDetails,
  onViewOnMap,
  onAddToFavorites,
  isFavorite = false,
}: ModernEtablissementCardProps) {
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

  const getStatutBadgeStyle = (statut: string) => {
    const styles = {
      Public: "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Privé Laïc": "bg-blue-100 text-blue-800 border-blue-200",
      "Privé Catholique": "bg-purple-100 text-purple-800 border-purple-200",
      "Privé Protestant": "bg-orange-100 text-orange-800 border-orange-200",
      "Privé Islamique": "bg-cyan-100 text-cyan-800 border-cyan-200",
      Communautaire: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      styles[statut as keyof typeof styles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getSystemeBadgeStyle = (systeme: string) => {
    const styles = {
      PRESCOLAIRE: "bg-pink-50 text-pink-700 border-pink-200",
      PRIMAIRE: "bg-blue-50 text-blue-700 border-blue-200",
      "SECONDAIRE I": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "SECONDAIRE II": "bg-violet-50 text-violet-700 border-violet-200",
    };
    return (
      styles[systeme as keyof typeof styles] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  const infrastructureScore = [
    etablissement.equipement.existe_elect,
    etablissement.equipement.eau,
    etablissement.equipement.existe_latrine,
  ].filter(Boolean).length;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Header avec image de fond et badges */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Badges en haut */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Badge
                className={`${getStatutBadgeStyle(
                  etablissement.statut.libelle_type_statut_etab
                )} border font-medium text-xs`}
              >
                {etablissement.statut.libelle_type_statut_etab}
              </Badge>
              <Badge
                className={`${getSystemeBadgeStyle(
                  etablissement.systeme.libelle_type_systeme
                )} border font-medium text-xs`}
              >
                {etablissement.systeme.libelle_type_systeme}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 h-8 w-8"
                onClick={() => onAddToFavorites?.(etablissement.id)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 h-8 w-8"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Score infrastructure */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star
                className={`w-4 h-4 ${
                  infrastructureScore >= 2
                    ? "text-yellow-500 fill-current"
                    : "text-gray-400"
                }`}
              />
              <span className="text-sm font-semibold text-gray-700">
                {infrastructureScore}/3
              </span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6">
          {/* Titre et localisation */}
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {etablissement.nom_etablissement}
            </h3>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">
                  {etablissement.localisation.region}
                </p>
                <p className="text-xs text-gray-500">
                  {etablissement.localisation.prefecture},{" "}
                  {etablissement.localisation.ville_village_quartier}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span>Milieu {etablissement.milieu.libelle_type_milieu}</span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                Code: {etablissement.code_etablissement}
              </span>
            </div>
          </div>

          {/* Statistiques en grille */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{totalEleves}</p>
              <p className="text-xs text-gray-600">Élèves</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {totalEnseignants}
              </p>
              <p className="text-xs text-gray-600">Enseignants</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{totalSalles}</p>
              <p className="text-xs text-gray-600">Salles</p>
            </div>
          </div>

          {/* Infrastructures avec iconographie moderne */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Infrastructures disponibles
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  etablissement.equipement.existe_elect
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Zap
                  className={`w-5 h-5 mb-1 ${
                    etablissement.equipement.existe_elect
                      ? "text-yellow-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-xs font-medium">Électricité</span>
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    etablissement.equipement.existe_elect
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>

              <div
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  etablissement.equipement.eau
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Droplets
                  className={`w-5 h-5 mb-1 ${
                    etablissement.equipement.eau
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-xs font-medium">Eau</span>
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    etablissement.equipement.eau
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>

              <div
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  etablissement.equipement.existe_latrine
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Home
                  className={`w-5 h-5 mb-1 ${
                    etablissement.equipement.existe_latrine
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-xs font-medium">Latrines</span>
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    etablissement.equipement.existe_latrine
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300 hover:border-blue-500 hover:text-blue-600"
              onClick={() =>
                onViewOnMap?.(
                  parseFloat(etablissement.latitude),
                  parseFloat(etablissement.longitude)
                )
              }
            >
              <MapPin className="w-4 h-4 mr-2" />
              Voir sur carte
            </Button>

            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              onClick={() => onViewDetails?.(etablissement.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Détails complets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
