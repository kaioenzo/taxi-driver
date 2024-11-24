import React from "react";
import { RideEstimationForm } from "@/components/RideEstimationForm";

export default function EstimatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Taxi Driver</h1>
      <RideEstimationForm />
    </div>
  );
}
