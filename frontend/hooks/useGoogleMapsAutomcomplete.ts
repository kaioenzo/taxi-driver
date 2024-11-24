"use client";

import { useEffect, useRef, useState } from "react";

export function useGoogleMapsAutocomplete() {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded");
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement,
      {
        types: ["address"],
        componentRestrictions: { country: "US" }, // Adjust this to your needs
      }
    );

    setAutoComplete(autocomplete);

    return () => {
      if (autoComplete) {
        google.maps.event.clearInstanceListeners(autoComplete);
      }
    };
  }, []);

  return { inputRef, autoComplete };
}
