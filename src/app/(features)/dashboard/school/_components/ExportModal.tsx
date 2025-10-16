"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  FileSpreadsheet,
  FileText,
  FileType,
  Filter,
  Loader2,
} from "lucide-react";
import {
  exportEtablissements,
  ExportFilters,
} from "@/app/actions/schoolActions";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters?: ExportFilters;
}

type ExportFormat = "excel" | "csv" | "pdf";

export default function ExportModal({
  isOpen,
  onClose,
  currentFilters,
}: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("excel");
  const [useFilters, setUseFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formats = [
    {
      id: "excel" as ExportFormat,
      name: "Excel",
      icon: FileSpreadsheet,
      description: "Idéal pour l'analyse de données",
      extension: ".xlsx",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "csv" as ExportFormat,
      name: "CSV",
      icon: FileText,
      description: "Compatible avec tous les tableurs",
      extension: ".csv",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "pdf" as ExportFormat,
      name: "PDF",
      icon: FileType,
      description: "Idéal pour l'impression et l'archivage",
      extension: ".pdf",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const filters = useFilters ? currentFilters : undefined;
      const result = await exportEtablissements(selectedFormat, filters);

      if (!result.success) {
        throw new Error(result.error || "Erreur lors de l'export");
      }

      // Télécharger le fichier côté client
      if (result.data && result.filename && result.contentType) {
        // Convertir base64 en blob
        const binaryString = atob(result.data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: result.contentType });

        // Créer un lien de téléchargement
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      // Fermer la modal après un court délai pour montrer le succès
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsExporting(false);
    }
  };

  const resetModal = () => {
    setSelectedFormat("excel");
    setUseFilters(false);
    setError(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  const selectedFormatData = formats.find((f) => f.id === selectedFormat);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Exporter des établissements
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Format Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choisissez le format d'export
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formats.map((format) => {
                const Icon = format.icon;
                const isSelected = selectedFormat === format.id;
                return (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 border-2 rounded-lg transition text-left ${
                      isSelected
                        ? `${format.borderColor} ${format.bgColor}`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Icon
                        className={`${
                          isSelected ? format.color : "text-gray-400"
                        } mr-2`}
                        size={24}
                      />
                      <span
                        className={`font-medium ${
                          isSelected ? format.color : "text-gray-700"
                        }`}
                      >
                        {format.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {format.description}
                    </p>
                    <p className="text-xs text-gray-400">{format.extension}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Option */}
          {currentFilters && Object.values(currentFilters).some((v) => v) && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <Filter className="text-gray-600 mt-0.5 mr-3" size={20} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      Utiliser les filtres actifs
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useFilters}
                        onChange={(e) => setUseFilters(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {useFilters && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">
                        Les données exportées seront filtrées selon :
                      </p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
                        {currentFilters.region && (
                          <li>• Région: {currentFilters.region}</li>
                        )}
                        {currentFilters.prefecture && (
                          <li>• Préfecture: {currentFilters.prefecture}</li>
                        )}
                        {currentFilters.libelle_type_milieu && (
                          <li>
                            • Milieu: {currentFilters.libelle_type_milieu}
                          </li>
                        )}
                        {currentFilters.libelle_type_statut_etab && (
                          <li>
                            • Statut: {currentFilters.libelle_type_statut_etab}
                          </li>
                        )}
                        {currentFilters.libelle_type_systeme && (
                          <li>
                            • Système: {currentFilters.libelle_type_systeme}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Export Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Download className="text-blue-600 mt-0.5 mr-3" size={20} />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">
                  Contenu de l'export
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  Le fichier {selectedFormatData?.name} contiendra{" "}
                  {useFilters
                    ? "les établissements filtrés"
                    : "tous les établissements"}{" "}
                  avec les informations suivantes :
                </p>
                <ul className="text-xs text-blue-600 space-y-0.5">
                  <li>• Informations générales (Code, Nom, Localisation)</li>
                  <li>• Classification (Milieu, Statut, Système)</li>
                  <li>• Équipements (Électricité, Eau, Latrines)</li>
                  <li>• Effectifs (Élèves et Enseignants)</li>
                  <li>• Infrastructures (Salles de classe)</li>
                </ul>
                {!useFilters && (
                  <p className="text-xs text-amber-700 mt-2 font-medium">
                    ⚠️ Pour un export volumineux, il est recommandé d'utiliser
                    les filtres pour réduire la quantité de données.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <X className="text-red-600 mr-2 mt-0.5" size={16} />
                <div>
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Erreur
                  </h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              disabled={isExporting}
            >
              Annuler
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2 transition"
            >
              {isExporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Export en cours...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Exporter en {selectedFormatData?.name}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
