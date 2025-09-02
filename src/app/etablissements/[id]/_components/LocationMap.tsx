"use client";

import dynamic from "next/dynamic";
import { Etablissement } from "../../_model/etablissement";

// Import dynamique pour éviter les erreurs SSR
const GoogleMapComponent = dynamic(
  () => import("../../_components/GoogleMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <div className="flex items-center justify-center h-96">
          <div className="text-indigo-600">Chargement de la carte...</div>
        </div>
      </div>
    ),
  }
);

interface LocationMapProps {
  etablissement: Etablissement;
}

export default function LocationMap({ etablissement }: LocationMapProps) {
  const latitude = parseFloat(etablissement.latitude);
  const longitude = parseFloat(etablissement.longitude);

  // Adapter les données pour GoogleMapComponent
  const mapEtablissement = {
    id: etablissement.id,
    nom_etablissement: etablissement.nom_etablissement,
    latitude: latitude,
    longitude: longitude,
    statut: etablissement.statut.libelle_type_statut_etab,
    systeme: etablissement.systeme.libelle_type_systeme,
    region: etablissement.localisation.region,
    prefecture: etablissement.localisation.prefecture,
  };

  if (isNaN(latitude) || isNaN(longitude)) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
          🗺️ Localisation
        </h2>
        <div className="flex items-center justify-center h-96 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
          <div className="text-center text-indigo-600">
            <p className="text-lg font-medium">Coordonnées non disponibles</p>
            <p className="text-sm opacity-75 mt-2">
              {etablissement.localisation.ville_village_quartier},{" "}
              {etablissement.localisation.prefecture}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
        🗺️ Localisation
      </h2>

      <div
        className="rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-lg"
        style={{ height: "400px" }}
      >
        <GoogleMapComponent etablissements={[mapEtablissement]} filters={{}} />
      </div>

    </div>
  );
}
