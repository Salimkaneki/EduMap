"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapEtablissement, SearchFilters } from "../_model/etablissement";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Loader2 } from "lucide-react";

// Import dynamique du composant carte pour éviter les erreurs SSR
const LeafletMap = dynamic(() => import("./LeafletMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2">Chargement de la carte...</span>
    </div>
  ),
});

interface MapComponentProps {
  etablissements: MapEtablissement[];
  filters: SearchFilters;
  onEtablissementSelect?: (etablissement: MapEtablissement) => void;
}

export default function EtablissementMap({
  etablissements,
  filters,
  onEtablissementSelect,
}: MapComponentProps) {
  const [selectedEtab, setSelectedEtab] = useState<MapEtablissement | null>(
    null
  );

  // Filtrer les établissements selon les filtres actifs
  const filteredEtablissements = etablissements.filter((etab) => {
    if (filters.region && etab.region !== filters.region) return false;
    if (filters.prefecture && etab.prefecture !== filters.prefecture)
      return false;
    if (
      filters.libelle_type_statut_etab &&
      etab.statut !== filters.libelle_type_statut_etab
    )
      return false;
    if (
      filters.libelle_type_systeme &&
      etab.systeme !== filters.libelle_type_systeme
    )
      return false;
    if (
      filters.nom_etablissement &&
      !etab.nom_etablissement
        .toLowerCase()
        .includes(filters.nom_etablissement.toLowerCase())
    )
      return false;
    return true;
  });

  const handleMarkerClick = (etablissement: MapEtablissement) => {
    setSelectedEtab(etablissement);
    onEtablissementSelect?.(etablissement);
  };

  return (
    <div className="relative h-full w-full">
      <LeafletMap
        etablissements={filteredEtablissements}
        onMarkerClick={handleMarkerClick}
      />

      {/* Légende */}
      <Card className="absolute top-4 right-4 z-[1000] max-w-xs">
        <CardContent className="p-3">
          <h4 className="font-semibold text-sm mb-2">Légende</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: "#10b981" }}
              />
              <span>Public</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: "#3b82f6" }}
              />
              <span>Privé Laïc</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: "#8b5cf6" }}
              />
              <span>Privé Catholique</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: "#f59e0b" }}
              />
              <span>Privé Protestant</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t text-xs text-gray-600">
            <strong>{filteredEtablissements.length}</strong> établissement(s)
            affiché(s)
          </div>
        </CardContent>
      </Card>

      {/* Détails de l'établissement sélectionné */}
      {selectedEtab && (
        <Card className="absolute bottom-4 left-4 right-4 z-[1000]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">
                {selectedEtab.nom_etablissement}
              </h3>
              <button
                onClick={() => setSelectedEtab(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedEtab.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>{selectedEtab.prefecture}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline">{selectedEtab.statut}</Badge>
                <Badge variant="secondary">{selectedEtab.systeme}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
