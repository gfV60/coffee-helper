import React, { useState } from 'react';
import { Coffee } from '../types/coffee';
import { Save } from 'lucide-react';
import { Autocomplete } from './Autocomplete';
import { RoasterSelect } from './RoasterSelect';
import { useOptions } from '../context/OptionsContext';
import { Roaster } from '../types/roaster';
import { RoastLevels, roastLevelLabels, RoastLevel } from '../types/roastLevel';

interface CoffeeFormProps {
  onSubmit: (coffee: Omit<Coffee, 'id' | 'remainingWeight' | 'isOpen'>) => void;
}

export function CoffeeForm({ onSubmit }: CoffeeFormProps) {
  const { options, addOption } = useOptions();
  const [formData, setFormData] = useState({
    name: '',
    roaster: null as Roaster | null,
    origin: '',
    producer: '',
    varietal: '',
    roastDate: '',
    roastLevel: RoastLevels.MEDIUM as RoastLevel,
    price: '',
    weight: '',
    idealRestingTime: '2',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.roaster) return;

    const coffee = {
      name: formData.name,
      roaster: formData.roaster,
      origin: formData.origin,
      producer: formData.producer,
      varietal: formData.varietal,
      roastDate: formData.roastDate,
      roastLevel: formData.roastLevel,
      price: Number(formData.price),
      weight: Number(formData.weight),
      idealRestingTime: Number(formData.idealRestingTime),
      notes: formData.notes,
    };
    
    onSubmit(coffee);
    setFormData({
      name: '',
      roaster: null,
      origin: '',
      producer: '',
      varietal: '',
      roastDate: '',
      roastLevel: RoastLevels.MEDIUM,
      price: '',
      weight: '',
      idealRestingTime: '2',
      notes: ''
    });
  };

  const handleChange = (name: string, value: string | Roaster) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Add New Coffee</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Coffee Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <RoasterSelect
          roasters={options.roasters}
          value={formData.roaster}
          onChange={(roaster) => handleChange('roaster', roaster)}
          onAddNew={(roaster) => addOption('roasters', roaster)}
          required
        />

        <Autocomplete
          name="origin"
          label="Origin"
          required
          value={formData.origin}
          options={options.origins}
          onChange={(value) => handleChange('origin', value)}
          onAddNew={(value) => addOption('origins', value)}
        />

        <Autocomplete
          name="producer"
          label="Producer"
          required
          value={formData.producer}
          options={options.producers}
          onChange={(value) => handleChange('producer', value)}
          onAddNew={(value) => addOption('producers', value)}
        />

        <Autocomplete
          name="varietal"
          label="Varietal"
          required
          value={formData.varietal}
          options={options.varietals}
          onChange={(value) => handleChange('varietal', value)}
          onAddNew={(value) => addOption('varietals', value)}
        />

        <div>
          <label htmlFor="roastDate" className="block text-sm font-medium text-gray-700">Roast Date</label>
          <input
            type="date"
            name="roastDate"
            id="roastDate"
            required
            value={formData.roastDate}
            onChange={(e) => handleChange('roastDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="roastLevel" className="block text-sm font-medium text-gray-700">Roast Level</label>
          <select
            name="roastLevel"
            id="roastLevel"
            required
            value={formData.roastLevel}
            onChange={(e) => handleChange('roastLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.entries(RoastLevels).map(([key, value]) => (
              <option key={value} value={value}>
                {roastLevelLabels[value]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (g)</label>
          <input
            type="number"
            name="weight"
            id="weight"
            required
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="idealRestingTime" className="block text-sm font-medium text-gray-700">
            Ideal Resting Time (weeks)
          </label>
          <input
            type="number"
            name="idealRestingTime"
            id="idealRestingTime"
            min="0"
            step="0.5"
            required
            value={formData.idealRestingTime}
            onChange={(e) => handleChange('idealRestingTime', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Coffee
      </button>
    </form>
  );
}