export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  is_superadmin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  admin: Admin;
  token: string;
}
