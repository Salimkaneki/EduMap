"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Trash2,
  Plus,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Admin,
  AdminResponse,
  deleteAdmin,
  getAdmins,
} from "./_services/adminService";
import CreateAdminModal from "./_components/CreateAdminModal";
import EditAdminModal from "./_components/EditAdminModal";

type SortField = keyof Admin;
type SortDirection = "asc" | "desc";

export default function AdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAdmins();
      setAdmins(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des administrateurs"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch admins when component mounts
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (adminId: number, adminName: string) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer l'administrateur "${adminName}" ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    try {
      await deleteAdmin(adminId);
      // Refresh the list
      await fetchAdmins();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(
        `Erreur lors de la suppression: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  };

  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleCreateSuccess = () => {
    fetchAdmins();
  };

  const handleEditSuccess = () => {
    fetchAdmins();
    setSelectedAdmin(null);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1" />
    ) : (
      <ChevronDown size={14} className="ml-1" />
    );
  };

  // Sort admins locally
  const sortedAdmins = [...admins].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des administrateurs...</p>
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
            onClick={() => fetchAdmins()}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Réessayer
          </button>
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
              Gestion des Administrateurs
            </h1>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm"
          >
            <Plus size={16} />
            Nouvel Admin
          </button>
        </div>
      </header>

      {/* Admins Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500 font-medium">
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  <User size={14} className="mr-2" />
                  Nom <SortIcon field="name" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  <Mail size={14} className="mr-2" />
                  Email <SortIcon field="email" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center">
                  <Shield size={14} className="mr-2" />
                  Rôle <SortIcon field="role" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("created_at")}
              >
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Créé le <SortIcon field="created_at" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedAdmins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{admin.name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-600">{admin.email}</div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.role === "super_admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-600">
                    {admin.created_at
                      ? new Date(admin.created_at).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
                      title="Modifier l'administrateur"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id, admin.name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                      title="Supprimer l'administrateur"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedAdmins.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Aucun administrateur trouvé</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        admin={selectedAdmin}
      />
    </div>
  );
}
