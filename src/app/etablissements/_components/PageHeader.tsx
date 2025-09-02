"use client";

import { TrendingUp, MapPin, Filter, LayoutGrid } from "lucide-react";

interface PageHeaderProps {
  totalEstablishments: number;
}

export default function PageHeader({ totalEstablishments }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Découvrez les Écoles du Togo
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explorez plus de {totalEstablishments.toLocaleString()}{" "}
            établissements scolaires à travers les 7 régions du Togo avec notre
            plateforme moderne et intuitive.
          </p>

          {/* Stats rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-blue-200" />
              </div>
              <p className="text-2xl font-bold">
                {totalEstablishments.toLocaleString()}
              </p>
              <p className="text-sm text-blue-200">Établissements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-green-200" />
              </div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-green-200">Régions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Filter className="w-6 h-6 text-yellow-200" />
              </div>
              <p className="text-2xl font-bold">39</p>
              <p className="text-sm text-yellow-200">Préfectures</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <LayoutGrid className="w-6 h-6 text-purple-200" />
              </div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-purple-200">
                Types d&apos;établissements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
