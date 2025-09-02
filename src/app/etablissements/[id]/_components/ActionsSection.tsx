"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Etablissement } from "../../_model/etablissement";

interface ActionsSectionProps {
  etablissement: Etablissement;
}

export default function ActionsSection({ etablissement }: ActionsSectionProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: etablissement.nom_etablissement,
          text: `Découvrez ${etablissement.nom_etablissement} sur EduMap`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Erreur lors du partage:", error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers!");
    }
  };

  const handleFavorite = () => {
    // Logique pour ajouter aux favoris
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFavorite = favorites.some(
      (fav: any) => fav.id === etablissement.id
    );

    if (isAlreadyFavorite) {
      const newFavorites = favorites.filter(
        (fav: any) => fav.id !== etablissement.id
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert("Retiré des favoris!");
    } else {
      favorites.push({
        id: etablissement.id,
        nom: etablissement.nom_etablissement,
        region: etablissement.localisation.region,
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Ajouté aux favoris!");
    }
  };

  const openInMaps = () => {
    const lat = parseFloat(etablissement.latitude);
    const lng = parseFloat(etablissement.longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation de retour */}
      <div className="flex items-center justify-between">
        <Link href="/etablissements">
          <Button
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 px-3 py-1">
            ID: {etablissement.id}
          </Badge>
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 px-3 py-1">
            Code: {etablissement.code_etablissement}
          </Badge>
        </div>
      </div>

      {/* Actions principales */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
          🎯 Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={handleFavorite}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 h-14 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            Favoris
          </Button>

          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-14 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Partager
          </Button>

          <Button
            onClick={openInMaps}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 h-14 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Voir sur Maps
          </Button>

          <Link href={`/etablissements/${etablissement.id}/contact`}>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white border-0 h-14 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg">
              <Phone className="h-5 w-5 mr-2" />
              Contact
            </Button>
          </Link>
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
          📋 Informations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">
                Localisation Administrative
              </h3>
              <div className="space-y-2 text-sm text-indigo-600">
                <p>
                  <strong>Région:</strong> {etablissement.localisation.region}
                </p>
                <p>
                  <strong>Préfecture:</strong>{" "}
                  {etablissement.localisation.prefecture}
                </p>
                <p>
                  <strong>Canton:</strong>{" "}
                  {etablissement.localisation.canton_village_autonome}
                </p>
                <p>
                  <strong>Commune:</strong>{" "}
                  {etablissement.localisation.commune_etab || "Non spécifiée"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">
                Caractéristiques
              </h3>
              <div className="space-y-2 text-sm text-indigo-600">
                <p>
                  <strong>Statut:</strong>{" "}
                  {etablissement.statut.libelle_type_statut_etab}
                </p>
                <p>
                  <strong>Système:</strong>{" "}
                  {etablissement.systeme.libelle_type_systeme}
                </p>
                <p>
                  <strong>Milieu:</strong>{" "}
                  {etablissement.milieu.libelle_type_milieu}
                </p>
                <p>
                  <strong>Année:</strong>{" "}
                  {etablissement.annee.libelle_type_annee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
