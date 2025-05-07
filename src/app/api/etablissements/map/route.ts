// app/api/etablissements/map/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'https://edumap.edufyplus.com/api';

export async function GET() {
  try {
    // Appel à l'API Laravel pour récupérer les coordonnées des établissements pour la carte
    const response = await fetch(`${API_BASE_URL}/etablissements/map`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Ajoutez si nécessaire des headers d'authentification
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      // Si l'API retourne une erreur, la propager
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Une erreur est survenue' },
        { status: response.status }
      );
    }

    // Si tout va bien, retourner les données
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des données de carte:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des données de carte" },
      { status: 500 }
    );
  }
}

