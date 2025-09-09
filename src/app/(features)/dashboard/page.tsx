'use client'
import React from "react";
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
  Eye
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { 
      id: 1, 
      label: "Écoles cartographiées", 
      value: "2 547", 
      icon: School, 
      change: "+12%"
    },
    { 
      id: 2, 
      label: "Zones prioritaires", 
      value: "134", 
      icon: Target, 
      change: "+5"
    },
    { 
      id: 3, 
      label: "Écoles avec eau", 
      value: "1 728", 
      icon: Droplet, 
      change: "68%"
    },
    { 
      id: 4, 
      label: "Parents utilisateurs", 
      value: "6 320", 
      icon: Users, 
      change: "+324"
    },
  ];

  const recentData = [
    { id: 1, text: "12 nouvelles écoles ajoutées", time: "Il y a 2 heures" },
    { id: 2, text: "5 zones prioritaires identifiées", time: "Hier" },
    { id: 3, text: "Mise à jour des infrastructures", time: "Il y a 3 jours" },
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

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
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

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Carte interactive */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Carte des établissements
            </h2>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              Explorer <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded border border-gray-200">
            <div className="text-center">
              <Map className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Visualisation cartographique</p>
              <p className="text-gray-400 text-xs mt-1">Explorez les établissements par région</p>
              <button className="mt-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded hover:bg-gray-800 transition">
                Ouvrir la carte
              </button>
            </div>
          </div>
        </div>

        {/* Dernières données */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Activité récente
            </h2>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {recentData.map((item) => (
              <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start">
                  <div className="bg-blue-50 rounded-full p-1.5 mr-3">
                    <TrendingUp size={14} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm">{item.text}</p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center">
                      <Calendar size={12} className="mr-1" /> {item.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact et vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Impact actuel
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Grâce à EduMap, plus de <span className="font-medium text-gray-900">2 500 établissements</span> 
            {" "}ont été cartographiés. Nous identifions les zones prioritaires et aidons les décideurs
            à mieux répartir les ressources éducatives.
          </p>
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            <div className="flex-1">
              <p className="text-xs text-gray-500">Prochain objectif</p>
              <p className="text-sm font-medium text-gray-900">Atteindre 3 000 écoles</p>
            </div>
            <div className="text-xs font-medium text-gray-500">
              85% complété
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Vision à venir
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Étendre la couverture à toutes les régions, développer des indicateurs d'équité éducative
            avancés et donner à chaque parent un accès transparent aux données de son territoire.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-600 text-sm">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
              Expansion à 3 nouvelles régions
            </li>
            <li className="flex items-center text-gray-600 text-sm">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
              Module d'analyse d'équité
            </li>
            <li className="flex items-center text-gray-600 text-sm">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
              Application mobile parents
            </li>
          </ul>
        </div>
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