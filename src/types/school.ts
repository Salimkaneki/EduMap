// types/school.ts
// src/types/school.ts

export interface School {
  id: number;
  name: string;
  type: string;
  location: string;
  level: string;
  rating: number;
  reviews: number;
  description: string;
  address: string;
  contact: string;
  email: string;
  website: string;
  facilities?: string[];
  programs?: string[];
  admissionInfo: string;
  fees: string;
}