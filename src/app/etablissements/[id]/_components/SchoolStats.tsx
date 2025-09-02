"use client";

import { Badge } from "@/components/ui/badge";
import { Etablissement } from "../../_model/etablissement";

interface SchoolStatsProps {
  etablissement: Etablissement;
}

interface StatItem {
  label: string;
  value: number;
  type: string;
  color: string;
}

export default function SchoolStats({ etablissement }: SchoolStatsProps) {
  const getStatData = (): StatItem[] => {
    const stats: StatItem[] = [];

    // Effectifs élèves
    if (etablissement.effectif) {
      if (etablissement.effectif.sommedenb_eff_g > 0) {
        stats.push({
          label: "Élèves Garçons",
          value: etablissement.effectif.sommedenb_eff_g,
          type: "eleve",
          color: "bg-indigo-50 border-indigo-200 text-indigo-800",
        });
      }
      if (etablissement.effectif.sommedenb_eff_f > 0) {
        stats.push({
          label: "Élèves Filles",
          value: etablissement.effectif.sommedenb_eff_f,
          type: "eleve",
          color: "bg-pink-50 border-pink-200 text-pink-800",
        });
      }
      if (etablissement.effectif.tot > 0) {
        stats.push({
          label: "Total Élèves",
          value: etablissement.effectif.tot,
          type: "eleve",
          color: "bg-blue-50 border-blue-200 text-blue-800",
        });
      }
    }

    // Effectifs enseignants
    if (etablissement.effectif) {
      if (etablissement.effectif.sommedenb_ens_h > 0) {
        stats.push({
          label: "Enseignants Hommes",
          value: etablissement.effectif.sommedenb_ens_h,
          type: "enseignant",
          color: "bg-indigo-50 border-indigo-200 text-indigo-800",
        });
      }
      if (etablissement.effectif.sommedenb_ens_f > 0) {
        stats.push({
          label: "Enseignantes Femmes",
          value: etablissement.effectif.sommedenb_ens_f,
          type: "enseignant",
          color: "bg-purple-50 border-purple-200 text-purple-800",
        });
      }
      if (etablissement.effectif.total_ense > 0) {
        stats.push({
          label: "Total Enseignants",
          value: etablissement.effectif.total_ense,
          type: "enseignant",
          color: "bg-violet-50 border-violet-200 text-violet-800",
        });
      }
    }

    // Infrastructure - salles
    if (etablissement.infrastructure) {
      if (etablissement.infrastructure.sommedenb_salles_classes_dur > 0) {
        stats.push({
          label: "Salles Durables",
          value: etablissement.infrastructure.sommedenb_salles_classes_dur,
          type: "salle",
          color: "bg-green-50 border-green-200 text-green-800",
        });
      }
      if (etablissement.infrastructure.sommedenb_salles_classes_banco > 0) {
        stats.push({
          label: "Salles Banco",
          value: etablissement.infrastructure.sommedenb_salles_classes_banco,
          type: "salle",
          color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        });
      }
      if (etablissement.infrastructure.sommedenb_salles_classes_autre > 0) {
        stats.push({
          label: "Autres Salles",
          value: etablissement.infrastructure.sommedenb_salles_classes_autre,
          type: "salle",
          color: "bg-orange-50 border-orange-200 text-orange-800",
        });
      }
    }

    return stats;
  };

  const stats = getStatData();

  if (stats.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          Statistiques
        </h2>
        <p className="text-indigo-600">Aucune donnée statistique disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
        📊 Statistiques détaillées
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-4 border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="text-2xl opacity-60">
                {stat.type === "eleve" && "👨‍🎓"}
                {stat.type === "enseignant" && "👨‍🏫"}
                {stat.type === "salle" && "🏫"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
