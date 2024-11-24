import { Ride } from "@/app/core/dtos/RideHistoryDto";
import React from "react";
export function RideCard(ride: Ride) {
  const date = new Date(ride.createdAt).toLocaleString("UTC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="bg-gray-200 h-64 rounded-lg flex flex-col items-center justify-center mb-4">
      <p className="text-gray-600">
        <strong>Data: </strong>
        {date}
      </p>
      <p className="text-gray-600">
        <strong>Motorista: </strong>
        {ride.driver.name}
      </p>
      <p className="text-gray-600">
        <strong>Origem: </strong> {ride.origin}
      </p>
      <p className="text-gray-600">
        <strong>Destino: </strong> {ride.destination}
      </p>
      <p className="text-gray-600">
        <strong>Distância: </strong>
        {ride.distance.toFixed(2)} km
      </p>
      <p className="text-gray-600">
        <strong>Tempo: </strong>
        {ride.duration}
      </p>
      <p className="text-gray-600">
        <strong>Valor: </strong> R${ride.value.toFixed(2)}
      </p>
    </div>
  );
}
