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
  CheckCircle,
  XCircle,
  Star,
  Award,
  MoreHorizontal,
  ExternalLink,
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

  const getStatutGradient = (statut: string) => {
    const gradients = {
      Public: "from-emerald-500 to-teal-600",
      "Privé Laïc": "from-indigo-500 to-purple-600",
      "Privé Catholique": "from-purple-500 to-pink-600",
      "Privé Protestant": "from-orange-500 to-red-600",
      "Privé Islamique": "from-cyan-500 to-blue-600",
      Communautaire: "from-red-500 to-pink-600",
    };
    return (
      gradients[statut as keyof typeof gradients] || "from-gray-500 to-gray-600"
    );
  };

  const getSystemeInfo = (systeme: string) => {
    const info = {
      PRESCOLAIRE: { emoji: "🎨", color: "bg-pink-500", label: "Préscolaire" },
      PRIMAIRE: { emoji: "📚", color: "bg-blue-500", label: "Primaire" },
      "SECONDAIRE I": { emoji: "🎓", color: "bg-indigo-500", label: "Collège" },
      "SECONDAIRE II": { emoji: "🏛️", color: "bg-purple-500", label: "Lycée" },
    };
    return (
      info[systeme as keyof typeof info] || {
        emoji: "🏫",
        color: "bg-gray-500",
        label: systeme,
      }
    );
  };

  const systemeInfo = getSystemeInfo(
    etablissement.systeme.libelle_type_systeme
  );

  const infrastructureScore = [
    etablissement.equipement.existe_elect,
    etablissement.equipement.eau,
    etablissement.equipement.existe_latrine,
  ].filter(Boolean).length;

  const getScoreColor = (score: number) => {
    if (score === 3) return "text-emerald-600 bg-emerald-50";
    if (score === 2) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white max-w-sm">
      {/* Gradient Header avec Pattern */}
      <div
        className={`relative h-24 bg-gradient-to-r ${getStatutGradient(
          etablissement.statut.libelle_type_statut_etab
        )} overflow-hidden`}
      >
        {/* Pattern Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Score Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full ${getScoreColor(
              infrastructureScore
            )} backdrop-blur-sm border border-white/20`}
          >
            <Award className="w-3 h-3" />
            <span className="text-xs font-bold">{infrastructureScore}/3</span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium backdrop-blur-sm">
            {etablissement.statut.libelle_type_statut_etab}
          </Badge>
        </div>
      </div>

      <CardContent className="p-0 relative">
        {/* Avatar et Header Info */}
        <div className="relative px-4 pt-4 pb-3">
          {/* Avatar flottant */}
          <div className="absolute -top-8 left-4">
            <div
              className={`w-16 h-16 ${systemeInfo.color} rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl border-4 border-white`}
            >
              {systemeInfo.emoji}
            </div>
          </div>

          {/* Contenu principal décalé */}
          <div className="ml-20 pt-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {etablissement.nom_etablissement}
                </h3>
                <Badge
                  variant="secondary"
                  className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200 font-medium"
                >
                  {systemeInfo.label}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Localisation avec style premium */}
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {etablissement.localisation.ville_village_quartier}
                </p>
                <p className="text-xs text-gray-500">
                  {etablissement.localisation.prefecture},{" "}
                  {etablissement.localisation.region}
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-white border-gray-200"
              >
                {etablissement.milieu.libelle_type_milieu}
              </Badge>
            </div>
          </div>
        </div>

        {/* Statistiques avec design premium */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  Élèves
                </span>
              </div>
              <p className="text-lg font-bold text-blue-900">{totalEleves}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">
                  Profs
                </span>
              </div>
              <p className="text-lg font-bold text-emerald-900">
                {totalEnseignants ? totalEnseignants : <span className="text-gray-500">N/A</span>}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-3 border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">
                  Salles
                </span>
              </div>
              <p className="text-lg font-bold text-purple-900">{totalSalles}</p>
            </div>
          </div>
        </div>

        {/* Infrastructures avec texte - Version compacte sur une ligne */}
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-600" />
              Infrastructures
            </h4>
            <div className="flex items-center justify-between gap-2">
              {/* Électricité */}
              <div className="flex-1 bg-white rounded-lg border border-gray-100 p-2">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-medium text-gray-700">
                    Élec.
                  </span>
                </div>
                <div className="flex items-center justify-center mt-1">
                  {etablissement.equipement.existe_elect ? (
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>

              {/* Eau potable */}
              <div className="flex-1 bg-white rounded-lg border border-gray-100 p-2">
                <div className="flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Eau</span>
                </div>
                <div className="flex items-center justify-center mt-1">
                  {etablissement.equipement.eau ? (
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>

              {/* Latrines */}
              <div className="flex-1 bg-white rounded-lg border border-gray-100 p-2">
                <div className="flex items-center justify-center gap-1">
                  <Home className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-gray-700">WC</span>
                </div>
                <div className="flex items-center justify-center mt-1">
                  {etablissement.equipement.existe_latrine ? (
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions avec design premium */}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 h-9"
              onClick={() =>
                onViewOnMap?.(
                  parseFloat(etablissement.latitude),
                  parseFloat(etablissement.longitude)
                )
              }
            >
              <MapPin className="w-4 h-4 mr-2" />
              Localiser
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-9"
              onClick={() => onViewDetails?.(etablissement.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Détails
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
