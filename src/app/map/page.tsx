"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Types
interface Establishment {
  id: string;
  nom_etablissement: string;
  region: string;
  prefecture: string;
  ville_village_quartier: string;
  libelle_type_statut_etab: string;
  libelle_type_systeme: string;
  existe_elect: 'OUI' | 'NON';
  existe_latrine: 'OUI' | 'NON';
  eau: 'OUI' | 'NON';
  acces_toute_saison: 'OUI' | 'NON';
  LATITUDE: number;
  LONGITUDE: number;
}

interface MapFilters {
  searchTerm: string;
  region: string;
  prefecture: string;
  type: string;
  withElectricity: boolean;
  withWater: boolean;
  withLatrine: boolean;
  allSeasonAccess: boolean;
}

// Import dynamique pour éviter les problèmes SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/map/SimpleMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Chargement de la carte...</p>
      </div>
    </div>
  ),
});

// Page principale de la carte
export default function MapPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MapFilters>({
    searchTerm: '',
    region: '',
    prefecture: '',
    type: '',
    withElectricity: false,
    withWater: false,
    withLatrine: false,
    allSeasonAccess: false
  });

  // Récupération des données depuis l'API
  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://edumap.edufyplus.com/api/etablissements/map');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Vérifier la structure des données et les nettoyer si nécessaire
        const processedData = Array.isArray(data) ? data : data.data || [];
        
        // Filtrer les établissements avec des coordonnées valides
        const validEstablishments = processedData.filter((item: any) => 
          (item.LATITUDE || item.latitude) && 
          (item.LONGITUDE || item.longitude) && 
          !isNaN(parseFloat(item.LATITUDE || item.latitude)) && 
          !isNaN(parseFloat(item.LONGITUDE || item.longitude))
        ).map((item: any) => ({
          ...item,
          id: item.id || item.code_etablissement || Math.random().toString(36).substr(2, 9),
          LATITUDE: parseFloat(item.LATITUDE || item.latitude),
          LONGITUDE: parseFloat(item.LONGITUDE || item.longitude)
        }));
        
        setEstablishments(validEstablishments);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishments();
  }, []);
  
  // Fonction pour mettre à jour un filtre spécifique
  const updateFilter = (key: keyof MapFilters, value: boolean | string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      region: '',
      prefecture: '',
      type: '',
      withElectricity: false,
      withWater: false,
      withLatrine: false,
      allSeasonAccess: false
    });
  };

  // Calculer le nombre d'établissements filtrés
  const filteredEstablishments = establishments.filter(establishment => {
    if (filters.withElectricity && establishment.existe_elect !== 'OUI') return false;
    if (filters.withWater && establishment.eau !== 'OUI') return false;
    if (filters.withLatrine && establishment.existe_latrine !== 'OUI') return false;
    if (filters.allSeasonAccess && establishment.acces_toute_saison !== 'OUI') return false;
    if (filters.region && establishment.region !== filters.region) return false;
    if (filters.prefecture && establishment.prefecture !== filters.prefecture) return false;
    if (filters.type && establishment.libelle_type_statut_etab !== filters.type) return false;
    if (filters.searchTerm && 
        !establishment.nom_etablissement.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !establishment.ville_village_quartier.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });

  // Extraire les valeurs uniques pour les filtres
  const uniqueRegions = [...new Set(establishments.map(e => e.region))].filter(Boolean).sort();
  const uniquePrefectures = [...new Set(establishments.map(e => e.prefecture))].filter(Boolean).sort();
  const uniqueTypes = [...new Set(establishments.map(e => e.libelle_type_statut_etab))].filter(Boolean).sort();

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Chargement des données...</h2>
          <p className="text-gray-500 mt-2">Récupération des établissements scolaires</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* En-tête de la page */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Carte des établissements scolaires</h1>
          <p className="text-gray-600 mt-2">
            Explorez les établissements scolaires du Togo et leurs infrastructures
          </p>
        </div>
        
        {/* Panneau de filtres */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Réinitialiser
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Filtres par infrastructure */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-3">Infrastructures</h3>
              <div className="space-y-2">
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    checked={filters.withElectricity}
                    onChange={(e) => updateFilter('withElectricity', e.target.checked)}
                  />
                  <span>Avec électricité</span>
                </label>
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    checked={filters.withWater}
                    onChange={(e) => updateFilter('withWater', e.target.checked)}
                  />
                  <span>Avec eau potable</span>
                </label>
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    checked={filters.withLatrine}
                    onChange={(e) => updateFilter('withLatrine', e.target.checked)}
                  />
                  <span>Avec latrines</span>
                </label>
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    checked={filters.allSeasonAccess}
                    onChange={(e) => updateFilter('allSeasonAccess', e.target.checked)}
                  />
                  <span>Accès toute saison</span>
                </label>
              </div>
            </div>

            {/* Filtre par région */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-3">Région</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.region}
                onChange={(e) => updateFilter('region', e.target.value)}
              >
                <option value="">Toutes les régions</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Filtre par préfecture */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-3">Préfecture</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.prefecture}
                onChange={(e) => updateFilter('prefecture', e.target.value)}
              >
                <option value="">Toutes les préfectures</option>
                {uniquePrefectures.map(prefecture => (
                  <option key={prefecture} value={prefecture}>{prefecture}</option>
                ))}
              </select>
            </div>

            {/* Filtre par type d'établissement */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-3">Type d'établissement</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
              >
                <option value="">Tous les types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Recherche textuelle */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-3">Recherche</h3>
              <input
                type="text"
                placeholder="Nom ou localité..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Informations sur les résultats */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-4">
            <p className="text-gray-700 font-medium">
              {filteredEstablishments.length === establishments.length ? (
                `${establishments.length} établissements`
              ) : (
                `${filteredEstablishments.length} sur ${establishments.length} établissements`
              )}
            </p>
          </div>
          
          {/* Légende compacte */}
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-gray-600 font-medium">Légende :</span>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-gray-600">Complet</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span className="text-gray-600">Partiel</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-gray-600">Limité</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-gray-600">Autre</span>
            </div>
          </div>
        </div>
        
        {/* Carte interactive */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <DynamicMap 
            establishments={establishments}
            filters={filters}
          />
        </div>

        {/* Section d'aide */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instructions d'utilisation */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <span className="mr-2">ℹ️</span>
              Comment utiliser la carte
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Recherche :</strong> Utilisez la barre de recherche sur la carte ou les filtres ci-dessus</p>
              <p><strong>Navigation :</strong> Molette pour zoomer, cliquer-glisser pour se déplacer</p>
              <p><strong>Détails :</strong> Cliquez sur un marqueur pour voir les informations détaillées</p>
              <p><strong>Filtres :</strong> Combinez plusieurs critères pour affiner votre recherche</p>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-3 flex items-center">
              <span className="mr-2">📊</span>
              Aperçu des infrastructures
            </h3>
            <div className="text-sm text-green-800 space-y-2">
              <p><strong>Électricité :</strong> {establishments.length > 0 ? Math.round((establishments.filter(e => e.existe_elect === 'OUI').length / establishments.length) * 100) : 0}% des établissements</p>
              <p><strong>Eau potable :</strong> {establishments.length > 0 ? Math.round((establishments.filter(e => e.eau === 'OUI').length / establishments.length) * 100) : 0}% des établissements</p>
              <p><strong>Latrines :</strong> {establishments.length > 0 ? Math.round((establishments.filter(e => e.existe_latrine === 'OUI').length / establishments.length) * 100) : 0}% des établissements</p>
              <p><strong>Accès permanent :</strong> {establishments.length > 0 ? Math.round((establishments.filter(e => e.acces_toute_saison === 'OUI').length / establishments.length) * 100) : 0}% des établissements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}