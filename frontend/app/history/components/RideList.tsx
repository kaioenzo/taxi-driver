import { Ride } from "@/app/core/dtos/RideHistoryDto";
import React from "react";
import { RideCard } from "./RideCard";
export function RideList({ rides }: { rides: Ride[] }) {
  return (
    <div className="space-y-4 mt-5">
      <h3 className="text-center">Mostrando {rides.length} corridas</h3>
      {rides.map((ride) => (
        <RideCard {...ride} key={ride._id} />
      ))}
    </div>
  );
}
