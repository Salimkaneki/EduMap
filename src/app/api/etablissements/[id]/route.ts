// app/api/etablissements/[id]/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'https://edumap.edufyplus.com/api';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Appel à l'API Laravel pour récupérer un établissement spécifique
    const response = await fetch(`${API_BASE_URL}/etablissements/${id}`, {
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
    console.error("Erreur lors de la récupération de l'établissement:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des données" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    // Récupérer les données du corps de la requête
    const body = await request.json();
    
    // Appel à l'API Laravel pour mettre à jour l'établissement
    const response = await fetch(`${API_BASE_URL}/etablissements/${id}`, {
      method: 'PUT',
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
        { error: errorData.error || 'Une erreur est survenue lors de la mise à jour' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'établissement:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de l'établissement" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Appel à l'API Laravel pour supprimer l'établissement
    const response = await fetch(`${API_BASE_URL}/etablissements/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Ajoutez si nécessaire des headers d'authentification
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Une erreur est survenue lors de la suppression' },
        { status: response.status }
      );
    }

    // Retourner un code 204 No Content pour une suppression réussie
    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error("Erreur lors de la suppression de l'établissement:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de l'établissement" },
      { status: 500 }
    );
  }
}