"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Etablissement } from "../_model/etablissement";
import { getEtablissementById } from "../_services/etablissementService";

// Composants modulaires
import HeroSection from "./_components/HeroSection";
import SchoolStats from "./_components/SchoolStats";
import InfrastructureEquipment from "./_components/InfrastructureEquipment";
import LocationMap from "./_components/LocationMap";
import ActionsSection from "./_components/ActionsSection";

export default function EtablissementDetailPage() {
  const params = useParams();
  const [etablissement, setEtablissement] = useState<Etablissement | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEtablissement = async () => {
      try {
        setLoading(true);
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!id) {
          setError("ID d'établissement manquant");
          return;
        }
        const data = await getEtablissementById(parseInt(id));
        setEtablissement(data);
      } catch (err) {
        setError("Impossible de charger les détails de l'établissement");
        console.error("Erreur lors du chargement:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEtablissement();
    }
  }, [params.id]);

  // Calculs pour les stats
  const getTotalStats = () => {
    if (!etablissement)
      return { totalEleves: 0, totalEnseignants: 0, totalSalles: 0 };

    const totalEleves = etablissement.effectif?.tot || 0;
    const totalEnseignants = etablissement.effectif?.total_ense || 0;
    const totalSalles =
      (etablissement.infrastructure?.sommedenb_salles_classes_dur || 0) +
      (etablissement.infrastructure?.sommedenb_salles_classes_banco || 0) +
      (etablissement.infrastructure?.sommedenb_salles_classes_autre || 0);

    return { totalEleves, totalEnseignants, totalSalles };
  };

  const getInfrastructureScore = () => {
    if (!etablissement?.infrastructure) return 0;

    const { totalSalles } = getTotalStats();
    if (totalSalles === 0) return 0;
    if (totalSalles >= 10) return 3;
    if (totalSalles >= 5) return 2;
    return 1;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
            <p className="text-indigo-600 text-lg font-medium">
              Chargement des détails...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !etablissement) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-4">
            <div className="text-red-500 text-6xl">❌</div>
            <h1 className="text-2xl font-bold text-gray-800">
              Établissement introuvable
            </h1>
            <p className="text-gray-600">
              {error ||
                "L'établissement demandé n'existe pas ou a été supprimé."}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { totalEleves, totalEnseignants, totalSalles } = getTotalStats();
  const infrastructureScore = getInfrastructureScore();

  return (
    <>
      <Header />

      {/* Background avec motif */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M50 50c13.8 0 25-11.2 25-25S63.8 0 50 0 25 11.2 25 25s11.2 25 25 25zm25 0c0-13.8 11.2-25 25-25s25 11.2 25 25-11.2 25-25 25-25-11.2-25-25z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative container mx-auto px-4 py-12 space-y-12">
          {/* Section Hero */}
          <HeroSection
            etablissement={etablissement}
            totalEleves={totalEleves}
            totalEnseignants={totalEnseignants}
            totalSalles={totalSalles}
            infrastructureScore={infrastructureScore}
          />

          {/* Grille principale */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="xl:col-span-2 space-y-8">
              {/* Statistiques détaillées */}
              <SchoolStats etablissement={etablissement} />

              {/* Infrastructure et équipements */}
              <InfrastructureEquipment etablissement={etablissement} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Carte de localisation */}
              <LocationMap etablissement={etablissement} />

              {/* Actions */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
