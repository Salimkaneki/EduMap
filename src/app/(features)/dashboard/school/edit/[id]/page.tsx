'use client'
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  MapPin,
  Users,
  Building,
  Zap,
  Droplets,
  Home,
  Edit
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { getSchoolById, updateSchool, CreateSchoolData } from '../../_services/schoolService';
import { useFilterOptions } from "../../../../../../../hooks/useFilterOptions";

interface SchoolFormData {
  code_etablissement: string;
  nom_etablissement: string;
  latitude: string;
  longitude: string;
  region: string;
  prefecture: string;
  canton_village_autonome: string;
  ville_village_quartier: string;
  commune_etab: string;
  libelle_type_milieu: string;
  libelle_type_statut_etab: string;
  libelle_type_systeme: string;
  libelle_type_annee: string;
  existe_elect: boolean;
  existe_latrine: boolean;
  existe_latrine_fonct: boolean;
  acces_toute_saison: boolean;
  eau: boolean;
  sommedenb_eff_g: string;
  sommedenb_eff_f: string;
  sommedenb_ens_h: string;
  sommedenb_ens_f: string;
  sommedenb_salles_classes_dur: string;
  sommedenb_salles_classes_banco: string;
  sommedenb_salles_classes_autre: string;
}

export default function EditSchoolPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filterOptions, loading: filterOptionsLoading, error: filterOptionsError } = useFilterOptions();

  const [formData, setFormData] = useState<SchoolFormData>({
    code_etablissement: "",
    nom_etablissement: "",
    latitude: "",
    longitude: "",
    region: "",
    prefecture: "",
    canton_village_autonome: "",
    ville_village_quartier: "",
    commune_etab: "",
    libelle_type_milieu: "",
    libelle_type_statut_etab: "",
    libelle_type_systeme: "",
    libelle_type_annee: "2023-2024",
    existe_elect: false,
    existe_latrine: false,
    existe_latrine_fonct: false,
    acces_toute_saison: false,
    eau: false,
    sommedenb_eff_g: "",
    sommedenb_eff_f: "",
    sommedenb_ens_h: "",
    sommedenb_ens_f: "",
    sommedenb_salles_classes_dur: "",
    sommedenb_salles_classes_banco: "",
    sommedenb_salles_classes_autre: ""
  });

  // Charger les données de l'école au montage du composant
  useEffect(() => {
    loadSchoolData();
  }, [schoolId]);

  const loadSchoolData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const schoolData = await getSchoolById(parseInt(schoolId));

      // Remplir le formulaire avec les données récupérées
      setFormData({
        code_etablissement: schoolData.code_etablissement || "",
        nom_etablissement: schoolData.nom_etablissement || "",
        latitude: schoolData.latitude?.toString() || "",
        longitude: schoolData.longitude?.toString() || "",
        region: schoolData.localisation?.region || "",
        prefecture: schoolData.localisation?.prefecture || "",
        canton_village_autonome: schoolData.localisation?.canton_village_autonome || "",
        ville_village_quartier: schoolData.localisation?.ville_village_quartier || "",
        commune_etab: schoolData.localisation?.commune_etab || "",
        libelle_type_milieu: schoolData.milieu?.libelle_type_milieu || "",
        libelle_type_statut_etab: schoolData.statut?.libelle_type_statut_etab || "",
        libelle_type_systeme: schoolData.systeme?.libelle_type_systeme || "",
        libelle_type_annee: schoolData.annee?.libelle_type_annee || "2023-2024",
        existe_elect: schoolData.equipement?.existe_elect || false,
        existe_latrine: schoolData.equipement?.existe_latrine || false,
        existe_latrine_fonct: schoolData.equipement?.existe_latrine_fonct || false,
        acces_toute_saison: schoolData.equipement?.acces_toute_saison || false,
        eau: schoolData.equipement?.eau || false,
        sommedenb_eff_g: schoolData.effectif?.sommedenb_eff_g?.toString() || "",
        sommedenb_eff_f: schoolData.effectif?.sommedenb_eff_f?.toString() || "",
        sommedenb_ens_h: schoolData.effectif?.sommedenb_ens_h?.toString() || "",
        sommedenb_ens_f: schoolData.effectif?.sommedenb_ens_f?.toString() || "",
        sommedenb_salles_classes_dur: schoolData.infrastructure?.sommedenb_salles_classes_dur?.toString() || "",
        sommedenb_salles_classes_banco: schoolData.infrastructure?.sommedenb_salles_classes_banco?.toString() || "",
        sommedenb_salles_classes_autre: schoolData.infrastructure?.sommedenb_salles_classes_autre?.toString() || ""
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données de l\'école:', error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validation côté client
      const lat = parseFloat(formData.latitude);
      const lng = parseFloat(formData.longitude);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('Latitude invalide (doit être entre -90 et 90)');
      }

      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('Longitude invalide (doit être entre -180 et 180)');
      }

      // Préparer les données pour l'API
      const payload: CreateSchoolData = {
        ...formData,
        // Convertir les chaînes en nombres pour les champs numériques
        latitude: lat,
        longitude: lng,
        sommedenb_eff_g: parseInt(formData.sommedenb_eff_g) || 0,
        sommedenb_eff_f: parseInt(formData.sommedenb_eff_f) || 0,
        sommedenb_ens_h: parseInt(formData.sommedenb_ens_h) || 0,
        sommedenb_ens_f: parseInt(formData.sommedenb_ens_f) || 0,
        sommedenb_salles_classes_dur: parseInt(formData.sommedenb_salles_classes_dur) || 0,
        sommedenb_salles_classes_banco: parseInt(formData.sommedenb_salles_classes_banco) || 0,
        sommedenb_salles_classes_autre: parseInt(formData.sommedenb_salles_classes_autre) || 0,
        // Calculer le total des élèves
        tot: (parseInt(formData.sommedenb_eff_g) || 0) + (parseInt(formData.sommedenb_eff_f) || 0),
        // Calculer le total des enseignants
        total_ense: (parseInt(formData.sommedenb_ens_h) || 0) + (parseInt(formData.sommedenb_ens_f) || 0)
      };

      // Utiliser le service pour mettre à jour l'école
      const result = await updateSchool(parseInt(schoolId), payload);
      console.log('Établissement mis à jour:', result);

      // Redirection après succès
      router.push("/dashboard/school?success=true&updated=true");
    } catch (error) {
      console.error('Erreur:', error);
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données de l'établissement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </button>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Edit className="text-orange-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Modifier l'établissement</h1>
            <p className="text-gray-500 text-sm mt-1">
              Modifier les informations de l'établissement scolaire
            </p>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-600 mr-2">⚠️</div>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {filterOptionsError && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <p className="text-yellow-800 text-sm">
              Attention: Impossible de charger les options de filtrage. Vous pouvez continuer mais certains champs peuvent être limités.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations générales */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <MapPin size={20} className="mr-2 text-blue-600" />
              Informations générales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code établissement *
                </label>
                <input
                  type="text"
                  name="code_etablissement"
                  value={formData.code_etablissement}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: ETB001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'établissement *
                </label>
                <input
                  type="text"
                  name="nom_etablissement"
                  value={formData.nom_etablissement}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: École Primaire de Test"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Région *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  disabled={filterOptionsLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {filterOptionsLoading ? 'Chargement...' : 'Sélectionnez une région'}
                  </option>
                  {filterOptions?.regions.map((region: string) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Préfecture *
                </label>
                <select
                  name="prefecture"
                  value={formData.prefecture}
                  onChange={handleInputChange}
                  required
                  disabled={filterOptionsLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {filterOptionsLoading ? 'Chargement...' : 'Sélectionnez une préfecture'}
                  </option>
                  {filterOptions?.prefectures.map((prefecture: string) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canton/Village autonome *
                </label>
                <input
                  type="text"
                  name="canton_village_autonome"
                  value={formData.canton_village_autonome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: Test Village"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville/Village/Quartier *
                </label>
                <input
                  type="text"
                  name="ville_village_quartier"
                  value={formData.ville_village_quartier}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: Test Quartier"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commune *
                </label>
                <input
                  type="text"
                  name="commune_etab"
                  value={formData.commune_etab}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ex: Test Commune"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 6.1319"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude *
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 1.2228"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Effectifs */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Users size={20} className="mr-2 text-green-600" />
              Effectifs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'élèves garçons *
                </label>
                <input
                  type="number"
                  name="sommedenb_eff_g"
                  value={formData.sommedenb_eff_g}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'élèves filles *
                </label>
                <input
                  type="number"
                  name="sommedenb_eff_f"
                  value={formData.sommedenb_eff_f}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'enseignants hommes *
                </label>
                <input
                  type="number"
                  name="sommedenb_ens_h"
                  value={formData.sommedenb_ens_h}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'enseignantes femmes *
                </label>
                <input
                  type="number"
                  name="sommedenb_ens_f"
                  value={formData.sommedenb_ens_f}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Types */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Building size={20} className="mr-2 text-purple-600" />
              Types et classifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de milieu *
                </label>
                <select
                  name="libelle_type_milieu"
                  value={formData.libelle_type_milieu}
                  onChange={handleInputChange}
                  required
                  disabled={filterOptionsLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {filterOptionsLoading ? 'Chargement...' : 'Sélectionnez un type de milieu'}
                  </option>
                  {filterOptions?.types_milieu.map((milieu: string) => (
                    <option key={milieu} value={milieu}>
                      {milieu}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut *
                </label>
                <select
                  name="libelle_type_statut_etab"
                  value={formData.libelle_type_statut_etab}
                  onChange={handleInputChange}
                  required
                  disabled={filterOptionsLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {filterOptionsLoading ? 'Chargement...' : 'Sélectionnez un statut'}
                  </option>
                  {filterOptions?.types_statut.map((statut: string) => (
                    <option key={statut} value={statut}>
                      {statut}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Système *
                </label>
                <select
                  name="libelle_type_systeme"
                  value={formData.libelle_type_systeme}
                  onChange={handleInputChange}
                  required
                  disabled={filterOptionsLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {filterOptionsLoading ? 'Chargement...' : 'Sélectionnez un système'}
                  </option>
                  {filterOptions?.types_systeme.map((systeme: string) => (
                    <option key={systeme} value={systeme}>
                      {systeme}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année scolaire *
                </label>
                <select
                  name="libelle_type_annee"
                  value={formData.libelle_type_annee}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
            </div>
          </div>

          {/* Infrastructures */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Building size={20} className="mr-2 text-orange-600" />
              Infrastructures
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salles de classe dur *
                </label>
                <input
                  type="number"
                  name="sommedenb_salles_classes_dur"
                  value={formData.sommedenb_salles_classes_dur}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salles de classe banco *
                </label>
                <input
                  type="number"
                  name="sommedenb_salles_classes_banco"
                  value={formData.sommedenb_salles_classes_banco}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salles de classe autre *
                </label>
                <input
                  type="number"
                  name="sommedenb_salles_classes_autre"
                  value={formData.sommedenb_salles_classes_autre}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Équipements */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Building size={20} className="mr-2 text-indigo-600" />
              Équipements et services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="existe_elect"
                  checked={formData.existe_elect}
                  onChange={handleInputChange}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3 flex items-center">
                  <Zap size={18} className="text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Électricité</span>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="eau"
                  checked={formData.eau}
                  onChange={handleInputChange}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3 flex items-center">
                  <Droplets size={18} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Eau potable</span>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="existe_latrine"
                  checked={formData.existe_latrine}
                  onChange={handleInputChange}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3 flex items-center">
                  <Home size={18} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Latrines</span>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="existe_latrine_fonct"
                  checked={formData.existe_latrine_fonct}
                  onChange={handleInputChange}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3 flex items-center">
                  <Home size={18} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Latrines fonctionnelles</span>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer md:col-span-2">
                <input
                  type="checkbox"
                  name="acces_toute_saison"
                  checked={formData.acces_toute_saison}
                  onChange={handleInputChange}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3 flex items-center">
                  <MapPin size={18} className="text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Accès toute saison</span>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Mettre à jour l'établissement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}