import { Ride } from "@/app/core/dtos/RideHistoryDto";
import React from "react";
import { RideCard } from "./RideCard";
export function RideList({ rides }: { rides: Ride[] }) {
  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <RideCard {...ride} key={ride._id} />
      ))}
    </div>
  );
}
