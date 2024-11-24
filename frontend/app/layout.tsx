import React from "react";
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
    <html lang="pt-br">
      <head></head>
      <body>
        <NavBar />
        <SnackbarProvider>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
