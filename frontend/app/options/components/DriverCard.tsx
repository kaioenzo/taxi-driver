import { Driver } from "@/app/core/dtos/RideEstimateDto";
import React from "react";

interface DriverCardProps {
  driver: Driver;
  onSelect: () => void;
  handleConfirmRide: () => void;
  isSelected: boolean;
}

export function DriverCard({
  driver,
  onSelect,
  isSelected,
  handleConfirmRide,
}: DriverCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{driver.name}</h3>
          <p className="text-sm text-gray-600">{driver.vehicle}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">R${driver.value.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            min. {driver.minimumDistance} km
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm">{driver.description}</p>
      <div className="mt-2 flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span>{driver.review.rating.toFixed(1)}</span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-sm text-gray-600 italic">
          &quot;{driver.review.comment}&quot;
        </span>
      </div>
      <button
        onClick={handleConfirmRide}
        disabled={!isSelected}
        className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Escolher
      </button>
    </div>
  );
}
