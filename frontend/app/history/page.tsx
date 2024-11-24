"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RideHistory } from "../core/dtos/RideHistoryDto";
import { RideList } from "./components/RideList";
import { RideHistoryForm } from "./components/RideHistoryForm";
import { useSnackbar } from "@/components/shared/SnackBarContext";

export default function HistoryPage() {
  const [rideEstimate, setRideEstimate] = useState<RideHistory | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const showSnackbar = useSnackbar();

  const driverId = searchParams.get("driverId");
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    const getRideHistory = async () => {
      if (!customerId) {
        setLoading(false);
        return;
      }

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
          showSnackbar("Erro ao obter histórico de viagens", "error");
          return;
        }

        const estimate: RideHistory = await response.json();
        setRideEstimate(estimate);
        setLoading(false);
        showSnackbar("Histórico de viagens obtido com sucesso!", "info");
      } catch (error) {
        console.error("Error estimating ride:", error);
        setLoading(false);
        showSnackbar("Erro ao obter histórico de viagens", "error");
      }
    };
    getRideHistory();
  }, [customerId, driverId, showSnackbar]);

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Histórico de viagens
      </h1>
      <div>
        <RideHistoryForm />
        {rideEstimate && <RideList rides={rideEstimate.rides} />}
      </div>
    </div>
  );
}
