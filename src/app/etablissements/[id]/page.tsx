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

    const totalEleves =
      etablissement.effectif?.sommedenb_eff_f +
        etablissement.effectif?.sommedenb_eff_g|| 0;
    const totalEnseignants = etablissement.effectif?.sommedenb_ens_f + etablissement.effectif?.sommedenb_ens_h || 0;
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-gray-900 mx-auto"></div>
            <p className="text-gray-600 text-lg font-medium">
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-4">
            <div className="text-gray-400 text-6xl">❌</div>
            <h1 className="text-2xl font-bold text-gray-900">
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

      {/* Background simple et épuré */}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Section Hero */}
          <HeroSection
            etablissement={etablissement}
            totalEleves={totalEleves}
            totalEnseignants={totalEnseignants}
            totalSalles={totalSalles}
            infrastructureScore={infrastructureScore}
          />

          {/* Grille principale */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="xl:col-span-2 space-y-6">
              {/* Statistiques détaillées */}
              <SchoolStats etablissement={etablissement} />

              {/* Infrastructure et équipements */}
              <InfrastructureEquipment etablissement={etablissement} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
