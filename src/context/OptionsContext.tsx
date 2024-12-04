import React, { createContext, useContext, useState } from 'react';
import { DynamicOptions, OptionsContextType } from '../types/options';
import { countries } from '../types/country';

const initialOptions: DynamicOptions = {
  origins: [
    'Colombia', 'Brazil', 'Ethiopia', 'Guatemala', 'Peru', 
    'Honduras', 'Costa Rica', 'Kenya', 'El Salvador', 'Indonesia',
    'Rwanda', 'Mexico', 'Nicaragua', 'India', 'Uganda',
    'Papua New Guinea', 'Tanzania', 'Burundi', 'Panama', 'Myanmar',
    'Bolivia', 'Timor', 'Ecuador', 'Vietnam', 'Jamaica',
    'D.R. Congo', 'Malawi', 'China', 'Zambia', 'Cuba',
    'Cameroon', 'Australia', 'Zimbabwe', 'Yemen', 'Venezuela',
    'Malaysia', 'Haiti', 'Dominican Republic', 'Thailand', 'Madagascar'
  ],
  producers: [
    'Finca El Paraiso', 'Familia Ortiz', 'Café Granja La Esperanza',
    'Daterra Estate', 'Hacienda La Esmeralda', 'La Palma y El Tucán',
    'Ninety Plus Coffee', 'Origin Coffee Lab', 'Finca Vista Hermosa',
    'Finca Santa Elena', 'Finca Los Pirineos', 'Finca El Socorro',
    'Finca La Soledad', 'Finca San José', 'Finca El Injerto'
  ],
  roasters: [
    { name: 'Jolly Bean', country: { code: 'AU', name: 'Australia' } },
    { name: 'Dak', country: { code: 'US', name: 'United States' } },
    { name: 'A.M.O.C.', country: { code: 'NZ', name: 'New Zealand' } },
    { name: 'Glitch', country: { code: 'GB', name: 'United Kingdom' } },
    { name: 'Kerb Collective', country: { code: 'AU', name: 'Australia' } }
  ],
  varietals: [
    'Blue Mountain', 'Bourbon', 'Castillo', 'Caturra', 'Catuai',
    'Colombia', 'Gesha', 'Heirloom', 'Java', 'JARC 74110',
    'JARC 74112', 'Maragogype', 'Pacamara', 'Pacas', 'Pink Bourbon',
    'Red Bourbon', 'Red Caturra', 'Red Catuai', 'Sidra', 'SL-14',
    'SL-28', 'SL-34', 'Tabi', 'Typica', 'Yellow Bourbon',
    'Yellow Caturra', 'Yellow Catuai'
  ]
};

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export function OptionsProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<DynamicOptions>(initialOptions);

  const addOption = (category: keyof DynamicOptions, value: string | Roaster) => {
    setOptions(prev => ({
      ...prev,
      [category]: [...prev[category], value]
    }));
  };

  return (
    <OptionsContext.Provider value={{ options, addOption }}>
      {children}
    </OptionsContext.Provider>
  );
}

export function useOptions() {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
}