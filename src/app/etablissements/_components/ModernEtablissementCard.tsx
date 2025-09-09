"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  GraduationCap,
  Building,
  Eye,
  Zap,
  Droplets,
  Home,
  ChevronRight,
} from "lucide-react";
import { Etablissement } from "../_model/etablissement";
import { cn } from "@/lib/utils";

interface EtabCardProps {
  etablissement: Etablissement;
  onViewDetails?: (id: number) => void;
  onViewOnMap?: (lat: number, lng: number) => void;
}

export default function EtabCard({
  etablissement,
  onViewDetails,
  onViewOnMap,
}: EtabCardProps) {
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

  const ratioElevesEnseignants = totalEnseignants > 0 ? Math.round(totalEleves / totalEnseignants) : 0;

  const equipments = [
    { key: 'electricity', status: etablissement.equipement.existe_elect, label: 'Électricité', icon: Zap },
    { key: 'water', status: etablissement.equipement.eau, label: 'Eau courante', icon: Droplets },
    { key: 'sanitation', status: etablissement.equipement.existe_latrine, label: 'Sanitaires', icon: Home },
  ];

  const equipmentCount = equipments.filter(eq => eq.status).length;

  return (
    <Card className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 leading-tight">
                  {etablissement.nom_etablissement}
                </h3>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap",
                  etablissement.statut.libelle_type_statut_etab === "Public"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                )}>
                  {etablissement.statut.libelle_type_statut_etab}
                </span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                <span className="line-clamp-1">
                  {etablissement.localisation.ville_village_quartier}, {etablissement.localisation.prefecture}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-4 gap-6">
            <Metric
              label="Élèves"
              value={totalEleves.toLocaleString()}
              icon={Users}
            />
            <Metric
              label="Enseignants"
              value={totalEnseignants ? totalEnseignants.toLocaleString() : "—"}
              icon={GraduationCap}
            />
            <Metric
              label="Salles"
              value={totalSalles.toLocaleString()}
              icon={Building}
            />
            <Metric
              label="Ratio É/E"
              value={ratioElevesEnseignants > 0 ? `${ratioElevesEnseignants}:1` : "—"}
              subtext={ratioElevesEnseignants > 0 ? (ratioElevesEnseignants > 30 ? "Élevé" : "Normal") : ""}
            />
          </div>
        </div>

        {/* Equipment Status */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Équipements
              </span>
              <div className="text-sm">
                <span className="font-medium text-slate-900">{equipmentCount}/3</span>
                <span className="text-slate-500 ml-1">disponibles</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {equipments.map((equipment) => {
                const IconComponent = equipment.icon;
                return (
                  <div
                    key={equipment.key}
                    className="flex items-center gap-1.5 min-w-0"
                    title={equipment.label}
                  >
                    <IconComponent
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        equipment.status ? "text-emerald-600" : "text-slate-400"
                      )}
                    />
                    <span className="text-xs text-slate-600 truncate">
                      {equipment.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
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
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
              onClick={() => onViewDetails?.(etablissement.id)}
            >
              Voir les détails
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* Metric Component */
function Metric({
  icon: Icon,
  label,
  value,
  subtext,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <div className="text-center">
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <div className="text-2xl font-bold text-slate-900 mb-1">
        {value}
      </div>
      <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">
        {label}
      </div>
      {subtext && (
        <div className={cn(
          "text-xs mt-1",
          subtext === "Élevé" ? "text-red-600" : "text-slate-500"
        )}>
          {subtext}
        </div>
      )}
    </div>
  );
}