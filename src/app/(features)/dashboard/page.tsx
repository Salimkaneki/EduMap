'use client'
import React from "react";
import { School, Map, Droplet, Users, BarChart3, Globe2 } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { id: 1, label: "Écoles cartographiées", value: "2 547", icon: School, color: "bg-blue-50 text-blue-600" },
    { id: 2, label: "Zones prioritaires", value: "134", icon: Globe2, color: "bg-red-50 text-red-600" },
    { id: 3, label: "Écoles avec eau potable", value: "1 728", icon: Droplet, color: "bg-cyan-50 text-cyan-600" },
    { id: 4, label: "Parents utilisateurs", value: "6 320", icon: Users, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord EduMap</h1>
        <p className="text-gray-600">
          Une vision claire pour un avenir éducatif plus équitable.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4 hover:shadow-md transition"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${stat.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte interactive */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Carte interactive
          </h2>
          <div className="flex items-center justify-center h-64 text-gray-400 border border-dashed border-gray-200 rounded-lg">
            <Map className="w-8 h-8" />
            <span className="ml-2">Intégration carte (placeholder)</span>
          </div>
        </div>

        {/* Dernières données */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Dernières données collectées
          </h2>
          <ul className="divide-y divide-gray-100">
            <li className="py-3 text-gray-700 text-sm">12 nouvelles écoles ajoutées</li>
            <li className="py-3 text-gray-700 text-sm">5 zones prioritaires identifiées</li>
            <li className="py-3 text-gray-700 text-sm">Mise à jour des infrastructures sanitaires</li>
          </ul>
        </div>
      </section>

      {/* Impact et vision */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Impact actuel
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Grâce à EduMap, plus de <span className="font-semibold">2 500 établissements</span> 
            ont été cartographiés. Nous identifions les zones prioritaires et aidons les décideurs
            à mieux répartir les ressources éducatives.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vision à venir
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Étendre la couverture à toutes les régions, développer des indicateurs d’équité éducative
            avancés et donner à chaque parent un accès transparent aux données de son territoire.
          </p>
        </div>
      </section>
    </div>
  );
}
