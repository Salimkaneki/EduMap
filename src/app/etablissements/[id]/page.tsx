// app/etablissement/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  MapPin,
  Building,
  Users,
  GraduationCap,
  Zap,
  Droplets,
  Home,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Share2,
  Eye,
  MapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Etablissement } from "../_model/etablissement";
import { getEtablissementById } from "../_services/etablissementService";

// Composant de carte dynamique
const DynamicGoogleMap = dynamic(
  () => import("../_components/GoogleMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

export default function EtablissementDetail() {
  const params = useParams();
  const router = useRouter();
  const [etablissement, setEtablissement] = useState<Etablissement | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEtablissement = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const data = await getEtablissementById(Number(params.id));
        setEtablissement(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEtablissement();
  }, [params.id]);

  const getStatutColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case "public":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "privé laïc":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  const getSystemeColor = (systeme: string) => {
    switch (systeme.toLowerCase()) {
      case "prescolaire":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "primaire":
        return "bg-green-100 text-green-800 border-green-200";
      case "secondaire i":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "secondaire ii":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-200 rounded-md w-32"></div>

            {/* Title skeleton */}
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !etablissement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {error || "Établissement non trouvé"}
            </h1>
            <p className="text-gray-600 mb-6">
              L'établissement demandé n'existe pas ou n'est plus disponible.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Link href="/etablissements">
                <Button className="w-full">Voir tous les établissements</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalEleves =
    etablissement.effectif.sommedenb_eff_g +
    etablissement.effectif.sommedenb_eff_f;
  const totalEnseignants =
    etablissement.effectif.sommedenb_ens_h +
    etablissement.effectif.sommedenb_ens_f;
  const totalSalles =
    etablissement.infrastructure.sommedenb_salles_classes_dur +
    etablissement.infrastructure.sommedenb_salles_classes_banco +
    etablissement.infrastructure.sommedenb_salles_classes_autre;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Ajouter aux favoris
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {etablissement.nom_etablissement}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge
                className={getStatutColor(
                  etablissement.statut.libelle_type_statut_etab
                )}
              >
                {etablissement.statut.libelle_type_statut_etab}
              </Badge>
              <Badge
                className={getSystemeColor(
                  etablissement.systeme.libelle_type_systeme
                )}
              >
                {etablissement.systeme.libelle_type_systeme}
              </Badge>
            </div>
          </div>

          <div className="flex items-center text-gray-600 text-lg">
            <MapPin className="h-5 w-5 mr-2" />
            {etablissement.localisation.ville_village_quartier},{" "}
            {etablissement.localisation.prefecture},{" "}
            {etablissement.localisation.region}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] rounded-b-lg overflow-hidden">
                  <DynamicGoogleMap
                    etablissements={[
                      {
                        id: etablissement.id,
                        nom_etablissement: etablissement.nom_etablissement,
                        latitude: parseFloat(etablissement.latitude),
                        longitude: parseFloat(etablissement.longitude),
                        statut: etablissement.statut.libelle_type_statut_etab,
                        systeme: etablissement.systeme.libelle_type_systeme,
                        region: etablissement.localisation.region,
                        prefecture: etablissement.localisation.prefecture,
                      },
                    ]}
                    filters={{}}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Effectifs et Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Effectifs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Effectifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {etablissement.effectif.sommedenb_eff_g}
                      </div>
                      <div className="text-sm text-gray-600">Garçons</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">
                        {etablissement.effectif.sommedenb_eff_f}
                      </div>
                      <div className="text-sm text-gray-600">Filles</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-3xl font-bold text-green-600">
                      {totalEleves}
                    </div>
                    <div className="text-sm text-gray-600">Total élèves</div>
                  </div>
                </CardContent>
              </Card>

              {/* Enseignants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Enseignants
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {etablissement.effectif.sommedenb_ens_h}
                      </div>
                      <div className="text-sm text-gray-600">Hommes</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">
                        {etablissement.effectif.sommedenb_ens_f}
                      </div>
                      <div className="text-sm text-gray-600">Femmes</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-3xl font-bold text-green-600">
                      {totalEnseignants}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total enseignants
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Informations rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Aperçu rapide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      {totalEleves}
                    </div>
                    <div className="text-xs text-gray-600">Élèves</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {totalEnseignants}
                    </div>
                    <div className="text-xs text-gray-600">Enseignants</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">
                      {totalSalles}
                    </div>
                    <div className="text-xs text-gray-600">Salles</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">
                      {etablissement.milieu.libelle_type_milieu}
                    </div>
                    <div className="text-xs text-gray-600">Milieu</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infrastructures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Infrastructures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Salles durables</span>
                    <span className="font-bold text-blue-600">
                      {
                        etablissement.infrastructure
                          .sommedenb_salles_classes_dur
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Salles banco</span>
                    <span className="font-bold text-orange-600">
                      {
                        etablissement.infrastructure
                          .sommedenb_salles_classes_banco
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Autres salles</span>
                    <span className="font-bold text-gray-600">
                      {
                        etablissement.infrastructure
                          .sommedenb_salles_classes_autre
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Équipements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Équipements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      etablissement.equipement.existe_elect
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>Électricité</span>
                    </div>
                    {etablissement.equipement.existe_elect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      etablissement.equipement.eau
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      <span>Eau potable</span>
                    </div>
                    {etablissement.equipement.eau ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      etablissement.equipement.existe_latrine
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Latrines</span>
                    </div>
                    {etablissement.equipement.existe_latrine ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      etablissement.equipement.acces_toute_saison
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Accès toute saison</span>
                    </div>
                    {etablissement.equipement.acces_toute_saison ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Link href="/etablissements" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Building className="h-4 w-4 mr-2" />
                      Voir tous les établissements
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const lat = parseFloat(etablissement.latitude);
                      const lng = parseFloat(etablissement.longitude);
                      window.open(
                        `https://www.google.com/maps?q=${lat},${lng}`,
                        "_blank"
                      );
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Ouvrir dans Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
