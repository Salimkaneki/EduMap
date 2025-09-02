"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Grid,
  Map,
  List,
  Loader2,
  AlertCircle,
  RefreshCw,
  MapPin,
  LayoutGrid,
  Filter,
  TrendingUp,
} from "lucide-react";

// Imports des composants locaux
import ModernEtablissementCard from "./_components/ModernEtablissementCard";
import GoogleMapComponent from "./_components/GoogleMapComponent";
import ModernSearchBar from "./_components/ModernSearchBar";
import Pagination from "./_components/Pagination";

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

  // Chargement des données de carte
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

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setFilters({ page: 1, per_page: 20 });
  };

  // Gestion de la vue détails
  const handleViewDetails = (id: number) => {
    window.location.href = `/etablissement/${id}`;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header moderne avec gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Découvrez les Écoles du Togo
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explorez plus de {pagination.total.toLocaleString()}{" "}
              établissements scolaires à travers les 7 régions du Togo avec
              notre plateforme moderne et intuitive.
            </p>

            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-200" />
                </div>
                <p className="text-2xl font-bold">
                  {pagination.total.toLocaleString()}
                </p>
                <p className="text-sm text-blue-200">Établissements</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 text-green-200" />
                </div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-green-200">Régions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <Filter className="w-6 h-6 text-yellow-200" />
                </div>
                <p className="text-2xl font-bold">39</p>
                <p className="text-sm text-yellow-200">Préfectures</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <LayoutGrid className="w-6 h-6 text-purple-200" />
                </div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-purple-200">Types d&pos;établissements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {hasActiveFilters
                ? "Résultats de recherche"
                : "Tous les établissements"}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                <strong>{pagination.total.toLocaleString()}</strong>{" "}
                établissement(s) trouvé(s)
              </span>
              {hasActiveFilters && (
                <>
                  <span>•</span>
                  <Badge variant="secondary" className="text-xs">
                    Filtres actifs:{" "}
                    {
                      Object.keys(filters).filter(
                        (key) =>
                          key !== "page" &&
                          key !== "per_page" &&
                          filters[key as keyof SearchFilters]
                      ).length
                    }
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Sélecteur de vue moderne */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="mr-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
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
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
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

        {/* Vue Carte */}
        {viewMode === "map" ? (
          <Card className="h-[calc(100vh-200px)] shadow-xl border-0">
            <CardContent className="p-0 h-full">
              <GoogleMapComponent
                etablissements={mapData}
                filters={filters}
                onEtablissementSelect={(etab) => handleViewDetails(etab.id)}
              />
            </CardContent>
          </Card>
        ) : (
          /* Vue Grille/Liste */
          <div>
            {/* État de chargement */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    Chargement des établissements...
                  </p>
                </div>
              </div>
            )}

            {/* État d'erreur */}
            {error && (
              <Card className="p-8 text-center border-red-200 bg-red-50">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => loadEtablissements(filters)}
                  className="bg-red-600 hover:bg-red-700"
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
                  className={`grid gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 max-w-4xl mx-auto"
                  }`}
                >
                  {etablissements.map((etablissement) => (
                    <ModernEtablissementCard
                      key={etablissement.id}
                      etablissement={etablissement}
                      onViewDetails={handleViewDetails}
                      onViewOnMap={handleViewOnMap}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12">
                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </div>
              </>
            )}

            {/* État vide */}
            {!isLoading && !error && etablissements.length === 0 && (
              <Card className="p-16 text-center bg-white border-0 shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Aucun établissement trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nous n&apos;avons trouvé aucun établissement correspondant à
                    vos critères de recherche. Essayez de modifier vos filtres
                    ou réinitialisez la recherche.
                  </p>
                  <Button
                    onClick={handleResetFilters}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Voir tous les établissements
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
