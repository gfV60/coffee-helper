import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOptions } from '../context/OptionsContext';

interface DynamicSelectProps {
  name: string;
  label: string;
  category: 'origins' | 'roasters';
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function DynamicSelect({ 
  name, 
  label, 
  category, 
  required = false,
  value,
  onChange
}: DynamicSelectProps) {
  const { options, addOption } = useOptions();
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState('');

  const handleAddNew = () => {
    if (newValue.trim()) {
      addOption(category, newValue.trim());
      onChange(newValue.trim());
      setNewValue('');
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div>
        <label htmlFor={`new-${name}`} className="block text-sm font-medium text-gray-700">
          {`Add New ${label}`}
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id={`new-${name}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNew();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex gap-2">
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select {label}</option>
          {options[category].sort().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}