"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="p-8 text-center border-red-200 bg-red-50">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-700 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-red-600 mb-4">{error}</p>
      <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700">
        <RefreshCw className="w-4 h-4 mr-2" />
        Réessayer
      </Button>
    </Card>
  );
}
