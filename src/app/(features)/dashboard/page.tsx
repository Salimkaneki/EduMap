'use client'
import React, { useState, useEffect } from "react";
import { 
  School, 
  Map, 
  Droplet, 
  Users, 
  BarChart3, 
  ChevronRight,
  Download,
  Plus,
  TrendingUp,
  Calendar,
  Target,
  Eye,
  User,
  Zap,
  Toilet,
  Route,
  Home
} from "lucide-react";
import { getDashboardData, getEtablissementStats } from "./_services/dashboardService";
import { DashboardResponse, EtablissementStats } from "./_models/types";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [statsData, setStatsData] = useState<EtablissementStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, stats] = await Promise.all([
          getDashboardData(),
          getEtablissementStats()
        ]);
        setDashboardData(dashboard);
        setStatsData(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
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
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData || !statsData) return null;

  // Calculate real stats from API data
  const realStats = [
    { 
      id: 1, 
      label: "Établissements cartographiés", 
      value: statsData.total_etablissements.toLocaleString(), 
      icon: School, 
      change: "100%"
    },
    { 
      id: 2, 
      label: "Établissements avec eau", 
      value: statsData.equipements.avec_eau.toLocaleString(), 
      icon: Droplet, 
      change: `${Math.round((statsData.equipements.avec_eau / statsData.total_etablissements) * 100)}%`
    },
    { 
      id: 3, 
      label: "Établissements avec électricité", 
      value: statsData.equipements.avec_electricite.toLocaleString(), 
      icon: Zap, 
      change: `${Math.round((statsData.equipements.avec_electricite / statsData.total_etablissements) * 100)}%`
    },
    { 
      id: 4, 
      label: "Établissements avec latrines", 
      value: statsData.equipements.avec_latrines.toLocaleString(), 
      icon: Toilet, 
      change: `${Math.round((statsData.equipements.avec_latrines / statsData.total_etablissements) * 100)}%`
    },
  ];

  const recentData = [
    { id: 1, text: `${statsData.total_etablissements.toLocaleString()} établissements cartographiés`, time: "Données actuelles" },
    { id: 2, text: `${statsData.equipements.avec_eau.toLocaleString()} établissements avec accès à l'eau`, time: "Équipements" },
    { id: 3, text: `${statsData.infrastructures.total_salles_classes} salles de classe au total`, time: "Infrastructures" },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">EduMap</h1>
            <p className="text-gray-500 text-sm mt-1">
              Surveillance des données éducatives pour une allocation équitable des ressources.
            </p>
            <div className="flex items-center mt-2">
              <User size={16} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Connecté en tant que {dashboardData.admin.name} ({dashboardData.admin.role})
              </span>
            </div>
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

      {/* Admin Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
              <User size={18} className="text-blue-700" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 py-1 px-2 rounded">
              Total
            </span>
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900">{dashboardData.stats.total_admins}</p>
            <p className="text-xs text-gray-500 mt-1">Administrateurs</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100">
              <User size={18} className="text-green-700" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 py-1 px-2 rounded">
              Réguliers
            </span>
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900">{dashboardData.stats.regular_admins}</p>
            <p className="text-xs text-gray-500 mt-1">Admins réguliers</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100">
              <User size={18} className="text-purple-700" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 py-1 px-2 rounded">
              Super
            </span>
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900">{dashboardData.stats.super_admins}</p>
            <p className="text-xs text-gray-500 mt-1">Super admins</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {realStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                  <Icon size={18} className="text-gray-700" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 py-1 px-2 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </section>


      {/* Quick Actions */}
      <section className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Ajouter école", icon: School },
            { label: "Générer rapport", icon: BarChart3 },
            { label: "Analyser zone", icon: Map },
            { label: "Voir données", icon: Eye },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition"
            >
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-700 mb-2">
                <action.icon size={16} />
              </div>
              <span className="text-xs text-gray-700 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}