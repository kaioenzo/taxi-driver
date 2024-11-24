"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RideHistory } from "../core/dtos/RideHistoryDto";
import { RideList } from "./components/RideList";

export default function HistoryPage() {
  const [rideEstimate, setRideEstimate] = useState<RideHistory | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const driverId = searchParams.get("driverId");
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    const getRideHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/ride/${customerId}${
            driverId === null ? "" : `?driver_id=${driverId}`
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get ride history");
        }

        const estimate: RideHistory = await response.json();
        setRideEstimate(estimate);
        setLoading(false);
      } catch (error) {
        console.error("Error estimating ride:", error);
        setLoading(false);
      }
    };
    getRideHistory();
  }, [customerId, driverId]);

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!rideEstimate) {
    return (
      <div className="text-center py-10">
        Houve um erro ao carregar seu histórido de viagens. Por favor tente
        novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Histórico de viagens</h1>
      <div>
        <RideList rides={rideEstimate.rides} />
      </div>
    </div>
  );
}
