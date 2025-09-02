"use client";

import { TrendingUp, MapPin, Filter, LayoutGrid } from "lucide-react";
import { THEME_CLASSES } from "@/lib/theme";

interface PageHeaderProps {
  totalEstablishments: number;
}

export default function PageHeader({ totalEstablishments }: PageHeaderProps) {
  const statsData = [
    {
      icon: TrendingUp,
      value: totalEstablishments.toLocaleString(),
      label: "Établissements",
    },
    {
      icon: MapPin,
      value: "7",
      label: "Régions",
    },
    {
      icon: Filter,
      value: "39",
      label: "Préfectures",
    },
    {
      icon: LayoutGrid,
      value: "6",
      label: "Types",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Effet de grille subtile */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent lumineux en haut */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Texte principal - plus compact */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Découvrez les Écoles du Togo
            </h1>
            <p className="text-gray-300 text-base max-w-2xl">
              Explorez{" "}
              <span className="text-indigo-400 font-semibold">
                {totalEstablishments.toLocaleString()}
              </span>{" "}
              établissements scolaires à travers les 7 régions pédagogiques du Togo
            </p>
          </div>

          {/* Stats compactes en ligne */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    <div>
                      <p className="text-lg font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-400 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
