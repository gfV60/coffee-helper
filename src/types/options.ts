import { Roaster } from './roaster';

export interface DynamicOptions {
  origins: string[];
  producers: string[];
  roasters: Roaster[];
  varietals: string[];
}

export interface OptionsContextType {
  options: DynamicOptions;
  addOption: (category: keyof DynamicOptions, value: string | Roaster) => void;
}