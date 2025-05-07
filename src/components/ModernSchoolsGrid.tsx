"use client";

import React, { useState, useEffect } from 'react';
import SchoolCard from './SchoolCard';
import { fetchEtablissements, type Etablissement } from '@/lib/actions';

// Composant principal qui affiche la grille de cartes
const ModernSchoolsGrid = () => {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec titre */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Établissements scolaires</h2>
          <p className="text-gray-600 mt-2">
            Découvrez les établissements scolaires au Togo et leurs infrastructures
          </p>
        </div>
        
        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* État de chargement initial */}
        {loading && etablissements.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Grille d'établissements */}
        {etablissements.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {etablissements.map(etablissement => (
              <SchoolCard key={etablissement.id} etablissement={etablissement} />
            ))}
          </div>
        )}
        
        {/* Message si aucun résultat */}
        {!loading && etablissements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Aucun établissement trouvé</p>
          </div>
        )}
        
        {/* Bouton "Afficher plus" avec indicateur de chargement */}
        {currentPage < totalPages && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={handleLoadMore}
              disabled={loading && currentPage > 1}
              className="flex items-center bg-white border border-gray-300 rounded-full px-6 py-3 text-gray-800 font-medium hover:shadow-md transition-shadow disabled:opacity-70"
            >
              {loading && currentPage > 1 ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  Chargement...
                </>
              ) : (
                <>
                  Afficher plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );   
};

export default ModernSchoolsGrid;