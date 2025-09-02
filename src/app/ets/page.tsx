"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Grid,
  Map,
  List,
  Loader2,
  AlertCircle,
  RefreshCw,
  MapPin,
} from "lucide-react";

// Imports des composants locaux
import EtablissementCard from "./_components/EtablissementCard";
import EtablissementMap from "./_components/EtablissementMap";
import FilterPanel from "./_components/FilterPanel";
import Pagination from "./_components/Pagination";
import StatsDisplay from "./_components/StatsDisplay";

// Imports des types et services
import {
  Etablissement,
  EtablissementResponse,
  FilterOptions,
  SearchFilters,
  MapEtablissement,
} from "./_model/etablissement";
import {
  getEtablissements,
  searchEtablissements,
  getFilterOptions,
  getMapData,
} from "./_services/etablissementService";

type ViewMode = "grid" | "map" | "list";

export default function EtablissementsPage() {
  // États
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [mapData, setMapData] = useState<MapEtablissement[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    regions: [],
    prefectures: [],
    types_milieu: [],
    types_statut: [],
    types_systeme: [],
  });
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    per_page: 20,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des options de filtrage
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error(
          "Erreur lors du chargement des options de filtrage:",
          err
        );
        setError("Impossible de charger les options de filtrage");
      }
    };

    loadFilterOptions();
  }, []);

  // Chargement des données de carte (une seule fois)
  useEffect(() => {
    const loadMapData = async () => {
      try {
        const data = await getMapData();
        setMapData(data);
      } catch (err) {
        console.error("Erreur lors du chargement des données de carte:", err);
      }
    };

    if (viewMode === "map") {
      loadMapData();
    }
  }, [viewMode]);

  // Fonction pour charger les établissements
  const loadEtablissements = useCallback(
    async (searchFilters: SearchFilters) => {
      setIsLoading(true);
      setError(null);

      try {
        let response: EtablissementResponse;

        // Détermine s'il faut utiliser la recherche ou la liste normale
        const hasSearchFilters = Object.keys(searchFilters).some(
          (key) =>
            key !== "page" &&
            key !== "per_page" &&
            searchFilters[key as keyof SearchFilters]
        );

        if (hasSearchFilters) {
          response = await searchEtablissements(searchFilters);
        } else {
          response = await getEtablissements(
            searchFilters.page || 1,
            searchFilters.per_page || 20
          );
        }

        setEtablissements(response.data);
        setPagination({
          current_page: response.current_page,
          last_page: response.last_page,
          per_page: response.per_page,
          total: response.total,
        });
      } catch (err) {
        console.error("Erreur lors du chargement des établissements:", err);
        setError("Impossible de charger les établissements");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Chargement initial des établissements
  useEffect(() => {
    loadEtablissements(filters);
  }, [filters, loadEtablissements]);

  // Gestion des changements de filtres
  const handleFiltersChange = (newFilters: SearchFilters) => {
    const updatedFilters = {
      ...newFilters,
      page: 1, // Reset à la première page
      per_page: filters.per_page,
    };
    setFilters(updatedFilters);
  };

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setFilters({ page: 1, per_page: 20 });
  };

  // Gestion de la vue détails
  const handleViewDetails = (id: number) => {
    // Navigation vers la page de détails
    window.location.href = `/etablissement/${id}`;
  };

  // Gestion de la vue sur carte
  const handleViewOnMap = (_lat: number, _lng: number) => {
    setViewMode("map");
    // Logique pour centrer la carte sur les coordonnées
  };

  // Vérification si des filtres sont actifs
  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" &&
      key !== "per_page" &&
      filters[key as keyof SearchFilters]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Établissements Scolaires du Togo
              </h1>
              <p className="text-gray-600 mt-2">
                Découvrez et explorez les {pagination.total.toLocaleString()}{" "}
                établissements scolaires du Togo
              </p>
            </div>

            {/* Sélecteur de vue */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                Grille
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                Liste
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                Carte
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistiques */}
        <StatsDisplay
          totalEtablissements={15116} // Valeur fixe du total général
          totalResults={pagination.total}
          isFiltered={hasActiveFilters}
        />

        {/* Vue Carte */}
        {viewMode === "map" ? (
          <Card className="h-[calc(100vh-300px)]">
            <CardContent className="p-0 h-full">
              <div className="grid grid-cols-12 h-full">
                {/* Panneau de filtres */}
                <div className="col-span-12 lg:col-span-4 p-4 border-r">
                  <FilterPanel
                    filterOptions={filterOptions}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleResetFilters}
                    isLoading={isLoading}
                  />
                </div>

                {/* Carte */}
                <div className="col-span-12 lg:col-span-8 h-full">
                  <EtablissementMap
                    etablissements={mapData}
                    filters={filters}
                    onEtablissementSelect={(etab) => handleViewDetails(etab.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Vue Grille/Liste */
          <div className="grid grid-cols-12 gap-6">
            {/* Panneau de filtres */}
            <div className="col-span-12 lg:col-span-3">
              <FilterPanel
                filterOptions={filterOptions}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
                isLoading={isLoading}
              />
            </div>

            {/* Contenu principal */}
            <div className="col-span-12 lg:col-span-9">
              {/* En-tête des résultats */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {hasActiveFilters
                      ? "Résultats de recherche"
                      : "Tous les établissements"}
                  </h2>
                  <p className="text-gray-600">
                    {pagination.total.toLocaleString()} établissement(s)
                    trouvé(s)
                  </p>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Tout afficher
                  </Button>
                )}
              </div>

              {/* État de chargement */}
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Chargement...</span>
                </div>
              )}

              {/* État d'erreur */}
              {error && (
                <Card className="p-6">
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">Erreur</h3>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => loadEtablissements(filters)}
                    className="mt-4"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Réessayer
                  </Button>
                </Card>
              )}

              {/* Grille des établissements */}
              {!isLoading && !error && etablissements.length > 0 && (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {etablissements.map((etablissement) => (
                      <EtablissementCard
                        key={etablissement.id}
                        etablissement={etablissement}
                        onViewDetails={handleViewDetails}
                        onViewOnMap={handleViewOnMap}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </>
              )}

              {/* État vide */}
              {!isLoading && !error && etablissements.length === 0 && (
                <Card className="p-12 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun établissement trouvé
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Essayez de modifier vos critères de recherche ou
                    réinitialisez les filtres.
                  </p>
                  <Button onClick={handleResetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
