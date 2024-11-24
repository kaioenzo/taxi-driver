"use client";
import { Driver } from "@/app/core/dtos/RideEstimateDto";
import React from "react";
import { DriverCard } from "./DriverCard";

interface DriversListProps {
  drivers: Driver[];
  onSelectDriver: (driverId: string) => void;
  handleConfirmRide: () => void;
  selectedDriverId: string | null;
}

export function DriversList({
  drivers,
  onSelectDriver,
  selectedDriverId,
  handleConfirmRide,
}: DriversListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Motoristas Disponíveis</h2>
      {drivers.map((driver) => (
        <DriverCard
          key={driver._id}
          driver={driver}
          handleConfirmRide={handleConfirmRide}
          onSelect={() => onSelectDriver(driver._id)}
          isSelected={selectedDriverId === driver._id}
        />
      ))}
    </div>
  );
}
