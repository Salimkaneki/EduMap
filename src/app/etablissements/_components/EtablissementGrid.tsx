"use client";

import ModernEtablissementCard from "./ModernEtablissementCard";
import Pagination from "./Pagination";
import { Etablissement } from "../_model/etablissement";

interface EtablissementGridProps {
  etablissements: Etablissement[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onViewDetails: (id: number) => void;
  onViewOnMap: (lat: number, lng: number) => void;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function EtablissementGrid({
  etablissements,
  pagination,
  onViewDetails,
  onViewOnMap,
  onPageChange,
  isLoading,
}: EtablissementGridProps) {
  return (
    <>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {etablissements.map((etablissement) => (
          <ModernEtablissementCard
            key={etablissement.id}
            etablissement={etablissement}
            onViewDetails={onViewDetails}
            onViewOnMap={onViewOnMap}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
