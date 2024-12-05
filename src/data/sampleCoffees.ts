import { Coffee } from '../types/coffee';

export const sampleCoffees: Coffee[] = [
  {
    id: '1',
    name: 'Yirgacheffe Natural',
    roaster: {
      name: 'Jolly Bean',
      country: { code: 'AU', name: 'Australia' }
    },
    origin: 'Ethiopia',
    producer: 'Origin Coffee Lab',
    varietal: 'Heirloom',
    process: 'Natural',
    roastDate: '2024-02-15',
    roastLevel: 'light',
    price: 18.50,
    weight: 250,
    remainingWeight: 250,
    isOpen: false,
    idealRestingTime: 2,
    notes: 'Blueberry, jasmine, and honey notes'
  },
  {
    id: '2',
    name: 'Huila Decaf',
    roaster: {
      name: 'Dak',
      country: { code: 'US', name: 'United States' }
    },
    origin: 'Colombia',
    producer: 'Familia Ortiz',
    varietal: 'Castillo',
    process: 'Washed',
    roastDate: '2024-02-01',
    roastLevel: 'medium',
    price: 16.00,
    weight: 340,
    remainingWeight: 280,
    isOpen: true,
    idealRestingTime: 1.5,
    notes: 'Swiss water process, caramel sweetness'
  },
  {
    id: '3',
    name: 'Sumatra Mandheling',
    roaster: {
      name: 'A.M.O.C.',
      country: { code: 'NZ', name: 'New Zealand' }
    },
    origin: 'Indonesia',
    producer: 'Finca El Paraiso',
    varietal: 'Typica',
    process: 'Wet Hulled',
    roastDate: '2024-02-20',
    roastLevel: 'dark',
    price: 15.00,
    weight: 250,
    remainingWeight: 250,
    isOpen: false,
    idealRestingTime: 3,
    notes: 'Full body, earthy, dark chocolate'
  },
  {
    id: '4',
    name: 'Kenya AA',
    roaster: {
      name: 'Glitch',
      country: { code: 'GB', name: 'United Kingdom' }
    },
    origin: 'Kenya',
    producer: 'Finca Vista Hermosa',
    varietal: 'SL-28',
    process: 'Washed',
    roastDate: '2024-01-05',
    roastLevel: 'light',
    price: 22.00,
    weight: 250,
    remainingWeight: 0,
    isOpen: true,
    idealRestingTime: 2,
    notes: 'Blackcurrant, bergamot, and brown sugar',
    finishedDate: '2024-02-15'
  },
  {
    id: '5',
    name: 'Guatemala Antigua',
    roaster: {
      name: 'Kerb Collective',
      country: { code: 'AU', name: 'Australia' }
    },
    origin: 'Guatemala',
    producer: 'Finca El Socorro',
    varietal: 'Bourbon',
    process: 'Honey',
    roastDate: '2024-01-10',
    roastLevel: 'medium',
    price: 19.50,
    weight: 340,
    remainingWeight: 0,
    isOpen: true,
    idealRestingTime: 2,
    notes: 'Milk chocolate, orange, and caramel',
    finishedDate: '2024-02-20'
  }
];