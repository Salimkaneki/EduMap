'use server';

import { DashboardResponse, EtablissementStats } from '../_models/types';
import { cookies } from 'next/headers';

export async function getDashboardData(): Promise<DashboardResponse> {

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Using token:', token);

  const response = await fetch(`https://edumap-api.bestwebapp.tech/api/admin/dashboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Dashboard API response status:', response.status);

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const result: DashboardResponse = await response.json();
  return result;
}

export async function getEtablissementStats(): Promise<EtablissementStats> {
  'use server';

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`https://edumap-api.bestwebapp.tech/api/admin/etablissements/stats`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch etablissement stats');
  }

  const result: EtablissementStats = await response.json();
  return result;
}

export async function logoutAdmin(): Promise<void> {
  'use server';

  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
}
