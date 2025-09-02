"use client";

import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Building, Eye } from "lucide-react";
import { Etablissement } from "../../_model/etablissement";
import { THEME_CLASSES, ESTABLISHMENT_COLORS } from "@/lib/theme";

interface HeroSectionProps {
  etablissement: Etablissement;
  totalEleves: number;
  totalEnseignants: number;
  totalSalles: number;
  infrastructureScore: number;
}

export default function HeroSection({
  etablissement,
  totalEleves,
  totalEnseignants,
  totalSalles,
  infrastructureScore,
}: HeroSectionProps) {
  const systemeInfo = ESTABLISHMENT_COLORS[
    etablissement.systeme
      .libelle_type_systeme as keyof typeof ESTABLISHMENT_COLORS
  ] || {
    emoji: "�",
    bg: "bg-indigo-500",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
  };

  const getScoreColor = (score: number) => {
    if (score === 3) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score === 2) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div
      className={`relative ${THEME_CLASSES.gradients.primary} ${THEME_CLASSES.rounded.xl} overflow-hidden mb-12 ${THEME_CLASSES.shadows["2xl"]}`}
    >
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm30 0c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Avatar Premium */}
          <div className="flex-shrink-0">
            <div
              className={`w-24 h-24 lg:w-32 lg:h-32 bg-indigo-500 ${THEME_CLASSES.rounded.xl} ${THEME_CLASSES.shadows["2xl"]} flex items-center justify-center ${THEME_CLASSES.text.white} text-4xl lg:text-5xl border-4 border-white/30`}
            >
              {systemeInfo.emoji}
            </div>
          </div>

          {/* Info principale */}
          <div className={`flex-1 ${THEME_CLASSES.text.white}`}>
            <div className="flex flex-wrap items-start gap-3 mb-4">
              <Badge
                className={`${THEME_CLASSES.glass.overlay} ${THEME_CLASSES.text.white} text-sm font-medium px-4 py-2`}
              >
                {etablissement.statut.libelle_type_statut_etab}
              </Badge>
              <Badge
                className={`${THEME_CLASSES.glass.overlay} ${THEME_CLASSES.text.white} text-sm font-medium px-4 py-2`}
              >
                {etablissement.systeme.libelle_type_systeme}
              </Badge>
              <div
                className={`flex items-center gap-2 px-3 py-1 ${
                  THEME_CLASSES.rounded.md
                } ${getScoreColor(
                  infrastructureScore
                )} backdrop-blur-sm border`}
              >
                <Award className="w-4 h-4" />
                <span className="text-sm font-bold">
                  Score: {infrastructureScore}/3
                </span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              {etablissement.nom_etablissement}
            </h1>

            <div
              className={`flex items-center text-white/90 text-lg lg:text-xl mb-6`}
            >
              <MapPin className="h-6 w-6 mr-3" />
              <span>
                {etablissement.localisation.ville_village_quartier},{" "}
                {etablissement.localisation.prefecture},{" "}
                {etablissement.localisation.region}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm">
                  Milieu {etablissement.milieu.libelle_type_milieu}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">
                  Code: {etablissement.code_etablissement}
                </span>
              </div>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <div
              className={`text-center ${THEME_CLASSES.glass.overlay} ${THEME_CLASSES.rounded.lg} p-4`}
            >
              <div
                className={`text-2xl lg:text-3xl font-bold ${THEME_CLASSES.text.white}`}
              >
                {totalEleves}
              </div>
              <div className="text-white/80 text-sm">Élèves</div>
            </div>
            <div
              className={`text-center ${THEME_CLASSES.glass.overlay} ${THEME_CLASSES.rounded.lg} p-4`}
            >
              <div
                className={`text-2xl lg:text-3xl font-bold ${THEME_CLASSES.text.white}`}
              >
                {totalEnseignants}
              </div>
              <div className="text-white/80 text-sm">Profs</div>
            </div>
            <div
              className={`text-center ${THEME_CLASSES.glass.overlay} ${THEME_CLASSES.rounded.lg} p-4`}
            >
              <div
                className={`text-2xl lg:text-3xl font-bold ${THEME_CLASSES.text.white}`}
              >
                {totalSalles}
              </div>
              <div className="text-white/80 text-sm">Salles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
