"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Users,
  GraduationCap,
  Building2,
  Calendar,
  School,
  Award,
  Eye,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { Etablissement } from "../../_model/etablissement";

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
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 5) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getSystemeIcon = (systeme: string) => {
    switch (systeme) {
      case "PRESCOLAIRE":
        return School;
      case "PRIMAIRE":
        return GraduationCap;
      case "SECONDAIRE I":
        return Building2;
      case "SECONDAIRE II":
        return Building2;
      default:
        return School;
    }
  };

  const SystemeIcon = getSystemeIcon(
    etablissement.systeme.libelle_type_systeme
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header de navigation */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/etablissements">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="font-mono">
              <Hash className="h-3 w-3 mr-1" />
              {etablissement.id}
            </Badge>
            <Badge variant="secondary" className="font-mono">
              <Eye className="h-3 w-3 mr-1" />
              {etablissement.code_etablissement}
            </Badge>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales - 2 colonnes */}
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-4 mb-6">
              {/* Icône du système */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <SystemeIcon className="h-8 w-8 text-indigo-600" />
                </div>
              </div>

              {/* Titre et infos */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {etablissement.statut.libelle_type_statut_etab}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {etablissement.systeme.libelle_type_systeme}
                  </Badge>
                  <Badge
                    className={`${getScoreColor(infrastructureScore)} border`}
                  >
                    <Award className="h-3 w-3 mr-1" />
                    Score: {infrastructureScore}/10
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {etablissement.nom_etablissement}
                </h1>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">
                      {etablissement.localisation?.ville_village_quartier ||
                        "N/A"}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {etablissement.localisation?.prefecture || "N/A"}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{etablissement.localisation?.region || "N/A"}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                      <span>
                        Milieu {etablissement.milieu.libelle_type_milieu}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{etablissement.annee.libelle_type_annee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats rapides - 1 colonne */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aperçu rapide
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">Élèves</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalEleves.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Enseignants</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalEnseignants.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-700">Salles</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalSalles.toLocaleString()}
                  </span>
                </div>

                {/* Ratio élèves/enseignant */}
                {totalEnseignants > 0 && (
                  <div className="mt-4 pt-4 border-t border-indigo-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        {Math.round(totalEleves / totalEnseignants)}:1
                      </div>
                      <div className="text-sm text-gray-600">
                        Ratio élèves/enseignant
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
