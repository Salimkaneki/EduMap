"use client";

import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <Card className="p-16 text-center bg-white border-0 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Aucun établissement trouvé
        </h3>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons trouvé aucun établissement correspondant à vos
          critères de recherche. Essayez de modifier vos filtres ou
          réinitialisez la recherche.
        </p>
        <Button
          onClick={onReset}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Voir tous les établissements
        </Button>
      </div>
    </Card>
  );
}
