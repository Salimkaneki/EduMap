"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  Building2,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Etablissement } from "../../_model/etablissement";

interface SchoolStatsProps {
  etablissement: Etablissement;
}

export default function SchoolStats({ etablissement }: SchoolStatsProps) {
  const effectif = etablissement.effectif;
  const infrastructure = etablissement.infrastructure;

  if (!effectif && !infrastructure) {
    return (
      <Card className="p-10 text-center bg-white shadow-sm rounded-xl">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-800">
          Aucune donnée disponible
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Les statistiques détaillées ne sont pas disponibles pour cet établissement.
        </p>
      </Card>
    );
  }

  const statsData = [
    ...(effectif
      ? [
          {
            title: "Garçons",
            value: effectif.sommedenb_eff_g || 0,
            color: "blue",
            category: "Élèves",
          },
          {
            title: "Filles",
            value: effectif.sommedenb_eff_f || 0,
            color: "pink",
            category: "Élèves",
          },
          {
            title: "Total",
            value: effectif.sommedenb_eff_g + effectif.sommedenb_eff_f || 0,
            color: "indigo",
            category: "Élèves",
          },
          {
            title: "Profs Hommes",
            value: effectif.sommedenb_ens_h || 0,
            color: "green",
            category: "Enseignants",
          },
          {
            title: "Profs Femmes",
            value: effectif.sommedenb_ens_f || 0,
            color: "emerald",
            category: "Enseignants",
          },
          {
            title: "Total Profs",
            value: effectif.sommedenb_ens_h + effectif.sommedenb_ens_f || 0,
            color: "teal",
            category: "Enseignants",
          },
        ]
      : []),

    ...(infrastructure
      ? [
          {
            title: "Salles durables",
            value: infrastructure.sommedenb_salles_classes_dur || 0,
            color: "orange",
            category: "Infrastructure",
          },
          {
            title: "Salles banco",
            value: infrastructure.sommedenb_salles_classes_banco || 0,
            color: "amber",
            category: "Infrastructure",
          },
          {
            title: "Autres salles",
            value: infrastructure.sommedenb_salles_classes_autre || 0,
            color: "yellow",
            category: "Infrastructure",
          },
        ]
      : []),
  ];

  const groupedStats = statsData.reduce((acc, stat) => {
    if (!acc[stat.category]) acc[stat.category] = [];
    acc[stat.category].push(stat);
    return acc;
  }, {} as Record<string, typeof statsData>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedStats).map(([category, stats]) => (
        <Card key={category} className="p-8 shadow-sm rounded-xl bg-white">
          {/* HEADER */}
          <div className="flex items-center mb-6">
            {category === "Élèves" && (
              <Users className="h-5 w-5 text-indigo-500 mr-2" />
            )}
            {category === "Enseignants" && (
              <GraduationCap className="h-5 w-5 text-green-500 mr-2" />
            )}
            {category === "Infrastructure" && (
              <Building2 className="h-5 w-5 text-orange-500 mr-2" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            <Badge variant="secondary" className="ml-auto">
              {stats.reduce((sum, s) => sum + s.value, 0).toLocaleString()} au total
            </Badge>
          </div>

          {/* GRID STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const maxVal = Math.max(...stats.map((s) => s.value));
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-5 hover:shadow transition"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </span>
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                  </div>

                  {/* Value */}
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value.toLocaleString()}
                  </p>

                  {/* Progress bar */}
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${stat.color}-500`}
                      style={{
                        width: `${Math.min(
                          100,
                          (stat.value / maxVal) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
