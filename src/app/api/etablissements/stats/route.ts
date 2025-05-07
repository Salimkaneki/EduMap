// app/api/etablissements/stats/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'https://edumap.edufyplus.com/api';

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de recherche depuis l'URL
    const { searchParams } = new URL(request.url);
    
    // Construire l'URL avec les paramètres
    let apiUrl = `${API_BASE_URL}/etablissements/stats?`;
    
    // Ajouter tous les paramètres de filtrage pour les statistiques
    searchParams.forEach((value, key) => {
      apiUrl += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    });
    
    // Enlever le dernier '&' si présent
    apiUrl = apiUrl.endsWith('&') ? apiUrl.slice(0, -1) : apiUrl;
    
    // Appel à l'API Laravel pour récupérer les statistiques
    const response = await fetch(apiUrl, {
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
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}