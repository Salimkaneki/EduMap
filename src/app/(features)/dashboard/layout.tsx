import React from "react";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen w-full flex">
      {/* Sidebar - à gauche */}
      <Sidebar />

      {/* Main Content Area - à droite */}
      <main className="flex-1 overflow-auto  bg-gray-50">
        {children}
      </main>
    </div>
  );
}
