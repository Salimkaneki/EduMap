"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MapEtablissement, SearchFilters } from "../_model/etablissement";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, X, Navigation, Maximize2 } from "lucide-react";
import Pagination from "./Pagination";

interface GoogleMapProps {
  etablissements: MapEtablissement[];
  filters: SearchFilters;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onEtablissementSelect?: (etablissement: MapEtablissement) => void;
  onPageChange?: (page: number) => void;
  className?: string;
}

// Composant Map interne
interface MapComponentProps extends GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  etablissements,
  filters,
  onEtablissementSelect,
  center,
  zoom,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);
  const [selectedEtab, setSelectedEtab] = useState<MapEtablissement | null>(
    null
  );

  // Filtrer les établissements selon les filtres actifs
  const filteredEtablissements = etablissements.filter((etab) => {
    if (filters.region && etab.region !== filters.region) return false;
    if (filters.prefecture && etab.prefecture !== filters.prefecture)
      return false;
    if (
      filters.libelle_type_statut_etab &&
      etab.statut !== filters.libelle_type_statut_etab
    )
      return false;
    if (
      filters.libelle_type_systeme &&
      etab.systeme !== filters.libelle_type_systeme
    )
      return false;
    if (
      filters.nom_etablissement &&
      !etab.nom_etablissement
        .toLowerCase()
        .includes(filters.nom_etablissement.toLowerCase())
    )
      return false;
    return true;
  });

  // Couleurs selon le statut
  const getMarkerColor = (statut: string) => {
    switch (statut) {
      case "Public":
        return "#10b981"; // Green
      case "Privé Laïc":
        return "#3b82f6"; // Blue
      case "Privé Catholique":
        return "#8b5cf6"; // Purple
      case "Privé Protestant":
        return "#f59e0b"; // Orange
      case "Privé Islamique":
        return "#06b6d4"; // Cyan
      case "Communautaire":
        return "#ef4444"; // Red
      default:
        return "#6b7280"; // Gray
    }
  };

  // Initialisation de la carte
  useEffect(() => {
    if (mapRef.current && !map.current) {
      map.current = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }],
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#eeeeee" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7b7b7b" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#c8d7d4" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#070707" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      });

      infoWindow.current = new google.maps.InfoWindow();
    }
  }, [center, zoom]);

  // Mise à jour des marqueurs
  useEffect(() => {
    if (!map.current) return;

    // Supprimer les anciens marqueurs
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    // Ajouter les nouveaux marqueurs
    filteredEtablissements.forEach((etab) => {
      const marker = new google.maps.Marker({
        position: { lat: etab.latitude, lng: etab.longitude },
        map: map.current,
        title: etab.nom_etablissement,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: getMarkerColor(etab.statut),
          fillOpacity: 0.8,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
        },
      });

      marker.addListener("click", () => {
        setSelectedEtab(etab);
        onEtablissementSelect?.(etab);
      });

      markers.current.push(marker);
    });

    // Ajuster la vue pour inclure tous les marqueurs
    if (filteredEtablissements.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      filteredEtablissements.forEach((etab) => {
        bounds.extend({ lat: etab.latitude, lng: etab.longitude });
      });
      map.current.fitBounds(bounds);
    }
  }, [filteredEtablissements, onEtablissementSelect]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full rounded-lg" />

      {/* Contrôles personnalisés */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white shadow-lg"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                map.current?.setCenter(pos);
                map.current?.setZoom(12);
              });
            }
          }}
        >
          <Navigation className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="bg-white shadow-lg"
          onClick={() => {
            // Centrer sur le Togo
            map.current?.setCenter({ lat: 8.6195, lng: 0.8248 });
            map.current?.setZoom(7);
          }}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Compteur d'établissements */}
      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-900">
              {filteredEtablissements.length}
            </span>
            <span className="text-gray-600 text-sm">établissement(s)</span>
          </div>
        </div>
      </div>

      {/* Légende moderne */}
      <Card className="absolute bottom-4 left-4 max-w-xs shadow-lg">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            Types d&apos;établissements
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: "Public", color: "#10b981" },
              { label: "Privé Laïc", color: "#3b82f6" },
              { label: "Privé Catholique", color: "#8b5cf6" },
              { label: "Privé Protestant", color: "#f59e0b" },
              { label: "Privé Islamique", color: "#06b6d4" },
              { label: "Communautaire", color: "#ef4444" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popup d'établissement sélectionné */}
      {selectedEtab && (
        <Card className="absolute bottom-4 right-4 w-80 shadow-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {selectedEtab.nom_etablissement}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedEtab(null)}
                className="p-1 h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedEtab.region}, {selectedEtab.prefecture}
                </span>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {selectedEtab.statut}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {selectedEtab.systeme}
                </Badge>
              </div>

              <Button
                className="w-full"
                onClick={() => onEtablissementSelect?.(selectedEtab)}
              >
                Voir les détails
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Composant de rendu des erreurs
const Render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-600">
              Impossible de charger Google Maps. Vérifiez votre connexion.
            </p>
          </div>
        </div>
      );
    default:
      return <div>Chargement...</div>;
  }
};

// Composant principal
const GoogleMapComponent: React.FC<GoogleMapProps> = (props) => {
  const center = { lat: 8.6195, lng: 0.8248 }; // Centre du Togo
  const zoom = 7;

  return (
    <div className={`h-full w-full flex flex-col ${props.className || ""}`}>
      <div className="flex-1">
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          render={Render}
        >
          <MapComponent {...props} center={center} zoom={zoom} />
        </Wrapper>
      </div>

      {/* Pagination pour la carte */}
      {props.pagination &&
        props.onPageChange &&
        props.pagination.last_page > 1 && (
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">
                Page {props.pagination.current_page} sur{" "}
                {props.pagination.last_page} • Affichage de{" "}
                {props.etablissements.length} établissement(s) sur{" "}
                {props.pagination.total}
              </p>
            </div>
            <Pagination
              currentPage={props.pagination.current_page}
              totalPages={props.pagination.last_page}
              onPageChange={props.onPageChange}
              isLoading={false}
            />
          </div>
        )}
    </div>
  );
};

export default GoogleMapComponent;
