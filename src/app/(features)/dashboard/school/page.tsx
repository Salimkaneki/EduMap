'use client'
import React, { useState } from "react";
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

// Définition du type School
interface School {
  id: number;
  name: string;
  address: string;
  students: number;
  teachers: number;
  classrooms: number;
  electricity: boolean;
  water: boolean;
  sanitation: boolean;
  status: string;
  lastUpdate: string;
}

// Données fictives pour la démonstration
const schoolsData: School[] = [
  {
    id: 1,
    name: "Lycée Moderne d'Abidjan",
    address: "Plateau, Abidjan",
    students: 1245,
    teachers: 42,
    classrooms: 28,
    electricity: true,
    water: true,
    sanitation: true,
    status: "Public",
    lastUpdate: "2023-10-15"
  },
  {
    id: 2,
    name: "Collège Saint Michel",
    address: "Yopougon, Abidjan",
    students: 876,
    teachers: 32,
    classrooms: 20,
    electricity: true,
    water: false,
    sanitation: true,
    status: "Privé",
    lastUpdate: "2023-09-22"
  },
  {
    id: 3,
    name: "École Primaire Les Poussins",
    address: "Cocody, Abidjan",
    students: 420,
    teachers: 15,
    classrooms: 12,
    electricity: false,
    water: true,
    sanitation: false,
    status: "Public",
    lastUpdate: "2023-10-05"
  },
  {
    id: 4,
    name: "Groupe Scolaire Excellence",
    address: "Koumassi, Abidjan",
    students: 650,
    teachers: 24,
    classrooms: 18,
    electricity: true,
    water: true,
    sanitation: true,
    status: "Privé",
    lastUpdate: "2023-10-18"
  },
  {
    id: 5,
    name: "École du Village",
    address: "Bingerville",
    students: 210,
    teachers: 8,
    classrooms: 6,
    electricity: false,
    water: false,
    sanitation: true,
    status: "Public",
    lastUpdate: "2023-09-30"
  },
  {
    id: 6,
    name: "Institut Technique",
    address: "Treichville, Abidjan",
    students: 780,
    teachers: 35,
    classrooms: 22,
    electricity: true,
    water: true,
    sanitation: true,
    status: "Public",
    lastUpdate: "2023-10-10"
  },
  {
    id: 7,
    name: "Collège Moderne",
    address: "Adjamé, Abidjan",
    students: 920,
    teachers: 38,
    classrooms: 24,
    electricity: true,
    water: false,
    sanitation: true,
    status: "Public",
    lastUpdate: "2023-10-08"
  },
  {
    id: 8,
    name: "École Les Génies",
    address: "Marcory, Abidjan",
    students: 350,
    teachers: 14,
    classrooms: 10,
    electricity: false,
    water: true,
    sanitation: false,
    status: "Privé",
    lastUpdate: "2023-09-28"
  }
];

export default function SchoolsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortField, setSortField] = useState<keyof School>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrer et trier les données
  const filteredSchools = schoolsData
    .filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "Tous" || school.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSort = (field: keyof School) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: keyof School }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
    return sortDirection === "asc" ? 
      <ChevronUp size={14} className="ml-1" /> : 
      <ChevronDown size={14} className="ml-1" />;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Établissements Scolaires</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredSchools.length} établissements trouvés
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
              placeholder="Rechercher une école..."
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
              <option value="Public">Public</option>
              <option value="Privé">Privé</option>
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
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  École <SortIcon field="name" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("students")}
              >
                <div className="flex items-center">
                  Élèves <SortIcon field="students" />
                </div>
              </th>
              <th className="py-3 px-4">Équipements</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Statut <SortIcon field="status" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("lastUpdate")}
              >
                <div className="flex items-center">
                  Mise à jour <SortIcon field="lastUpdate" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedSchools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{school.name}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {school.address}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Users size={14} className="mr-1" />
                        {school.students.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {school.teachers} enseignants
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <div className={`p-1.5 rounded ${school.electricity ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`} title="Électricité">
                      <Zap size={14} />
                    </div>
                    <div className={`p-1.5 rounded ${school.water ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`} title="Eau">
                      <Droplets size={14} />
                    </div>
                    <div className={`p-1.5 rounded ${school.sanitation ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`} title="Sanitaires">
                      <Home size={14} />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    school.status === "Public" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {school.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {new Date(school.lastUpdate).toLocaleDateString('fr-FR')}
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

        {paginatedSchools.length === 0 && (
          <div className="text-center py-12">
            <School size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Aucun établissement trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredSchools.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Affichage de {(page - 1) * itemsPerPage + 1} à {Math.min(page * itemsPerPage, filteredSchools.length)} sur {filteredSchools.length} établissements
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </button>
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}