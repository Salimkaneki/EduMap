// app/etablissement/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Establishment } from '@/types/types';

// Import dynamique de la carte
const DynamicMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 flex items-center justify-center">
      Chargement de la carte...
    </div>
  ),
});

// Données d'exemple
const SAMPLE_DATA: Establishment[] = [
  {
    id: "1",
    nom_etablissement: "École Primaire Publique Lomé Centre",
    region: "Maritime",
    prefecture: "Golfe",
    ville_village_quartier: "Lomé",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Primaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.1319,
    LONGITUDE: 1.2228
  },
  {
    id: "2",
    nom_etablissement: "Lycée de Kpalimé",
    region: "Plateaux",
    prefecture: "Kloto",
    ville_village_quartier: "Kpalimé",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Secondaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.9009,
    LONGITUDE: 0.6279
  },
  {
    id: "3",
    nom_etablissement: "École Primaire Catholique Sainte Marie",
    region: "Maritime",
    prefecture: "Golfe",
    ville_village_quartier: "Lomé",
    libelle_type_statut_etab: "Privé Catholique",
    libelle_type_systeme: "Primaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 6.1365,
    LONGITUDE: 1.2103
  },
  {
    id: "4",
    nom_etablissement: "École Primaire Rurale de Davié",
    region: "Maritime",
    prefecture: "Zio",
    ville_village_quartier: "Davié",
    libelle_type_statut_etab: "Public",
    libelle_type_systeme: "Primaire",
    existe_elect: "NON",
    existe_latrine: "OUI",
    eau: "NON",
    acces_toute_saison: "NON",
    LATITUDE: 6.3833,
    LONGITUDE: 1.2000
  },
  {
    id: "5",
    nom_etablissement: "Collège Islamique de Sokodé",
    region: "Centrale",
    prefecture: "Tchaoudjo",
    ville_village_quartier: "Sokodé",
    libelle_type_statut_etab: "Privé Islamique",
    libelle_type_systeme: "Secondaire",
    existe_elect: "OUI",
    existe_latrine: "OUI",
    eau: "OUI",
    acces_toute_saison: "OUI",
    LATITUDE: 8.9833,
    LONGITUDE: 1.1333
  }
];

export default function EtablissementDetail() {
  const params = useParams();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstablishment = () => {
      setLoading(true);
      try {
        const found = SAMPLE_DATA.find(e => e.id === params.id);
        if (found) {
          setEstablishment(found);
          setError(null);
        } else {
          setError("Établissement non trouvé");
        }
      } catch {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishment();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px] bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !establishment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "Établissement non trouvé"}
            </h1>
            <Link 
              href="/"
              className="text-black hover:text-gray-600 underline"
            >
              Retourner à la page d&apos;accueil
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Bouton retour */}
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Retour à la carte
          </Link>

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {establishment.nom_etablissement}
            </h1>
            <p className="text-lg text-gray-600">
              {establishment.ville_village_quartier}, {establishment.prefecture}, {establishment.region}
            </p>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <DynamicMap establishments={[establishment]}filters={{
                searchTerm: '',
                region: '',
                prefecture: '',
                type: '',
                withElectricity: false,
                withWater: false,
                withLatrine: false,
                allSeasonAccess: false
                }}
               isLoading={false}/>
            </div>

            {/* Informations détaillées */}
            <div className="space-y-6">
              {/* Type d'établissement */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Type :</span>
                    <span className="ml-2">{establishment.libelle_type_statut_etab}</span>
                  </div>
                  <div>
                    <span className="font-medium">Système :</span>
                    <span className="ml-2">{establishment.libelle_type_systeme}</span>
                  </div>
                </div>
              </div>

              {/* Infrastructures */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Infrastructures</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${
                    establishment.existe_elect === 'OUI' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className="block font-medium">Électricité</span>
                    <span>{establishment.existe_elect === 'OUI' ? 'Disponible' : 'Non disponible'}</span>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    establishment.eau === 'OUI' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className="block font-medium">Eau</span>
                    <span>{establishment.eau === 'OUI' ? 'Disponible' : 'Non disponible'}</span>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    establishment.existe_latrine === 'OUI' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className="block font-medium">Latrines</span>
                    <span>{establishment.existe_latrine === 'OUI' ? 'Disponible' : 'Non disponible'}</span>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    establishment.acces_toute_saison === 'OUI' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className="block font-medium">Accès toute saison</span>
                    <span>{establishment.acces_toute_saison === 'OUI' ? 'Disponible' : 'Non disponible'}</span>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Localisation</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Latitude :</span>
                    <span className="ml-2">{establishment.LATITUDE}</span>
                  </div>
                  <div>
                    <span className="font-medium">Longitude :</span>
                    <span className="ml-2">{establishment.LONGITUDE}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}