"use client";

import { Grid, Map, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "../_model/etablissement";

type ViewMode = "grid" | "map";

interface ViewControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  filters: SearchFilters;
  totalResults: number;
}

export default function ViewControls({
  viewMode,
  onViewModeChange,
  hasActiveFilters,
  onResetFilters,
  filters,
  totalResults,
}: ViewControlsProps) {
  const activeFiltersCount = Object.keys(filters).filter(
    (key) =>
      key !== "page" &&
      key !== "per_page" &&
      filters[key as keyof SearchFilters]
  ).length;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {hasActiveFilters
            ? "Résultats de recherche"
            : "Tous les établissements"}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            <strong>{totalResults.toLocaleString()}</strong> établissement(s)
            trouvé(s)
          </span>
          {hasActiveFilters && (
            <>
              <span>•</span>
              <Badge variant="secondary" className="text-xs">
                Filtres actifs: {activeFiltersCount}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Sélecteur de vue moderne */}
      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <Button variant="outline" onClick={onResetFilters} className="mr-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`${
              viewMode === "grid"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Grid className="w-4 h-4 mr-2" />
            Grille
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("map")}
            className={`${
              viewMode === "map"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Map className="w-4 h-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>
    </div>
  );
}
