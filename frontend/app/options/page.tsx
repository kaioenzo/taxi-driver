"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RideEstimate } from "../core/dtos/RideEstimateDto";
import { RideMap } from "./components/RideMap";
import { RideSummary } from "./components/RideSummary";
import { DriversList } from "./components/DriverList";

export default function OptionsPage() {
  const searchParams = useSearchParams();
  const [rideEstimate, setRideEstimate] = useState<RideEstimate | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const router = useRouter();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    const estimateRide = async () => {
      try {
        const data = { origin, destination, customer_id: customerId };
        const response = await fetch("http://localhost:3000/ride/estimate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to get ride estimate");
        }

        const estimate: RideEstimate = await response.json();
        setRideEstimate(estimate);
        setLoading(false);
      } catch (error) {
        console.error("Error estimating ride:", error);
        setLoading(false);
      }
    };
    estimateRide();
  }, [origin, destination, customerId]);

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriverId(driverId);
  };

  const handleConfirmRide = async () => {
    if (!selectedDriverId || !rideEstimate) return;

    try {
      const driver = rideEstimate.options.find(
        (driver) => driver._id === selectedDriverId
      );
      if (!driver) throw new Error("Driver not found");

      const response = await fetch("http://localhost:3000/ride/confirm", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          destination,
          driver: {
            id: selectedDriverId,
            name: driver.name,
          },
          distance: rideEstimate.distance,
          value: driver.value,
          duration: rideEstimate.duration,
          customer_id: customerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm ride");
      }

      router.push("/history?customerId=" + customerId);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!rideEstimate) {
    return (
      <div className="text-center py-10">
        Houve um erro ao estimar sua viagem. Por favor tente novamente mais
        tarde.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Escolha sua viagem</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <RideMap
            origin={rideEstimate.origin}
            destination={rideEstimate.destination}
          />
          <RideSummary
            distance={rideEstimate.distance}
            duration={rideEstimate.duration}
          />
        </div>
        <div>
          <DriversList
            drivers={rideEstimate.options}
            onSelectDriver={handleDriverSelect}
            selectedDriverId={selectedDriverId}
          />
          <button
            onClick={handleConfirmRide}
            disabled={!selectedDriverId}
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Viagem
          </button>
        </div>
      </div>
    </div>
  );
}
