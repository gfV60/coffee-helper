import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BrewingParameters, BrewingMethod } from '../types/brew';

interface BrewFormProps {
  coffeeId: string;
  remainingWeight: number;
  onSubmit: (params: Omit<BrewingParameters, 'id'>) => void;
  onClose: () => void;
}

export function BrewForm({ coffeeId, remainingWeight, onSubmit, onClose }: BrewFormProps) {
  const [formData, setFormData] = useState({
    method: '' as BrewingMethod,
    doseWeight: '',
    waterWeight: '',
    waterTemperature: '',
    grindSize: '',
    brewTime: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (Number(formData.doseWeight) > remainingWeight) {
      alert('Dose weight cannot be greater than remaining coffee weight!');
      return;
    }

    onSubmit({
      coffeeId,
      method: formData.method,
      doseWeight: Number(formData.doseWeight),
      waterWeight: formData.waterWeight ? Number(formData.waterWeight) : undefined,
      waterTemperature: formData.waterTemperature ? Number(formData.waterTemperature) : undefined,
      grindSize: formData.grindSize || undefined,
      brewTime: formData.brewTime || undefined,
      notes: formData.notes || undefined,
      date: new Date().toISOString(),
    });
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const brewingMethods: BrewingMethod[] = [
    'V60', 'Aeropress', 'French Press', 'Chemex', 'Kalita Wave', 'Espresso', 'Moka Pot'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Record New Brew</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brewing Method</label>
            <select
              required
              value={formData.method}
              onChange={(e) => handleChange('method', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Method</option>
              {brewingMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dose Weight (g) - Max: {remainingWeight}g
            </label>
            <input
              type="number"
              required
              min="1"
              max={remainingWeight}
              step="0.1"
              value={formData.doseWeight}
              onChange={(e) => handleChange('doseWeight', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Water Weight (g)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={formData.waterWeight}
              onChange={(e) => handleChange('waterWeight', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Water Temperature (°C)</label>
            <input
              type="number"
              min="1"
              max="100"
              step="0.1"
              value={formData.waterTemperature}
              onChange={(e) => handleChange('waterTemperature', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Grind Size</label>
            <input
              type="text"
              placeholder="e.g., Fine, Medium, Coarse"
              value={formData.grindSize}
              onChange={(e) => handleChange('grindSize', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Brew Time</label>
            <input
              type="text"
              placeholder="e.g., 2:30"
              value={formData.brewTime}
              onChange={(e) => handleChange('brewTime', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="How did it taste? What would you change next time?"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Record Brew
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}