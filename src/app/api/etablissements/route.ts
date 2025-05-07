// app/api/etablissements/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'https://edumap.edufyplus.com/api';

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de recherche depuis l'URL
    const { searchParams } = new URL(request.url);
    
    // Construire l'URL avec les paramètres
    let apiUrl = `${API_BASE_URL}/etablissements/search?`;
    
    // Ajouter tous les paramètres de recherche
    searchParams.forEach((value, key) => {
      apiUrl += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    });
    
    // Enlever le dernier '&' si présent
    apiUrl = apiUrl.endsWith('&') ? apiUrl.slice(0, -1) : apiUrl;
    
    // Appel à l'API Laravel
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Ajoutez si nécessaire des headers d'authentification
      // 'Authorization': `Bearer ${token}`
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
    console.error("Erreur lors de la recherche d'établissements:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des données" },
      { status: 500 }
    );
  }
}

// Ajout de la méthode POST pour permettre la création d'un établissement
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body = await request.json();
    
    // Appel à l'API Laravel
    const response = await fetch(`${API_BASE_URL}/etablissements`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Ajoutez si nécessaire des headers d'authentification
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Une erreur est survenue lors de la création' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
    
  } catch (error) {
    console.error("Erreur lors de la création de l'établissement:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de l'établissement" },
      { status: 500 }
    );
  }
}