"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  X,
  MapPin,
  Building,
  GraduationCap,
  Zap,
  Droplets,
  Home,
  RefreshCw,
} from "lucide-react";
import { FilterOptions, SearchFilters } from "../_model/etablissement";

interface FilterPanelProps {
  filterOptions: FilterOptions;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export default function FilterPanel({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
  isLoading = false,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.nom_etablissement || "");

  useEffect(() => {
    setSearchTerm(filters.nom_etablissement || "");
  }, [filters.nom_etablissement]);

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string | boolean | undefined
  ) => {
    const newFilters = { ...filters };

    if (value === "" || value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    onFiltersChange(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("nom_etablissement", searchTerm.trim() || undefined);
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(
      (key) =>
        filters[key as keyof SearchFilters] !== undefined &&
        filters[key as keyof SearchFilters] !== ""
    ).length;
  };

  const clearFilter = (key: keyof SearchFilters) => {
    handleFilterChange(key, undefined);
    if (key === "nom_etablissement") {
      setSearchTerm("");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={isLoading || getActiveFiltersCount() === 0}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Réinitialiser
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Réduire" : "Étendre"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Barre de recherche */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un établissement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Rechercher
          </Button>
        </form>

        {/* Filtres actifs */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;

              const label =
                key === "nom_etablissement"
                  ? `"${value}"`
                  : key === "region"
                  ? `Région: ${value}`
                  : key === "prefecture"
                  ? `Préfecture: ${value}`
                  : key === "libelle_type_statut_etab"
                  ? `Statut: ${value}`
                  : key === "libelle_type_milieu"
                  ? `Milieu: ${value}`
                  : key === "libelle_type_systeme"
                  ? `Système: ${value}`
                  : key === "existe_elect"
                  ? "Électricité"
                  : key === "existe_latrine"
                  ? "Latrines"
                  : key === "eau"
                  ? "Eau potable"
                  : `${key}: ${value}`;

              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {label}
                  <button
                    onClick={() => clearFilter(key as keyof SearchFilters)}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}

        {/* Filtres détaillés */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
            {/* Localisation */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Localisation
              </h4>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Région
                </label>
                <select
                  value={filters.region || ""}
                  onChange={(e) =>
                    handleFilterChange("region", e.target.value || undefined)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les régions</option>
                  {filterOptions.regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Préfecture
                </label>
                <select
                  value={filters.prefecture || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "prefecture",
                      e.target.value || undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les préfectures</option>
                  {filterOptions.prefectures.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type d'établissement */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                Type d&apos;établissement
              </h4>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Statut
                </label>
                <select
                  value={filters.libelle_type_statut_etab || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "libelle_type_statut_etab",
                      e.target.value || undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les statuts</option>
                  {filterOptions.types_statut.map((statut) => (
                    <option key={statut} value={statut}>
                      {statut}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Milieu
                </label>
                <select
                  value={filters.libelle_type_milieu || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "libelle_type_milieu",
                      e.target.value || undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les milieux</option>
                  {filterOptions.types_milieu.map((milieu) => (
                    <option key={milieu} value={milieu}>
                      {milieu}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Système
                </label>
                <select
                  value={filters.libelle_type_systeme || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "libelle_type_systeme",
                      e.target.value || undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les systèmes</option>
                  {filterOptions.types_systeme.map((systeme) => (
                    <option key={systeme} value={systeme}>
                      {systeme}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4" />
                Infrastructure
              </h4>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.existe_elect === true}
                    onChange={(e) =>
                      handleFilterChange(
                        "existe_elect",
                        e.target.checked ? true : undefined
                      )
                    }
                    className="rounded border-gray-300"
                  />
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Électricité
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.eau === true}
                    onChange={(e) =>
                      handleFilterChange(
                        "eau",
                        e.target.checked ? true : undefined
                      )
                    }
                    className="rounded border-gray-300"
                  />
                  <Droplets className="w-4 h-4 text-blue-500" />
                  Eau potable
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.existe_latrine === true}
                    onChange={(e) =>
                      handleFilterChange(
                        "existe_latrine",
                        e.target.checked ? true : undefined
                      )
                    }
                    className="rounded border-gray-300"
                  />
                  <Home className="w-4 h-4 text-green-500" />
                  Latrines
                </label>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
