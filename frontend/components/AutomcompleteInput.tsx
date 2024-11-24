"use client";

import { useGoogleMapsAutocomplete } from "@/hooks/useGoogleMapsAutomcomplete";
import React from "react";
import { Input } from "./shared/Input";

interface AutocompleteInputProps {
  name: string;
  label: string;
  required?: boolean;
}

export function AutocompleteInput({
  name,
  label,
  required = false,
}: AutocompleteInputProps) {
  const { inputRef } = useGoogleMapsAutocomplete();

  return (
    <Input
      ref={inputRef}
      type="text"
      name={name}
      label={label}
      required={required}
    />
  );
}
