import React from "react";

interface RideSummaryProps {
  distance: number;
  duration: string;
}

export function RideSummary({ distance, duration }: RideSummaryProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Resumo</h2>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">Distancia</p>
          <p className="text-lg font-semibold">{distance.toFixed(2)} km</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Duração estimada</p>
          <p className="text-lg font-semibold">{duration}</p>
        </div>
      </div>
    </div>
  );
}
