'use client'
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  MapPin,
  Users,
  Building,
  Zap,
  Droplets,
  Home,
  Upload,
  X,
  School
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  prefecture: string;
  students: string;
  teachers: string;
  classrooms: string;
  electricity: boolean;
  water: boolean;
  sanitation: boolean;
  status: "Public" | "Privé";
  latitude: string;
  longitude: string;
  photo: File | null;
}

export default function SchoolRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SchoolFormData>({
    name: "",
    address: "",
    city: "",
    prefecture: "",
    students: "",
    teachers: "",
    classrooms: "",
    electricity: false,
    water: false,
    sanitation: false,
    status: "Public",
    latitude: "",
    longitude: "",
    photo: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Données soumises:", formData);
    setIsSubmitting(false);
    
    // Redirection après succès
    router.push("/dashboard/school?success=true");
  };

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
          <div className="p-3 bg-blue-100 rounded-lg">
            <School className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Nouvel établissement</h1>
            <p className="text-gray-500 text-sm mt-1">
              Ajouter un nouvel établissement scolaire à la base de données
            </p>
          </div>
        </div>
      </header>

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
                  Nom de l'établissement *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Lycée Moderne d'Abidjan"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Public">Public</option>
                  <option value="Privé">Privé</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Rue des Écoles, Plateau"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville/Village *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Abidjan"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Préfecture *
                </label>
                <input
                  type="text"
                  name="prefecture"
                  value={formData.prefecture}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Abidjan"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 5.3456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: -4.1234"
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'élèves *
                </label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'enseignants *
                </label>
                <input
                  type="number"
                  name="teachers"
                  value={formData.teachers}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de salles de classe *
                </label>
                <input
                  type="number"
                  name="classrooms"
                  value={formData.classrooms}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Équipements */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Building size={20} className="mr-2 text-purple-600" />
              Équipements et infrastructures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="electricity"
                  checked={formData.electricity}
                  onChange={handleInputChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <Zap size={18} className="text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Électricité</span>
                </div>
              </label>
              
              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="water"
                  checked={formData.water}
                  onChange={handleInputChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <Droplets size={18} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Eau potable</span>
                </div>
              </label>
              
              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="sanitation"
                  checked={formData.sanitation}
                  onChange={handleInputChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <Home size={18} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Sanitaires</span>
                </div>
              </label>
            </div>
          </div>

          {/* Photo */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Photo de l'établissement
            </h2>
            
            {formData.photo ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">{formData.photo.name}</span>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquer pour uploader</span> ou glisser-déposer
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Enregistrer l'établissement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}