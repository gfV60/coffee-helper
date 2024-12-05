import { Roaster } from './roaster';
import { RoastLevel } from './roastLevel';

export interface Coffee {
  id: string;
  name: string;
  roaster: Roaster;
  origin: string;
  producer: string;
  varietal: string;
  process: string;
  roastDate: string;
  roastLevel: RoastLevel;
  price: number;
  weight: number;
  remainingWeight?: number;
  notes?: string;
  isOpen: boolean;
  idealRestingTime: number;
  finishedDate?: string;
}

export function calculateBestOpenDate(roastDate: string, restingTime: number): Date {
  const date = new Date(roastDate);
  date.setDate(date.getDate() + (restingTime * 7));
  return date;
}