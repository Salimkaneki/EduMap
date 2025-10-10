"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Filter,
  MapPin,
  Users,
  Building,
  Zap,
  Droplets,
  Home,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit3,
  Trash2,
  Download,
  Plus,
  School,
  ArrowUpDown,
} from "lucide-react";
import {
  Etablissement,
  EtablissementResponse,
  SearchFilters,
} from "../../../etablissements/_model/etablissement";
import { useRouter } from "next/navigation";
import { deleteSchool } from "./_services/schoolService";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

export default function SchoolsListPage() {
  const router = useRouter();
  const [schoolsData, setSchoolsData] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [regionFilter, setRegionFilter] = useState("Toutes");
  const [prefectureFilter, setPrefectureFilter] = useState("Toutes");
  const [milieuFilter, setMilieuFilter] = useState("Tous");
  const [systemeFilter, setSystemeFilter] = useState("Tous");
  const [sortField, setSortField] =
    useState<keyof Etablissement>("nom_etablissement");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [filterOptions, setFilterOptions] = useState<{
    regions: string[];
    prefectures: string[];
    types_milieu: string[];
    types_statut: string[];
    types_systeme: string[];
  } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Récupérer les options de filtres au chargement
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/etablissements/filter-options`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setFilterOptions(data);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des options de filtres:",
        err
      );
    }
  };

  const fetchSchools = useCallback(
    async (customSearchTerm?: string, customPage?: number) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      try {
        setLoading(true);
        setError(null);
        let response: Response;
        let url: string;
        const pageToUse = customPage ?? currentPage;
        const searchToUse = customSearchTerm ?? searchTerm;
        // Si on a des filtres actifs ou une recherche, utiliser la recherche
        if (
          (searchToUse && searchToUse.trim() !== "") ||
          statusFilter !== "Tous" ||
          regionFilter !== "Toutes" ||
          prefectureFilter !== "Toutes" ||
          milieuFilter !== "Tous" ||
          systemeFilter !== "Tous"
        ) {
          const params = new URLSearchParams();
          params.append("page", pageToUse.toString());
          params.append("per_page", itemsPerPage.toString());
          if (searchToUse && searchToUse.trim() !== "") {
            params.append("nom_etablissement", searchToUse);
          }
          if (statusFilter !== "Tous") {
            params.append("libelle_type_statut_etab", statusFilter);
          }
          if (regionFilter !== "Toutes") {
            params.append("region", regionFilter);
          }
          if (prefectureFilter !== "Toutes") {
            params.append("prefecture", prefectureFilter);
          }
          if (milieuFilter !== "Tous") {
            params.append("milieu", milieuFilter);
          }
          if (systemeFilter !== "Tous") {
            params.append("systeme", systemeFilter);
          }
          url = `${API_BASE_URL}/etablissements/search?${params.toString()}`;
        } else {
          url = `${API_BASE_URL}/etablissements?page=${pageToUse}&per_page=${itemsPerPage}`;
        }
        response = await fetch(url, {
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }
        const data: EtablissementResponse = await response.json();
        setSchoolsData(data.data);
        setTotalPages(data.last_page);
        setTotalItems(data.total);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des établissements"
        );
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [
      searchTerm,
      statusFilter,
      regionFilter,
      prefectureFilter,
      milieuFilter,
      systemeFilter,
      currentPage,
      itemsPerPage,
    ]
  );

  // Initial load only (pas de recherche automatique)
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchSchools("");
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setSearchTerm(pendingSearch);
    setCurrentPage(1);
    fetchSchools(pendingSearch, 1);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "status") setStatusFilter(value);
    else if (filterType === "region") setRegionFilter(value);
    else if (filterType === "prefecture") setPrefectureFilter(value);
    else if (filterType === "milieu") setMilieuFilter(value);
    else if (filterType === "systeme") setSystemeFilter(value);
    // Ne pas lancer la recherche automatiquement
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchSchools(searchTerm, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSchools(searchTerm, page);
  };

  const handleSort = (field: keyof Etablissement) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (schoolId: number, schoolName: string) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer l'établissement "${schoolName}" ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    try {
      await deleteSchool(schoolId);
      // Recharger les données après suppression
      await fetchSchools();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(
        `Erreur lors de la suppression: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  };

  const SortIcon = ({ field }: { field: keyof Etablissement }) => {
    if (sortField !== field)
      return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1" />
    ) : (
      <ChevronDown size={14} className="ml-1" />
    );
  };

  // Trier les données localement
  const sortedSchools = [...schoolsData].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Pour les objets imbriqués, accéder aux propriétés
    if (sortField === "statut") {
      aValue = a.statut?.libelle_type_statut_etab || "";
      bValue = b.statut?.libelle_type_statut_etab || "";
    } else if (sortField === "localisation") {
      aValue = a.localisation?.region || "";
      bValue = b.localisation?.region || "";
    } else if (sortField === "milieu") {
      aValue = a.milieu?.libelle_type_milieu || "";
      bValue = b.milieu?.libelle_type_milieu || "";
    } else if (sortField === "systeme") {
      aValue = a.systeme?.libelle_type_systeme || "";
      bValue = b.systeme?.libelle_type_systeme || "";
    }

    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginatedSchools = sortedSchools;

  // Show initial loading screen
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des établissements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              Établissements Scolaires
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {totalItems} établissements trouvés
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition text-sm">
              <Download size={16} />
              Exporter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm">
              <Plus size={16} />
              Nouveau
            </button>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un établissement..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition"
                value={pendingSearch}
                onChange={(e) => setPendingSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Recherche...</span>
                </>
              ) : (
                "Rechercher"
              )}
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building size={16} className="mr-2 text-gray-500" />
              Statut
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="Tous">Tous les statuts</option>
              {filterOptions?.types_statut.map((statut) => (
                <option key={statut} value={statut}>
                  {statut}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin size={16} className="mr-2 text-gray-500" />
              Région
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              value={regionFilter}
              onChange={(e) => handleFilterChange("region", e.target.value)}
            >
              <option value="Toutes">Toutes les régions</option>
              {filterOptions?.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Prefecture Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin size={16} className="mr-2 text-gray-500" />
              Préfecture
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              value={prefectureFilter}
              onChange={(e) => handleFilterChange("prefecture", e.target.value)}
            >
              <option value="Toutes">Toutes les préfectures</option>
              {filterOptions?.prefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </div>

          {/* Milieu Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Home size={16} className="mr-2 text-gray-500" />
              Milieu
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              value={milieuFilter}
              onChange={(e) => handleFilterChange("milieu", e.target.value)}
            >
              <option value="Tous">Tous les milieux</option>
              {filterOptions?.types_milieu.map((milieu) => (
                <option key={milieu} value={milieu}>
                  {milieu}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* System Filter and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <School size={16} className="mr-2 text-gray-500" />
                Système
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                value={systemeFilter}
                onChange={(e) => handleFilterChange("systeme", e.target.value)}
              >
                <option value="Tous">Tous les systèmes</option>
                {filterOptions?.types_systeme.map((systeme) => (
                  <option key={systeme} value={systeme}>
                    {systeme}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("Tous");
                setRegionFilter("Toutes");
                setPrefectureFilter("Toutes");
                setMilieuFilter("Tous");
                setSystemeFilter("Tous");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700"
            >
              <Filter size={16} />
              Réinitialiser
            </button>
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  <Filter size={16} />
                  Appliquer les filtres
                </>
              )}
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm ||
          statusFilter !== "Tous" ||
          regionFilter !== "Toutes" ||
          prefectureFilter !== "Toutes" ||
          milieuFilter !== "Tous" ||
          systemeFilter !== "Tous") && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filtres actifs:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Recherche: {searchTerm}
                </span>
              )}
              {statusFilter !== "Tous" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Statut: {statusFilter}
                </span>
              )}
              {regionFilter !== "Toutes" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Région: {regionFilter}
                </span>
              )}
              {prefectureFilter !== "Toutes" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Préfecture: {prefectureFilter}
                </span>
              )}
              {milieuFilter !== "Tous" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  Milieu: {milieuFilter}
                </span>
              )}
              {systemeFilter !== "Tous" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Système: {systemeFilter}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Schools Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500 font-medium">
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("nom_etablissement")}
              >
                <div className="flex items-center">
                  Établissement <SortIcon field="nom_etablissement" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("localisation")}
              >
                <div className="flex items-center">
                  Localisation <SortIcon field="localisation" />
                </div>
              </th>
              <th className="py-3 px-4">Effectifs</th>
              <th className="py-3 px-4">Équipements</th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("statut")}
              >
                <div className="flex items-center">
                  Statut <SortIcon field="statut" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedSchools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {school.nom_etablissement}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {school.localisation?.region || "Non spécifié"},{" "}
                      {school.localisation?.prefecture || "Non spécifié"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-600">
                    <div>Région: {school.localisation?.region || "N/A"}</div>
                    <div>
                      Préfecture: {school.localisation?.prefecture || "N/A"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Users size={14} className="mr-1" />
                        {(
                          (school.effectif?.sommedenb_eff_g || 0) +
                          (school.effectif?.sommedenb_eff_f || 0)
                        ).toLocaleString()}{" "}
                        élèves
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(
                          (school.effectif?.sommedenb_ens_h || 0) +
                          (school.effectif?.sommedenb_ens_f || 0)
                        ).toLocaleString()}{" "}
                        enseignants
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <div
                      className={`p-1.5 rounded ${
                        school.equipement?.existe_elect
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      title="Électricité"
                    >
                      <Zap size={14} />
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        school.equipement?.eau
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      title="Eau"
                    >
                      <Droplets size={14} />
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        school.equipement?.existe_latrine
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      title="Sanitaires"
                    >
                      <Home size={14} />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      school.statut?.libelle_type_statut_etab === "Public"
                        ? "bg-blue-100 text-blue-800"
                        : school.statut?.libelle_type_statut_etab?.includes(
                            "Privé"
                          )
                        ? "bg-purple-100 text-purple-800"
                        : school.statut?.libelle_type_statut_etab ===
                          "Communautaire"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {school.statut?.libelle_type_statut_etab || "Non spécifié"}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/school/edit/${school.id}`)
                      }
                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
                      title="Modifier l'établissement"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(school.id, school.nom_etablissement)
                      }
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                      title="Supprimer l'établissement"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedSchools.length === 0 && (
          <div className="text-center py-12">
            <School size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Aucun établissement trouvé</p>
            <p className="text-sm text-gray-400 mt-1">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedSchools.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems}{" "}
            établissements
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </button>
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
