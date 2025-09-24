'use server';

import { LoginRequest, LoginResponse } from '../_models/types';
import { cookies } from 'next/headers';

export async function loginAdmin(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`https://edumap-api.bestwebapp.tech/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const result: LoginResponse = await response.json();

  // Store the token in a cookie
  const cookieStore = await cookies();
  cookieStore.set('admin_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return result;
}
