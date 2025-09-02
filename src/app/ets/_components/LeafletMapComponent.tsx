"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapEtablissement } from "../_model/etablissement";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Configuration des icônes Leaflet
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
    className: "custom-marker",
  });
};

const getIconByStatut = (statut: string) => {
  switch (statut) {
    case "Public":
      return createCustomIcon("#10b981"); // Green
    case "Privé Laïc":
      return createCustomIcon("#3b82f6"); // Blue
    case "Privé Catholique":
      return createCustomIcon("#8b5cf6"); // Purple
    case "Privé Protestant":
      return createCustomIcon("#f59e0b"); // Orange
    case "Privé Islamique":
      return createCustomIcon("#06b6d4"); // Cyan
    case "Communautaire":
      return createCustomIcon("#ef4444"); // Red
    default:
      return createCustomIcon("#6b7280"); // Gray
  }
};

interface LeafletMapProps {
  etablissements: MapEtablissement[];
  onMarkerClick: (etablissement: MapEtablissement) => void;
}

// Composant pour recentrer la carte
function MapUpdater({
  etablissements,
}: {
  etablissements: MapEtablissement[];
}) {
  const map = useMap();

  useEffect(() => {
    if (etablissements.length > 0) {
      const group = new L.featureGroup(
        etablissements.map((etab) => L.marker([etab.latitude, etab.longitude]))
      );
      map.fitBounds(group.getBounds(), { padding: [20, 20] });
    } else {
      // Vue par défaut centrée sur le Togo
      map.setView([8.6195, 0.8248], 7);
    }
  }, [etablissements, map]);

  return null;
}

export default function LeafletMapComponent({
  etablissements,
  onMarkerClick,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={[8.6195, 0.8248]} // Centre du Togo
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg overflow-hidden"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MapUpdater etablissements={etablissements} />

      {etablissements.map((etablissement) => (
        <Marker
          key={etablissement.id}
          position={[etablissement.latitude, etablissement.longitude]}
          icon={getIconByStatut(etablissement.statut)}
          eventHandlers={{
            click: () => onMarkerClick(etablissement),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[250px]">
              <h3 className="font-semibold text-sm mb-2 text-gray-900">
                {etablissement.nom_etablissement}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-600">
                    {etablissement.region}, {etablissement.prefecture}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {etablissement.statut}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {etablissement.systeme}
                  </Badge>
                </div>

                <button
                  onClick={() => onMarkerClick(etablissement)}
                  className="w-full mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
