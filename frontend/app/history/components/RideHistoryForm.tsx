import { Driver } from "@/app/core/dtos/RideEstimateDto";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface RideHistoryForm {
  customerId: string;
  driverId: string;
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function RideHistoryForm() {
  const [selectedDriver, setSelectedDriver] = useState<string | undefined>(
    undefined
  );
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RideHistoryForm>();
  const router = useRouter();

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/driver`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get drivers");
        }

        const drivers: Driver[] = await response.json();
        setDrivers(drivers);
      } catch (error) {
        console.error("Error getting drivers:", error);
      }
    };
    getDrivers();
  }, []);

  const onSubmit = async (data: RideHistoryForm) => {
    const driverId = selectedDriver;
    const url = `${window.origin}/history?customerId=${data.customerId}${
      driverId ? `&driverId=${driverId}` : ""
    }`;
    router.push(url);
  };

  const handleChange = (value: string | null) => {
    if (value) {
      setSelectedDriver(value);
      setValue("driverId", value);
    } else {
      setSelectedDriver(undefined);
      setValue("driverId", "");
    }
  };

  function getDrivers(): { value: string; label: string }[] {
    return drivers.map((driver) => ({
      value: driver._id,
      label: driver.name,
    }));
  }

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Filtre sua viagem com seu id e motorista(opcional)
      </h2>
      <p className="text-gray-600 mb-6">
        Insira os detalhes abaixo para ver seu histórico de viagens.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("customerId", {
            required: "ID do viajante é obrigatório",
          })}
          label="ID do viajante"
        />
        {errors.customerId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.customerId.message}
          </p>
        )}

        <Select
          label="Selecione um motorista:"
          options={getDrivers()}
          onChange={handleChange}
          defaultValue={null}
        />
        {errors.driverId && (
          <p className="text-red-500 text-sm mt-1">{errors.driverId.message}</p>
        )}
        <Button type="submit" className="w-full mt-4">
          Obter histórico
        </Button>
      </form>
    </Card>
  );
}
