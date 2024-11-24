import React from "react";

interface RideMapProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

export function RideMap({ origin, destination }: RideMapProps) {
  return (
    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
      <p className="text-gray-600">
        Mostrando rota para {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)} to{" "}
        {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
      </p>
    </div>
  );
}
