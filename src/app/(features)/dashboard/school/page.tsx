'use client'
import React, { useState, useEffect, useRef } from "react";
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
  Download,
  Plus,
  School,
  ArrowUpDown
} from "lucide-react";
import { Etablissement, EtablissementResponse, SearchFilters } from "../../../etablissements/_model/etablissement";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://edumap-api.bestwebapp.tech/api";

export default function SchoolsListPage() {
  const [schoolsData, setSchoolsData] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [regionFilter, setRegionFilter] = useState("Toutes");
  const [prefectureFilter, setPrefectureFilter] = useState("Toutes");
  const [milieuFilter, setMilieuFilter] = useState("Tous");
  const [systemeFilter, setSystemeFilter] = useState("Tous");
  const [sortField, setSortField] = useState<keyof Etablissement>("nom_etablissement");
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

  // Debounce search term - attendre 800ms après la dernière saisie
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800); // 800ms delay pour éviter les requêtes trop fréquentes

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchSchools();
  }, [currentPage, debouncedSearchTerm, statusFilter, regionFilter, prefectureFilter, milieuFilter, systemeFilter]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/etablissements/filter-options`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setFilterOptions(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des options de filtres:", err);
    }
  };

  const fetchSchools = async () => {
    // Annuler la requête précédente si elle existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Créer un nouveau controller pour cette requête
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setLoading(true);
      setError(null);

      let response: Response;
      let url: string;

      // Si on a des filtres actifs, utiliser la recherche
      if (debouncedSearchTerm || statusFilter !== "Tous" || regionFilter !== "Toutes" || prefectureFilter !== "Toutes" || milieuFilter !== "Tous" || systemeFilter !== "Tous") {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("per_page", itemsPerPage.toString());

        if (debouncedSearchTerm) {
          params.append("nom_etablissement", debouncedSearchTerm);
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
        // Sinon, récupérer tous les établissements
        url = `${API_BASE_URL}/etablissements?page=${currentPage}&per_page=${itemsPerPage}`;
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
      if (err instanceof Error && err.name === 'AbortError') {
        // Requête annulée, ignorer
        return;
      }
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des établissements');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof Etablissement) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: keyof Etablissement }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
    return sortDirection === "asc" ? 
      <ChevronUp size={14} className="ml-1" /> : 
      <ChevronDown size={14} className="ml-1" />;
  };

  // Trier les données localement
  const sortedSchools = [...schoolsData].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    // Pour les objets imbriqués, accéder aux propriétés
    if (sortField === 'statut') {
      aValue = a.statut?.libelle_type_statut_etab || '';
      bValue = b.statut?.libelle_type_statut_etab || '';
    } else if (sortField === 'localisation') {
      aValue = a.localisation?.region || '';
      bValue = b.localisation?.region || '';
    } else if (sortField === 'milieu') {
      aValue = a.milieu?.libelle_type_milieu || '';
      bValue = b.milieu?.libelle_type_milieu || '';
    } else if (sortField === 'systeme') {
      aValue = a.systeme?.libelle_type_systeme || '';
      bValue = b.systeme?.libelle_type_systeme || '';
    }
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des établissements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur: {error}</p>
          <button 
            onClick={() => fetchSchools()} 
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Pagination
  const paginatedSchools = sortedSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Établissements Scolaires</h1>
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
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un établissement..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Tous">Tous les statuts</option>
              {filterOptions?.types_statut.map((statut) => (
                <option key={statut} value={statut}>{statut}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="Toutes">Toutes les régions</option>
              {filterOptions?.regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              value={prefectureFilter}
              onChange={(e) => setPrefectureFilter(e.target.value)}
            >
              <option value="Toutes">Toutes les préfectures</option>
              {filterOptions?.prefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>{prefecture}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              value={milieuFilter}
              onChange={(e) => setMilieuFilter(e.target.value)}
            >
              <option value="Tous">Tous les milieux</option>
              {filterOptions?.types_milieu.map((milieu) => (
                <option key={milieu} value={milieu}>{milieu}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              value={systemeFilter}
              onChange={(e) => setSystemeFilter(e.target.value)}
            >
              <option value="Tous">Tous les systèmes</option>
              {filterOptions?.types_systeme.map((systeme) => (
                <option key={systeme} value={systeme}>{systeme}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
              <Filter size={16} />
              Plus de filtres
            </button>
          </div>
        </div>
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
                    <div className="font-medium text-gray-900">{school.nom_etablissement}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {school.localisation?.region || 'Non spécifié'}, {school.localisation?.prefecture || 'Non spécifié'}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-600">
                    <div>Région: {school.localisation?.region || 'N/A'}</div>
                    <div>Préfecture: {school.localisation?.prefecture || 'N/A'}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Users size={14} className="mr-1" />
                        {school.effectif?.tot?.toLocaleString() || 0} élèves
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {school.effectif?.total_ense || 0} enseignants
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <div className={`p-1.5 rounded ${school.equipement?.existe_elect ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`} title="Électricité">
                      <Zap size={14} />
                    </div>
                    <div className={`p-1.5 rounded ${school.equipement?.eau ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`} title="Eau">
                      <Droplets size={14} />
                    </div>
                    <div className={`p-1.5 rounded ${school.equipement?.existe_latrine ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`} title="Sanitaires">
                      <Home size={14} />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    school.statut?.libelle_type_statut_etab === "Public" 
                      ? "bg-blue-100 text-blue-800" 
                      : (school.statut?.libelle_type_statut_etab?.includes("Privé"))
                      ? "bg-purple-100 text-purple-800"
                      : school.statut?.libelle_type_statut_etab === "Communautaire"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {school.statut?.libelle_type_statut_etab || 'Non spécifié'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100 transition">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedSchools.length === 0 && (
          <div className="text-center py-12">
            <School size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Aucun établissement trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedSchools.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} établissements
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Précédent
            </button>
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}