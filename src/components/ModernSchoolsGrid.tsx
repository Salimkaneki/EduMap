"use client";

import React, { useState, useEffect } from 'react';
import SchoolCard from './SchoolCard';
import { fetchEtablissements, type Etablissement } from '@/lib/actions';
import { School, AlertCircle, ChevronDown, Loader2, Sparkles } from 'lucide-react';

// Composant principal qui affiche la grille de cartes
const ModernSchoolsGrid = () => {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);

  // Animation d'entrée
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Récupérer les établissements
  useEffect(() => {
    const loadEtablissements = async () => {
      setLoading(true);
      try {
        const result = await fetchEtablissements(currentPage, 8);
        
        // Si c'est la première page, remplacer les établissements
        // Sinon, ajouter les nouveaux établissements à la suite des existants
        if (currentPage === 1) {
          setEtablissements(result.data);
        } else {
          setEtablissements(prevEtablissements => [...prevEtablissements, ...result.data]);
        }
        
        setTotalPages(Math.ceil(result.total / result.per_page));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion à l\'API';
        setError(errorMessage);
        console.error('Erreur lors du chargement des établissements:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEtablissements();
  }, [currentPage]);

  // Pour charger plus d'établissements
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2D55FB] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#1B3295] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#2D55FB] to-[#1B3295] rounded-full mix-blend-multiply filter blur-xl opacity-3 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* En-tête avec titre amélioré */}
        <div className={`mb-12 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-[#2D55FB] to-[#1B3295] p-3 rounded-2xl shadow-lg">
              <School className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Établissements{' '}
            <span className="bg-gradient-to-r from-[#2D55FB] to-[#1B3295] bg-clip-text text-transparent">
              scolaires
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez les établissements scolaires au Togo et leurs infrastructures. 
            Une sélection soigneusement organisée pour vous aider dans votre choix.
          </p>
        </div>
        
        {/* Message d'erreur avec style amélioré */}
        {error && (
          <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8 shadow-lg">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* État de chargement initial avec animation */}
        {loading && etablissements.length === 0 && (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2D55FB] border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des établissements...</p>
          </div>
        )}
        
        {/* Grille d'établissements avec animations */}
        {etablissements.length > 0 && (
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {etablissements.map((etablissement, index) => (
                <div 
                  key={etablissement.id}
                  className={`transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${Math.min(index * 100, 800)}ms` 
                  }}
                >
                  <SchoolCard etablissement={etablissement} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Message si aucun résultat avec style amélioré */}
        {!loading && etablissements.length === 0 && (
          <div className={`text-center py-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-[#2D55FB] to-[#1B3295] p-4 rounded-2xl w-fit mx-auto mb-6">
                <School className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun établissement trouvé</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous n&apos;avons trouvé aucun établissement correspondant à vos critères.
                Essayez d&apos;ajuster vos filtres de recherche.
              </p>
            </div>
          </div>
        )}
        
        {/* Bouton "Afficher plus" avec design premium */}
        {currentPage < totalPages && (
          <div className={`flex justify-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button 
              onClick={handleLoadMore}
              disabled={loading && currentPage > 1}
              className="group relative bg-white border border-gray-200 rounded-2xl px-8 py-4 text-gray-800 font-medium hover:shadow-xl transition-all duration-300 disabled:opacity-70 transform hover:scale-105 shadow-lg"
            >
              {/* Effet de dégradé au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2D55FB] to-[#1B3295] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center">
                {loading && currentPage > 1 ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin text-[#2D55FB]" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3 text-[#2D55FB] group-hover:text-[#1B3295] transition-colors" />
                    <span>Afficher plus d&apos;établissements</span>
                    <ChevronDown className="w-5 h-5 ml-3 text-gray-500 group-hover:text-[#1B3295] transition-colors group-hover:translate-y-1 transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </div>
        )}

        {/* Indicateur de progression */}
        {totalPages > 1 && (
          <div className={`mt-12 text-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </span>
              <div className="flex space-x-1">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i < currentPage ? 'bg-gradient-to-r from-[#2D55FB] to-[#1B3295]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );   
};

export default ModernSchoolsGrid;