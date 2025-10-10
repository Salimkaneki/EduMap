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
  Filter,
} from "lucide-react";
import { FilterOptions, SearchFilters } from "../_model/etablissement";
import { cn } from "@/lib/utils";

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
  const [localFilters, setLocalFilters] = useState<SearchFilters>({
    ...filters,
  });
  const [searchTerm, setSearchTerm] = useState(filters.nom_etablissement || "");
  const [showFilters, setShowFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setLocalFilters({ ...filters });
    setSearchTerm(filters.nom_etablissement || "");
  }, [filters]);

  const handleLocalFilterChange = (
    key: keyof SearchFilters,
    value: string | boolean | undefined
  ) => {
    const newFilters = { ...localFilters };

    if (value === "" || value === undefined) {
      delete newFilters[key];
    } else {
      (newFilters as Record<string, unknown>)[key] = value;
    }

    setLocalFilters(newFilters);
    if (key === "nom_etablissement") {
      setSearchTerm((value as string) || "");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchFilters = {
      ...localFilters,
      nom_etablissement: searchTerm.trim() || undefined,
      page: 1,
      per_page: filters.per_page,
    };
    onFiltersChange(searchFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.keys(localFilters).filter(
      (key) =>
        localFilters[key as keyof SearchFilters] !== undefined &&
        localFilters[key as keyof SearchFilters] !== "" &&
        key !== "page" &&
        key !== "per_page"
    ).length;
  };

  const clearFilter = (key: keyof SearchFilters) => {
    handleLocalFilterChange(key, undefined);
    if (key === "nom_etablissement") {
      setSearchTerm("");
    }
  };

  const FilterDropdown = ({
    label,
    options,
    filterKey,
    placeholder,
    icon: Icon,
  }: {
    label: string;
    options: string[];
    filterKey: keyof SearchFilters;
    placeholder: string;
    icon?: React.ComponentType<{ className?: string }>;
  }) => {
    const isOpen = activeDropdown === filterKey;
    const currentValue = localFilters[filterKey] as string;
    const hasValue = !!currentValue;

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveDropdown(isOpen ? null : filterKey)}
          className={cn(
            "h-9 justify-start gap-2 font-normal border",
            hasValue
              ? "border-slate-300 bg-slate-50 text-slate-900"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          )}
        >
          {Icon && <Icon className="w-4 h-4 text-slate-400" />}
          <span className="flex-1 text-left truncate">
            {currentValue || label}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-slate-400 transition-transform",
              isOpen ? "rotate-180" : ""
            )}
          />
        </Button>

        {isOpen && (
          <>
            <div className="absolute top-full left-0 mt-1 w-full min-w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-1">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                  onClick={() => {
                    handleLocalFilterChange(filterKey, undefined);
                    setActiveDropdown(null);
                  }}
                >
                  {placeholder}
                </button>
                {options.map((option) => (
                  <button
                    key={option}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                      currentValue === option
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                    onClick={() => {
                      handleLocalFilterChange(filterKey, option);
                      setActiveDropdown(null);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveDropdown(null)}
            />
          </>
        )}
      </div>
    );
  };

  const CheckboxFilter = ({
    label,
    filterKey,
    icon: Icon,
  }: {
    label: string;
    filterKey: keyof SearchFilters;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isChecked = localFilters[filterKey] === true;

    return (
      <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) =>
            handleLocalFilterChange(
              filterKey,
              e.target.checked ? true : undefined
            )
          }
          className="rounded border-slate-300 text-slate-900 focus:ring-slate-500 focus:ring-offset-0"
        />
        <Icon className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </label>
    );
  };

  return (
    <div className={cn("bg-white border-b border-slate-200", className)}>
      {/* Barre principale */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          {/* Champ de recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un établissement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white"
            />
          </div>

          {/* Bouton filtres */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "h-10 px-4 gap-2 border-slate-200",
              showFilters || getActiveFiltersCount() > 0
                ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                : "bg-white text-slate-700 hover:bg-slate-50"
            )}
          >
            <Filter className="w-4 h-4" />
            Filtres
            {getActiveFiltersCount() > 0 && (
              <Badge
                variant="secondary"
                className={cn(
                  "ml-1 h-5 px-1.5 text-xs",
                  showFilters || getActiveFiltersCount() > 0
                    ? "bg-white text-slate-900"
                    : "bg-slate-100 text-slate-700"
                )}
              >
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          {/* Bouton rechercher */}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isLoading ? "..." : "Rechercher"}
          </Button>
        </form>

        {/* Filtres actifs */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-slate-600 font-medium">Actifs:</span>
            {Object.entries(localFilters).map(([key, value]) => {
              if (!value || key === "page" || key === "per_page") return null;

              const getFilterLabel = () => {
                switch (key) {
                  case "nom_etablissement":
                    return `"${value}"`;
                  case "region":
                    return `${value}`;
                  case "prefecture":
                    return `${value}`;
                  case "libelle_type_statut_etab":
                    return value;
                  case "libelle_type_milieu":
                    return value;
                  case "libelle_type_systeme":
                    return value;
                  case "existe_elect":
                    return "Électricité";
                  case "existe_latrine":
                    return "Sanitaires";
                  case "eau":
                    return "Eau courante";
                  default:
                    return `${value}`;
                }
              };

              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1 h-6 px-2 bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {getFilterLabel()}
                  <button
                    onClick={() => clearFilter(key as keyof SearchFilters)}
                    className="hover:bg-slate-300 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
            {getActiveFiltersCount() > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLocalFilters({ page: 1, per_page: filters.per_page });
                  setSearchTerm("");
                  onReset();
                }}
                className="h-6 px-2 text-xs text-slate-500 hover:text-slate-700"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Effacer tout
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Panneau de filtres */}
      {showFilters && (
        <div className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Localisation */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Localisation
                </h4>
                <div className="space-y-2">
                  <FilterDropdown
                    label="Région"
                    options={filterOptions.regions}
                    filterKey="region"
                    placeholder="Toutes les régions"
                    icon={MapPin}
                  />
                  <FilterDropdown
                    label="Préfecture"
                    options={filterOptions.prefectures}
                    filterKey="prefecture"
                    placeholder="Toutes les préfectures"
                    icon={MapPin}
                  />
                </div>
              </div>

              {/* Type */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Type d'établissement
                </h4>
                <div className="space-y-2">
                  <FilterDropdown
                    label="Statut"
                    options={filterOptions.types_statut}
                    filterKey="libelle_type_statut_etab"
                    placeholder="Tous les statuts"
                    icon={Building}
                  />
                  <FilterDropdown
                    label="Niveau"
                    options={filterOptions.types_systeme}
                    filterKey="libelle_type_systeme"
                    placeholder="Tous les niveaux"
                    icon={GraduationCap}
                  />
                </div>
              </div>

              {/* Milieu */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Environnement
                </h4>
                <FilterDropdown
                  label="Milieu"
                  options={filterOptions.types_milieu}
                  filterKey="libelle_type_milieu"
                  placeholder="Urbain ou rural"
                  icon={MapPin}
                />
              </div>

              {/* Infrastructure */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Équipements
                </h4>
                <div className="space-y-2">
                  <CheckboxFilter
                    label="Électricité"
                    filterKey="existe_elect"
                    icon={Zap}
                  />
                  <CheckboxFilter
                    label="Eau courante"
                    filterKey="eau"
                    icon={Droplets}
                  />
                  <CheckboxFilter
                    label="Sanitaires"
                    filterKey="existe_latrine"
                    icon={Home}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
