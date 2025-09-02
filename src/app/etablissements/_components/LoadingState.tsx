"use client";

import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">
          Chargement des établissements...
        </p>
      </div>
    </div>
  );
}
