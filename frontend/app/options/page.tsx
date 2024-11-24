"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RideEstimate } from "../core/dtos/RideEstimateDto";
import { RideDirections } from "./components/RideMap";
import { RideSummary } from "./components/RideSummary";
import { DriversList } from "./components/DriverList";
import { useSnackbar } from "@/components/shared/SnackBarContext";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function OptionsPage() {
  const searchParams = useSearchParams();
  const [rideEstimate, setRideEstimate] = useState<RideEstimate | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const router = useRouter();
  const showSnackbar = useSnackbar();

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
        showSnackbar("Viagem estimada com sucesso!", "info");
      } catch (error) {
        console.error("Error estimating ride:", error);
        showSnackbar("Erro ao estimar viagem", "error");
        setLoading(false);
      }
    };
    estimateRide();
  }, [origin, destination, customerId, showSnackbar]);

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
        showSnackbar("Erro ao confirmar viagem", "error");
        return;
      }

      router.push("/history?customerId=" + customerId);
      showSnackbar("Viagem confirmada com sucesso!");
    } catch (error) {
      console.error("Error confirming ride:", error);
      showSnackbar("Erro ao confirmar viagem", "error");
    }
  };

  if (!API_KEY) {
    throw new Error("API_KEY is not set");
  }

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!rideEstimate) {
    return (
      <div className="text-center py-10 flex flex-col items-center	">
        Houve um erro ao estimar sua viagem. Por favor tente novamente mais
        tarde.
        <Button className="w-48">
          <Link href="/">Voltar para o ínicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Escolha sua viagem</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <RideSummary
              distance={rideEstimate.distance}
              duration={rideEstimate.duration}
            />
            {rideEstimate && (
              <Map
                defaultCenter={rideEstimate.origin}
                defaultZoom={6}
                gestureHandling={"greedy"}
              >
                <RideDirections
                  origin={rideEstimate.routeResponse.origin_addresses[0]}
                  destination={
                    rideEstimate.routeResponse.destination_addresses[0]
                  }
                />
              </Map>
            )}
          </div>
          <div>
            <DriversList
              drivers={rideEstimate.options}
              onSelectDriver={handleDriverSelect}
              selectedDriverId={selectedDriverId}
              handleConfirmRide={handleConfirmRide}
            />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
