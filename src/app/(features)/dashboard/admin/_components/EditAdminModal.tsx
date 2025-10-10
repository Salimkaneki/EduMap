"use client";

import React, { useState } from "react";
import { X, User, Mail, Lock, Shield } from "lucide-react";
import { updateAdmin, Admin } from "../_services/adminService";

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin: Admin | null;
}

export default function EditAdminModal({
  isOpen,
  onClose,
  onSuccess,
  admin,
}: EditAdminModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!admin) return;

    setIsLoading(true);
    setError(null);

    try {
      await updateAdmin(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Modifier l'administrateur
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form action={handleSubmit} className="p-6 space-y-4">
          <input type="hidden" name="id" value={admin.id} />

          {/* Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="mr-2 text-gray-500" />
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              defaultValue={admin.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Entrez le nom complet"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} className="mr-2 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={admin.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@edumap.tg"
              required
            />
          </div>

          {/* Password (optional) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock size={16} className="mr-2 text-gray-500" />
              Nouveau mot de passe (optionnel)
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Laisser vide pour conserver le mot de passe actuel"
            />
            <p className="text-xs text-gray-500 mt-1">
              Laissez vide pour conserver le mot de passe actuel
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Shield size={16} className="mr-2 text-gray-500" />
              Rôle
            </label>
            <select
              name="role"
              defaultValue={admin.role}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Administrateur</option>
              <option value="super_admin">Super Administrateur</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Modification..." : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
