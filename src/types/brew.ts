export type BrewingMethod = 'V60' | 'Aeropress' | 'French Press' | 'Chemex' | 'Kalita Wave' | 'Espresso' | 'Moka Pot';

export interface BrewingParameters {
  id: string;
  coffeeId: string;
  method: BrewingMethod;
  doseWeight: number;
  waterWeight?: number;
  waterTemperature?: number;
  grindSize?: string;
  brewTime?: string;
  notes?: string;
  date: string;
}