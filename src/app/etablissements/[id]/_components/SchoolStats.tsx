"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  BarChart3,
  TrendingUp,
  UserCheck,
  UserX
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
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
          <p className="text-sm">Les statistiques détaillées ne sont pas disponibles pour cet établissement.</p>
        </div>
      </Card>
    );
  }

  const statsData = [
    // Effectifs élèves
    ...(effectif
      ? [
          {
            title: "Élèves Garçons",
            value: effectif.sommedenb_eff_g || 0,
            icon: UserCheck,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            category: "Élèves",
          },
          {
            title: "Élèves Filles",
            value: effectif.sommedenb_eff_f || 0,
            icon: UserX,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
            category: "Élèves",
          },
          {
            title: "Total Élèves",
            value: effectif.sommedenb_eff_g + effectif.sommedenb_eff_f || 0,
            icon: Users,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            category: "Élèves",
          },
          {
            title: "Enseignants Hommes",
            value: effectif.sommedenb_ens_h || 0,
            icon: GraduationCap,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            category: "Enseignants",
          },
          {
            title: "Enseignantes Femmes",
            value: effectif.sommedenb_ens_f || 0,
            icon: GraduationCap,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
            category: "Enseignants",
          },
          {
            title: "Total Enseignants",
            value: effectif.sommedenb_ens_h + effectif.sommedenb_ens_f || 0,
            icon: GraduationCap,
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
            category: "Enseignants",
          },
        ]
      : []),

    // Infrastructure
    ...(infrastructure
      ? [
          {
            title: "Salles Durables",
            value: infrastructure.sommedenb_salles_classes_dur || 0,
            icon: Building2,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            category: "Infrastructure",
          },
          {
            title: "Salles Banco",
            value: infrastructure.sommedenb_salles_classes_banco || 0,
            icon: Building2,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200",
            category: "Infrastructure",
          },
          {
            title: "Autres Salles",
            value: infrastructure.sommedenb_salles_classes_autre || 0,
            icon: Building2,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            category: "Infrastructure",
          },
        ]
      : []),
  ];

  // Grouper les stats par catégorie
  const groupedStats = statsData.reduce((acc, stat) => {
    if (!acc[stat.category]) {
      acc[stat.category] = [];
    }
    acc[stat.category].push(stat);
    return acc;
  }, {} as Record<string, typeof statsData>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedStats).map(([category, stats]) => (
        <Card key={category} className="p-6">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {category === "Élèves" && <Users className="h-5 w-5 text-indigo-600 mr-2" />}
              {category === "Enseignants" && <GraduationCap className="h-5 w-5 text-green-600 mr-2" />}
              {category === "Infrastructure" && <Building2 className="h-5 w-5 text-orange-600 mr-2" />}
              <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {stats.reduce((sum, stat) => sum + stat.value, 0).toLocaleString()} au total
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                  </div>
                  
                  {/* Barre de progression relative */}
                  {category !== "Infrastructure" && (
                    <div className="mt-3">
                      <div className="bg-white/60 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stat.color.replace('text-', 'bg-').replace('-600', '-400')}`}
                          style={{ 
                            width: `${Math.min(100, (stat.value / Math.max(...stats.map(s => s.value))) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Insights spécifiques */}
          {category === "Élèves" && effectif && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Répartition par genre</h4>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span>Garçons: {((effectif.sommedenb_eff_g / effectif.tot) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
                  <span>Filles: {((effectif.sommedenb_eff_f / effectif.tot) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
