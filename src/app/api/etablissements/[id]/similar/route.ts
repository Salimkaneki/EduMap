// app/api/etablissements/[id]/similar/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Récupérer les paramètres de recherche depuis l'URL
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '4'; // Nombre d'établissements similaires à récupérer
    
    // Appel à l'API Laravel pour récupérer des établissements similaires
    const response = await fetch(`${API_BASE_URL}/etablissements/${id}/similar?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Ajoutez si nécessaire des headers d'authentification
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Une erreur est survenue' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des établissements similaires:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des données" },
      { status: 500 }
    );
  }
}