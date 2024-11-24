import React from "react";
import Script from "next/script";
// These styles apply to every route in the application
import "./globals.css";
import { NavBar } from "@/components/shared/NavBar";
import { SnackbarProvider } from "@/components/shared/SnackBarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <NavBar />
        <SnackbarProvider>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
