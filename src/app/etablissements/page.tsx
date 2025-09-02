"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Imports des composants locaux
import PageHeader from "./_components/PageHeader";
import ViewControls from "./_components/ViewControls";
import LoadingState from "./_components/LoadingState";
import ErrorState from "./_components/ErrorState";
import EmptyState from "./_components/EmptyState";
import EtablissementGrid from "./_components/EtablissementGrid";
import GoogleMapComponent from "./_components/GoogleMapComponent";
import ModernSearchBar from "./_components/ModernSearchBar";

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
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ViewMode = "grid" | "map";

export default function EtablissementsPage() {
  // États
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [mapData, setMapData] = useState<MapEtablissement[]>([]);
  const [mapPagination, setMapPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 100,
    total: 0,
  });
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

  // Chargement des données de carte avec filtres
  const loadMapData = useCallback(
    async (searchFilters: SearchFilters, mapPage: number = 1) => {
      try {
        const result = await getMapData(searchFilters, mapPage, 100);
        setMapData(result.data);
        setMapPagination(result.pagination);
      } catch (err) {
        console.error("Erreur lors du chargement des données de carte:", err);
      }
    },
    []
  );

  // Effet pour charger les données de carte quand les filtres changent
  useEffect(() => {
    if (viewMode === "map") {
      loadMapData(filters, 1);
    }
  }, [viewMode, filters, loadMapData]);

  // Fonction pour charger les établissements
  const loadEtablissements = useCallback(
    async (searchFilters: SearchFilters) => {
      setIsLoading(true);
      setError(null);

      try {
        let response: EtablissementResponse;

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
      page: 1,
      per_page: filters.per_page,
    };
    setFilters(updatedFilters);
  };

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Gestion du changement de page pour la carte
  const handleMapPageChange = (page: number) => {
    loadMapData(filters, page);
  };

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setFilters({ page: 1, per_page: 20 });
  };

  // Gestion de la vue détails
  const handleViewDetails = (id: number) => {
    window.open(`/etablissements/${id}`, "_blank");
  };

  // Gestion de la vue sur carte
  const handleViewOnMap = (_lat: number, _lng: number) => {
    console.log("lat", _lat);
    console.log("_lng", _lng);
    setViewMode("map");
  };

  // Vérification si des filtres sont actifs
  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" &&
      key !== "per_page" &&
      filters[key as keyof SearchFilters]
  );

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-50">
        {/* Header moderne avec gradient */}
        <PageHeader totalEstablishments={pagination.total} />

        {/* Barre de recherche moderne */}
        <ModernSearchBar
          filterOptions={filterOptions}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
          isLoading={isLoading}
          className="sticky top-0 z-40"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Contrôles de vue et résultats */}
          <ViewControls
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            filters={filters}
            totalResults={pagination.total}
          />

          {/* Vue Carte */}
          {viewMode === "map" ? (
            <Card className="h-[calc(100vh-200px)] shadow-xl border-0">
              <CardContent className="p-0 h-full">
                <GoogleMapComponent
                  etablissements={mapData}
                  filters={filters}
                  pagination={mapPagination}
                  onEtablissementSelect={(etab) => handleViewDetails(etab.id)}
                  onPageChange={handleMapPageChange}
                />
              </CardContent>
            </Card>
          ) : (
            /* Vue Grille */
            <div>
              {/* État de chargement */}
              {isLoading && <LoadingState />}

              {/* État d'erreur */}
              {error && (
                <ErrorState
                  error={error}
                  onRetry={() => loadEtablissements(filters)}
                />
              )}

              {/* Grille des établissements */}
              {!isLoading && !error && etablissements.length > 0 && (
                <EtablissementGrid
                  etablissements={etablissements}
                  pagination={pagination}
                  onViewDetails={handleViewDetails}
                  onViewOnMap={handleViewOnMap}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              )}

              {/* État vide */}
              {!isLoading && !error && etablissements.length === 0 && (
                <EmptyState onReset={handleResetFilters} />
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
