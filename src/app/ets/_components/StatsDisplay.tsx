"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, BarChart3 } from "lucide-react";

interface StatsDisplayProps {
  totalEtablissements: number;
  totalResults?: number;
  isFiltered?: boolean;
}

export default function StatsDisplay({
  totalEtablissements,
  totalResults,
  isFiltered = false,
}: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {isFiltered && totalResults !== undefined
                  ? totalResults
                  : totalEtablissements}
              </p>
              <p className="text-sm text-gray-600">
                {isFiltered ? "Résultats trouvés" : "Établissements total"}
              </p>
              {isFiltered && totalResults !== totalEtablissements && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  sur {totalEtablissements.toLocaleString()} total
                </Badge>
              )}
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-600">Régions couvertes</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">39</p>
              <p className="text-sm text-gray-600">Préfectures</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
