"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Droplets,
  Building2,
  CheckCircle,
  XCircle,
  Car,
  ShieldCheck,
} from "lucide-react";
import { Etablissement } from "../../_model/etablissement";

interface InfrastructureEquipmentProps {
  etablissement: Etablissement;
}

export default function InfrastructureEquipment({
  etablissement,
}: InfrastructureEquipmentProps) {
  const getInfrastructureScore = () => {
    const infrastructure = etablissement.infrastructure;
    if (!infrastructure) return 0;

    const totalSalles =
      infrastructure.sommedenb_salles_classes_dur +
      infrastructure.sommedenb_salles_classes_banco +
      infrastructure.sommedenb_salles_classes_autre;

    if (totalSalles === 0) return 0;
    if (totalSalles >= 10) return 3;
    if (totalSalles >= 5) return 2;
    return 1;
  };

  const getEquipmentScore = () => {
    const equipement = etablissement.equipement;
    if (!equipement) return 0;

    let score = 0;
    if (equipement.existe_elect) score++;
    if (equipement.eau) score++;
    if (equipement.existe_latrine_fonct) score++;
    if (equipement.acces_toute_saison) score++;

    return Math.ceil((score * 3) / 4); // Convertit en score sur 3
  };

  const infrastructureItems = [
    {
      icon: Building2,
      label: "Salles Durables",
      value: etablissement.infrastructure?.sommedenb_salles_classes_dur || 0,
      color: "text-green-600 bg-green-50 border-green-200",
    },
    {
      icon: Building2,
      label: "Salles Banco",
      value: etablissement.infrastructure?.sommedenb_salles_classes_banco || 0,
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    {
      icon: Building2,
      label: "Autres Salles",
      value: etablissement.infrastructure?.sommedenb_salles_classes_autre || 0,
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
  ];

  const equipmentItems = [
    {
      icon: Zap,
      label: "Électricité",
      status: etablissement.equipement?.existe_elect || false,
      color: "text-yellow-600",
    },
    {
      icon: Droplets,
      label: "Eau",
      status: etablissement.equipement?.eau || false,
      color: "text-blue-600",
    },
    {
      icon: ShieldCheck,
      label: "Latrines Fonct.",
      status: etablissement.equipement?.existe_latrine_fonct || false,
      color: "text-purple-600",
    },
    {
      icon: Car,
      label: "Accès Toute Saison",
      status: etablissement.equipement?.acces_toute_saison || false,
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Infrastructure */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
            🏗️ Infrastructure
          </h2>
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 px-4 py-2">
            Score: {getInfrastructureScore()}/3
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infrastructureItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className={`${item.color} border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold">{item.value}</p>
                  </div>
                  <Icon className="h-8 w-8 opacity-60" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Équipements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
            ⚡ Équipements
          </h2>
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 px-4 py-2">
            Score: {getEquipmentScore()}/3
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipmentItems.map((item, index) => {
            const Icon = item.icon;
            const StatusIcon = item.status ? CheckCircle : XCircle;
            return (
              <Card
                key={index}
                className={`p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  item.status
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 ${item.color}`} />
                  <StatusIcon
                    className={`h-5 w-5 ${
                      item.status ? "text-green-600" : "text-red-600"
                    }`}
                  />
                </div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs opacity-75 mt-1">
                  {item.status ? "Disponible" : "Non disponible"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
