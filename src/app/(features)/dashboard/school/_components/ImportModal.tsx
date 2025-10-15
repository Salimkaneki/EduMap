"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  importEtablissements,
  ImportResult,
} from "@/app/actions/schoolActions";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export default function ImportModal({
  isOpen,
  onClose,
  onImportComplete,
}: ImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (
        !allowedTypes.includes(file.type) &&
        !file.name.endsWith(".csv") &&
        !file.name.endsWith(".xlsx") &&
        !file.name.endsWith(".xls")
      ) {
        setError(
          "Format de fichier non supporté. Utilisez CSV ou Excel (.csv, .xlsx, .xls)"
        );
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Le fichier est trop volumineux. Taille maximum: 10MB");
        return;
      }

      setSelectedFile(file);
      setError(null);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setError(null);
    setImportResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await importEtablissements(formData);
      setImportResult(result);

      if (result.statistics.errors === 0 || result.statistics.imported > 0) {
        // Recharger les données après un délai
        setTimeout(() => {
          onImportComplete();
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'import");
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/template_import_etablissements.csv";
    link.download = "template_import_etablissements.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setImportResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Importer des établissements
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Template Download Section */}
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <FileText className="text-blue-600 mt-0.5 mr-3" size={20} />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">
                    Template d'import requis
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Téléchargez le template CSV avec les colonnes requises et
                    remplissez-le avec vos données.
                  </p>
                  <button
                    onClick={handleDownloadTemplate}
                    className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <Download size={16} className="mr-2" />
                    Télécharger le template
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner un fichier
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Cliquez pour sélectionner un fichier
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                      disabled={isImporting}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    ou glissez-déposez votre fichier ici
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Formats acceptés: CSV, Excel (.xlsx, .xls) - Max 10MB
                </p>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  <span className="text-sm text-green-800">
                    Fichier sélectionné: {selectedFile.name} (
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="text-red-600 mr-2 mt-0.5" size={16} />
                <div>
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Erreur
                  </h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="mb-6">
              <div
                className={`p-4 border rounded-md ${
                  importResult.statistics.errors > 0
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-start">
                  {importResult.statistics.errors > 0 ? (
                    <AlertCircle
                      className="text-yellow-600 mr-2 mt-0.5"
                      size={16}
                    />
                  ) : (
                    <CheckCircle
                      className="text-green-600 mr-2 mt-0.5"
                      size={16}
                    />
                  )}
                  <div className="flex-1">
                    <h3
                      className={`text-sm font-medium mb-2 ${
                        importResult.statistics.errors > 0
                          ? "text-yellow-800"
                          : "text-green-800"
                      }`}
                    >
                      Résultats de l'import
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">
                          {importResult.statistics.imported}
                        </div>
                        <div className="text-gray-600">Importés</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">
                          {importResult.statistics.skipped}
                        </div>
                        <div className="text-gray-600">Ignorés</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">
                          {importResult.statistics.errors}
                        </div>
                        <div className="text-gray-600">Erreurs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Détails des erreurs:
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 max-h-40 overflow-y-auto">
                    <ul className="text-sm text-red-700 space-y-1">
                      {importResult.errors.map(
                        (error: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {error}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              disabled={isImporting}
            >
              Annuler
            </button>
            <button
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2 transition"
            >
              {isImporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Import en cours...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Importer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
