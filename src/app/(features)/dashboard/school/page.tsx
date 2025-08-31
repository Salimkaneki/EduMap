"use client";
import React, { useState } from "react";
import { Search, MapPin, Building2, Phone, Globe, Users, Zap, Droplets, Calendar, Edit3, Trash2, Plus, BarChart3, Settings } from "lucide-react";

type School = {
  id: string;
  name: string;
  type: string;
  location: string;
  region: string;
  electricity: boolean;
  latrines: boolean;
  water: boolean;
  allSeasonAccess: boolean;
  classrooms: number;
  teachers: number;
  students: number;
  contact: string;
  email: string;
  mapUrl?: string;
  establishedYear?: number;
  description?: string;
  lastInspection?: Date;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Date;
};

export default function SchoolManagementSystem() {
  const [formData, setFormData] = useState<School>({
    id: "",
    name: "",
    type: "Public",
    location: "",
    region: "",
    electricity: false,
    latrines: false,
    water: false,
    allSeasonAccess: false,
    classrooms: 0,
    teachers: 0,
    students: 0,
    contact: "",
    email: "",
    mapUrl: "",
    establishedYear: new Date().getFullYear(),
    description: "",
    lastInspection: new Date(),
    status: 'active',
    createdAt: new Date(),
  });

  const [schools, setSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || school.type === filterType;
    const matchesStatus = filterStatus === "all" || school.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: schools.length,
    active: schools.filter(s => s.status === 'active').length,
    totalStudents: schools.reduce((sum, s) => sum + s.students, 0),
    totalTeachers: schools.reduce((sum, s) => sum + s.teachers, 0),
    infrastructureAvg: schools.length > 0 ? Math.round(
      schools.reduce((sum, s) => {
        const score = [s.electricity, s.latrines, s.water, s.allSeasonAccess].filter(Boolean).length;
        return sum + (score / 4 * 100);
      }, 0) / schools.length
    ) : 0,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (type === "date") {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchool = {
      ...formData,
      id: editingId || `school_${Date.now()}`,
      createdAt: editingId ? schools.find(s => s.id === editingId)?.createdAt || new Date() : new Date(),
    };

    if (editingId) {
      setSchools(prev => prev.map(school => school.id === editingId ? newSchool : school));
      setEditingId(null);
    } else {
      setSchools(prev => [...prev, newSchool]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      type: "Public",
      location: "",
      region: "",
      electricity: false,
      latrines: false,
      water: false,
      allSeasonAccess: false,
      classrooms: 0,
      teachers: 0,
      students: 0,
      contact: "",
      email: "",
      mapUrl: "",
      establishedYear: new Date().getFullYear(),
      description: "",
      lastInspection: new Date(),
      status: 'active',
      createdAt: new Date(),
    });
    setShowForm(false);
  };

  const handleEdit = (school: School) => {
    setFormData(school);
    setEditingId(school.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Confirmer la suppression de cet établissement ?")) {
      setSchools(prev => prev.filter(school => school.id !== id));
    }
  };

  const getInfrastructureLevel = (school: School) => {
    const features = [school.electricity, school.latrines, school.water, school.allSeasonAccess];
    const score = features.filter(Boolean).length;
    if (score === 4) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 3) return { level: 'Bon', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 2) return { level: 'Moyen', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Insuffisant', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { label: 'Actif', color: 'text-green-700', bg: 'bg-green-100' };
      case 'inactive': return { label: 'Inactif', color: 'text-red-700', bg: 'bg-red-100' };
      case 'maintenance': return { label: 'Maintenance', color: 'text-orange-700', bg: 'bg-orange-100' };
      default: return { label: status, color: 'text-gray-700', bg: 'bg-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="text-indigo-600" size={32} />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Système de Gestion Scolaire</h1>
              <p className="text-sm text-gray-500">Administration des établissements éducatifs</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-400 hover:text-gray-600 transition"
            >
              <BarChart3 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
              <Settings size={20} />
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              <span>Nouvel établissement</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Établissements</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <Building2 className="text-indigo-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Actifs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Étudiants</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Enseignants</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTeachers.toLocaleString()}</p>
              </div>
              <Users className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Infrastructure</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.infrastructureAvg}%</p>
              </div>
              <Zap className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Modifier l'établissement" : "Nouvel établissement"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations générales */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de l'établissement *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type d'établissement
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Public">Public</option>
                      <option value="Privé">Privé</option>
                      <option value="Privé confessionnel">Privé confessionnel</option>
                      <option value="Communautaire">Communautaire</option>
                      <option value="Non spécifié">Non spécifié</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Localisation *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Région
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salles de classe
                    </label>
                    <input
                      type="number"
                      name="classrooms"
                      value={formData.classrooms}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enseignants
                    </label>
                    <input
                      type="number"
                      name="teachers"
                      value={formData.teachers}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Étudiants
                    </label>
                    <input
                      type="number"
                      name="students"
                      value={formData.students}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Informations complémentaires */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="maintenance">En maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année de création
                  </label>
                  <input
                    type="number"
                    name="establishedYear"
                    value={formData.establishedYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Google Maps
                  </label>
                  <input
                    type="url"
                    name="mapUrl"
                    value={formData.mapUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Infrastructure disponible
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="electricity"
                        checked={formData.electricity}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Électricité</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="water"
                        checked={formData.water}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Accès à l'eau potable</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="latrines"
                        checked={formData.latrines}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Installations sanitaires</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="allSeasonAccess"
                        checked={formData.allSeasonAccess}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Accès toutes saisons</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                {editingId ? "Mettre à jour" : "Créer l'établissement"}
              </button>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un établissement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les types</option>
              <option value="Public">Public</option>
              <option value="Privé">Privé</option>
              <option value="Privé confessionnel">Privé confessionnel</option>
              <option value="Communautaire">Communautaire</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Liste des établissements */}
        {schools.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Building2 className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun établissement enregistré</h3>
            <p className="text-gray-500 mb-6">Commencez par créer votre premier établissement scolaire.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Créer un établissement
            </button>
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Search className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-500">Aucun établissement ne correspond à vos critères de recherche.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid gap-6 lg:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
            {filteredSchools.map((school) => {
              const infrastructure = getInfrastructureLevel(school);
              const statusConfig = getStatusConfig(school.status);
              
              return (
                <div
                  key={school.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{school.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                            {school.type}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${statusConfig.bg} ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin size={14} className="mr-1" />
                          {school.location}{school.region && `, ${school.region}`}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(school)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(school.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Métriques */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{school.classrooms}</p>
                        <p className="text-xs text-gray-500">Salles</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{school.teachers}</p>
                        <p className="text-xs text-gray-500">Enseignants</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{school.students}</p>
                        <p className="text-xs text-gray-500">Étudiants</p>
                      </div>
                    </div>

                    {/* Infrastructure */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Infrastructure</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${infrastructure.bg} ${infrastructure.color}`}>
                          {infrastructure.level}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center space-x-1 ${school.electricity ? 'text-green-600' : 'text-gray-400'}`}>
                          <Zap size={12} />
                          <span>Électricité</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${school.water ? 'text-blue-600' : 'text-gray-400'}`}>
                          <Droplets size={12} />
                          <span>Eau</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${school.latrines ? 'text-purple-600' : 'text-gray-400'}`}>
                          <Building2 size={12} />
                          <span>Sanitaires</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${school.allSeasonAccess ? 'text-indigo-600' : 'text-gray-400'}`}>
                          <Calendar size={12} />
                          <span>Toute saison</span>
                        </div>
                      </div>
                    </div>

                    {/* Informations de contact */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {school.contact && (
                        <div className="flex items-center space-x-2">
                          <Phone size={14} />
                          <span>{school.contact}</span>
                        </div>
                      )}
                      {school.email && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">@</span>
                          <span>{school.email}</span>
                        </div>
                      )}
                      {school.mapUrl && (
                        <a
                          href={school.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition"
                        >
                          <Globe size={14} />
                          <span>Localisation</span>
                        </a>
                      )}
                    </div>

                    {school.description && (
                      <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                        {school.description}
                      </p>
                    )}

                    {/* Méta-informations */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                      <span>
                        {school.establishedYear && `Créé en ${school.establishedYear}`}
                      </span>
                      <span>
                        Enregistré le {school.createdAt.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}