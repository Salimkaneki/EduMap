"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation,
  Globe,
  Map,
  Compass,
  ExternalLink
} from "lucide-react";
import { Etablissement } from "../../_model/etablissement";

interface LocationMapProps {
  etablissement: Etablissement;
}

export default function LocationMap({ etablissement }: LocationMapProps) {
  const location = etablissement.localisation;
  const latitude = parseFloat(etablissement.latitude);
  const longitude = parseFloat(etablissement.longitude);

  const isValidCoordinates = !isNaN(latitude) && !isNaN(longitude) && 
                           latitude !== 0 && longitude !== 0;

  const googleMapsUrl = isValidCoordinates 
    ? `https://www.google.com/maps?q=${latitude},${longitude}` 
    : null;

  return (
    <div className="space-y-6">
      {/* Informations géographiques */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 text-red-600 mr-2" />
            Localisation
          </h3>
          {isValidCoordinates && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              Géolocalisé
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Adresse administrative */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Compass className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-3">Adresse administrative</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Région:</span>
                    <span className="font-medium text-gray-900">{location.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Préfecture:</span>
                    <span className="font-medium text-gray-900">{location.prefecture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Canton/Village:</span>
                    <span className="font-medium text-gray-900">{location.canton_village_autonome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ville/Quartier:</span>
                    <span className="font-medium text-gray-900">{location.ville_village_quartier}</span>
                  </div>
                  {location.commune_etab && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commune:</span>
                      <span className="font-medium text-gray-900">{location.commune_etab}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Coordonnées GPS */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Navigation className="h-5 w-5 text-green-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-3">Coordonnées GPS</h4>
                {isValidCoordinates ? (
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Latitude:</span>
                        <span className="font-mono text-sm font-medium">{latitude.toFixed(6)}°</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Longitude:</span>
                        <span className="font-mono text-sm font-medium">{longitude.toFixed(6)}°</span>
                      </div>
                    </div>
                    
                    {/* Actions de navigation */}
                    <div className="flex space-x-2">
                      {googleMapsUrl && (
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Google Maps
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Navigation className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Coordonnées GPS non disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>


    </div>
  );
}
