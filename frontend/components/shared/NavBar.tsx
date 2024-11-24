import Link from "next/link";
import React from "react";

export function NavBar() {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-white text-2xl font-bold">Taxi Driver</h1>
          <div>
            <Link href="/" className="text-white">
              Nova viagem
            </Link>
            <Link href="/history" className="text-white ml-4">
              Histórico
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
