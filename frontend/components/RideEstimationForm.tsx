"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./shared/Button";
import { Card } from "./shared/Card";
import { Input } from "./shared/Input";
import { useRouter } from "next/navigation";

interface RideEstimationFormData {
  customerId: string;
  origin: string;
  destination: string;
}

export function RideEstimationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RideEstimationFormData>();
  const router = useRouter();

  const onSubmit = async (data: RideEstimationFormData) => {
    router.push(
      `/options?origin=${data.origin}&destination=${data.destination}&customerId=${data.customerId}`
    );
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Calcule sua viagem</h2>
      <p className="text-gray-600 mb-6">
        Insira os detalhes da viagem para obter uma estimativa de preço.
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

        <Input
          {...register("origin", { required: "Origem é obrigatória" })}
          label="Origem"
        />
        {errors.origin && (
          <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>
        )}

        <Input
          {...register("destination", { required: "Destino é obrigatório" })}
          label="Destino"
        />

        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">
            {errors.destination.message}
          </p>
        )}

        <Button type="submit" className="w-full">
          Obter estimativa
        </Button>
      </form>
    </Card>
  );
}
