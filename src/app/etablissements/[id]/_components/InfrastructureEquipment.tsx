"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  Zap, 
  Droplets, 
  Utensils, 
  BookOpen,
  Building,
  Laptop,
  Lightbulb,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Etablissement } from "../../_model/etablissement";

interface InfrastructureEquipmentProps {
  etablissement: Etablissement;
}

export default function InfrastructureEquipment({ etablissement }: InfrastructureEquipmentProps) {
  const infrastructure = etablissement.infrastructure;
  const equipement = etablissement.equipement;

  if (!infrastructure && !equipement) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Building className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Aucune donnée d'infrastructure</h3>
          <p className="text-sm">Les informations sur l'infrastructure ne sont pas disponibles.</p>
        </div>
      </Card>
    );
  }

  // Services disponibles (basés sur le modèle Equipement)
  const services = [
    {
      name: "Électricité",
      available: equipement?.existe_elect || false,
      icon: Zap,
      color: equipement?.existe_elect ? "text-yellow-600" : "text-gray-400",
      bgColor: equipement?.existe_elect ? "bg-yellow-50" : "bg-gray-50",
      status: equipement?.existe_elect ? "Disponible" : "Non disponible"
    },
    {
      name: "Eau courante",
      available: equipement?.eau || false,
      icon: Droplets,
      color: equipement?.eau ? "text-blue-600" : "text-gray-400",
      bgColor: equipement?.eau ? "bg-blue-50" : "bg-gray-50",
      status: equipement?.eau ? "Disponible" : "Non disponible"
    },
    {
      name: "Latrines",
      available: equipement?.existe_latrine || false,
      icon: Building,
      color: equipement?.existe_latrine ? "text-green-600" : "text-gray-400",
      bgColor: equipement?.existe_latrine ? "bg-green-50" : "bg-gray-50",
      status: equipement?.existe_latrine ? "Disponible" : "Non disponible"
    },
    {
      name: "Latrines fonctionnelles",
      available: equipement?.existe_latrine_fonct || false,
      icon: CheckCircle,
      color: equipement?.existe_latrine_fonct ? "text-emerald-600" : "text-gray-400",
      bgColor: equipement?.existe_latrine_fonct ? "bg-emerald-50" : "bg-gray-50",
      status: equipement?.existe_latrine_fonct ? "Fonctionnelles" : "Non fonctionnelles"
    },
    {
      name: "Accès toute saison",
      available: equipement?.acces_toute_saison || false,
      icon: AlertCircle,
      color: equipement?.acces_toute_saison ? "text-indigo-600" : "text-gray-400",
      bgColor: equipement?.acces_toute_saison ? "bg-indigo-50" : "bg-gray-50",
      status: equipement?.acces_toute_saison ? "Accessible" : "Accès limité"
    }
  ];

  // Salles de classe
  const classrooms = [
    {
      name: "Salles durables",
      count: infrastructure?.sommedenb_salles_classes_dur || 0,
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Construction solide"
    },
    {
      name: "Salles banco",
      count: infrastructure?.sommedenb_salles_classes_banco || 0,
      icon: Building,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Construction traditionnelle"
    },
    {
      name: "Autres salles",
      count: infrastructure?.sommedenb_salles_classes_autre || 0,
      icon: Building,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Autres types"
    }
  ];

  const totalClassrooms = classrooms.reduce((sum, room) => sum + room.count, 0);
  const availableServices = services.filter(s => s.available).length;

  const getStatusIcon = (available: boolean) => {
    if (available) return CheckCircle;
    return XCircle;
  };

  const getStatusColor = (available: boolean) => {
    if (available) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Services essentiels */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
            Services essentiels
          </h3>
          <Badge variant={availableServices >= 3 ? "default" : "secondary"}>
            {availableServices}/5 disponibles
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const StatusIcon = getStatusIcon(service.available);
            
            return (
              <div
                key={index}
                className={`${service.bgColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 ${service.color}`} />
                  <StatusIcon className={`h-5 w-5 ${getStatusColor(service.available)}`} />
                </div>
                
                <h4 className="font-medium text-gray-900 mb-1">{service.name}</h4>
                <p className={`text-sm font-medium ${
                  service.available ? "text-green-600" : "text-red-600"
                }`}>
                  {service.status || "Non spécifié"}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Salles de classe */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Building className="h-5 w-5 text-green-600 mr-2" />
            Salles de classe
          </h3>
          <Badge variant="default">
            {totalClassrooms} au total
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {classrooms.map((room, index) => {
            const Icon = room.icon;
            const percentage = totalClassrooms > 0 ? (room.count / totalClassrooms) * 100 : 0;
            
            return (
              <div
                key={index}
                className={`${room.bgColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${room.color}`} />
                  <span className="text-xs font-medium text-gray-500">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-2xl font-bold text-gray-900">{room.count}</p>
                  <p className="text-sm font-medium text-gray-600">{room.name}</p>
                  <p className="text-xs text-gray-500">{room.description}</p>
                </div>
                
                <div className="bg-white/60 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${room.color.replace('text-', 'bg-').replace('-600', '-400')}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
