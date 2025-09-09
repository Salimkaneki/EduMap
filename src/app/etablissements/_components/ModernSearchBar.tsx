"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  X,
  MapPin,
  Building,
  GraduationCap,
  Zap,
  Droplets,
  Home,
  RefreshCw,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { FilterOptions, SearchFilters } from "../_model/etablissement";

interface ModernSearchBarProps {
  filterOptions: FilterOptions;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
  isLoading?: boolean;
  className?: string;
}

export default function ModernSearchBar({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
  isLoading = false,
  className = "",
}: ModernSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(filters.nom_etablissement || "");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
      (newFilters as Record<string, unknown>)[key] = value;
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
        filters[key as keyof SearchFilters] !== "" &&
        key !== "page" &&
        key !== "per_page"
    ).length;
  };

  const clearFilter = (key: keyof SearchFilters) => {
    handleFilterChange(key, undefined);
    if (key === "nom_etablissement") {
      setSearchTerm("");
    }
  };

  const QuickFilterButton = ({
    label,
    value,
    filterKey,
    icon: Icon,
  }: {
    label: string;
    value: string;
    filterKey: keyof SearchFilters;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isActive = filters[filterKey] === value;

    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={() =>
          handleFilterChange(filterKey, isActive ? undefined : value)
        }
        className={`flex items-center gap-2 ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
        {isActive && (
          <X
            className="w-3 h-3 ml-1"
            onClick={(e) => {
              e.stopPropagation();
              clearFilter(filterKey);
            }}
          />
        )}
      </Button>
    );
  };

  const DropdownFilter = ({
    label,
    options,
    filterKey,
    placeholder,
  }: {
    label: string;
    options: string[];
    filterKey: keyof SearchFilters;
    placeholder: string;
  }) => {
    const isOpen = activeDropdown === filterKey;
    const currentValue = filters[filterKey] as string;

    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveDropdown(isOpen ? null : filterKey)}
          className={`flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 ${
            currentValue ? "border-blue-500 text-blue-700" : ""
          }`}
        >
          {currentValue || label}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            <div className="p-2">
              <button
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => {
                  handleFilterChange(filterKey, undefined);
                  setActiveDropdown(null);
                }}
              >
                {placeholder}
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    currentValue === option
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    handleFilterChange(filterKey, option);
                    setActiveDropdown(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white shadow-sm border-b ${className}`}>
      {/* Barre de recherche principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-4 items-center">
          {/* Champ de recherche principal */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom d'établissement, région, préfecture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Bouton de recherche */}
          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
          >
            Rechercher
          </Button>

          {/* Bouton filtres avancés */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
              showAdvancedFilters
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : ""
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </form>

        {/* Filtres rapides */}
        <div className="mt-4 flex flex-wrap gap-3">
          <QuickFilterButton
            label="Public"
            value="Public"
            filterKey="libelle_type_statut_etab"
            icon={Building}
          />
          <QuickFilterButton
            label="Privé"
            value="Privé Laïc"
            filterKey="libelle_type_statut_etab"
            icon={Building}
          />
          <QuickFilterButton
            label="Urbain"
            value="Urbain"
            filterKey="libelle_type_milieu"
            icon={MapPin}
          />
          <QuickFilterButton
            label="Rural"
            value="Rural"
            filterKey="libelle_type_milieu"
            icon={MapPin}
          />
          <QuickFilterButton
            label="Primaire"
            value="PRIMAIRE"
            filterKey="libelle_type_systeme"
            icon={GraduationCap}
          />
          <QuickFilterButton
            label="Secondaire"
            value="SECONDAIRE I"
            filterKey="libelle_type_systeme"
            icon={GraduationCap}
          />
        </div>

        {/* Filtres actifs */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">
              Filtres actifs:
            </span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value || key === "page" || key === "per_page") return null;

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
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {label}
                  <button
                    onClick={() => clearFilter(key as keyof SearchFilters)}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Tout effacer
            </Button>
          </div>
        )}
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Localisation */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-900">
                  Localisation
                </h4>
                <div className="space-y-2">
                  <DropdownFilter
                    label="Région"
                    options={filterOptions.regions}
                    filterKey="region"
                    placeholder="Toutes les régions"
                  />
                  <DropdownFilter
                    label="Préfecture"
                    options={filterOptions.prefectures}
                    filterKey="prefecture"
                    placeholder="Toutes les préfectures"
                  />
                </div>
              </div>

              {/* Type d'établissement */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-900">Type</h4>
                <div className="space-y-2">
                  <DropdownFilter
                    label="Statut"
                    options={filterOptions.types_statut}
                    filterKey="libelle_type_statut_etab"
                    placeholder="Tous les statuts"
                  />
                  <DropdownFilter
                    label="Système"
                    options={filterOptions.types_systeme}
                    filterKey="libelle_type_systeme"
                    placeholder="Tous les systèmes"
                  />
                </div>
              </div>

              {/* Milieu */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-900">Milieu</h4>
                <DropdownFilter
                  label="Type de milieu"
                  options={filterOptions.types_milieu}
                  filterKey="libelle_type_milieu"
                  placeholder="Tous les milieux"
                />
              </div>

              {/* Infrastructure */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-900">
                  Infrastructure
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.existe_elect === true}
                      onChange={(e) =>
                        handleFilterChange(
                          "existe_elect",
                          e.target.checked ? true : undefined
                        )
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Électricité
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.eau === true}
                      onChange={(e) =>
                        handleFilterChange(
                          "eau",
                          e.target.checked ? true : undefined
                        )
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Eau potable
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.existe_latrine === true}
                      onChange={(e) =>
                        handleFilterChange(
                          "existe_latrine",
                          e.target.checked ? true : undefined
                        )
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Home className="w-4 h-4 text-green-500" />
                    Latrines
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer les dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
