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
    roastDate: '2024-02-20',
    roastLevel: 'dark',
    price: 15.00,
    weight: 250,
    remainingWeight: 250,
    isOpen: false,
    idealRestingTime: 3,
    notes: 'Full body, earthy, dark chocolate'
  }
];