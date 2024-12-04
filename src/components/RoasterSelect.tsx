import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Roaster } from '../types/roaster';
import { RoasterModal } from './RoasterModal';

interface RoasterSelectProps {
  roasters: Roaster[];
  value: Roaster | null;
  onChange: (roaster: Roaster) => void;
  onAddNew: (roaster: Roaster) => void;
  required?: boolean;
}

export function RoasterSelect({
  roasters,
  value,
  onChange,
  onAddNew,
  required = false
}: RoasterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState(value?.name || '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRoasters = roasters
    .filter(roaster => 
      roaster.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const exactMatch = roasters.some(
    roaster => roaster.name.toLowerCase() === searchTerm.toLowerCase()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelectRoaster = (roaster: Roaster) => {
    onChange(roaster);
    setInputValue(roaster.name);
    setIsOpen(false);
  };

  const handleAddNewClick = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleAddNewSubmit = (newRoaster: Roaster) => {
    onAddNew(newRoaster);
    onChange(newRoaster);
    setInputValue(newRoaster.name);
    setShowModal(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700">
        Roaster
      </label>
      <div className="mt-1 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            required={required}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className="block w-full rounded-l-md border-r-0 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search or add roaster..."
          />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {filteredRoasters.map((roaster) => (
              <li
                key={roaster.name}
                onClick={() => handleSelectRoaster(roaster)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{roaster.name}</span>
                  <span className="text-gray-500 text-sm">{roaster.country.name}</span>
                </div>
              </li>
            ))}
            {!exactMatch && searchTerm && (
              <li
                onClick={handleAddNewClick}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-blue-600 hover:bg-gray-100 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add "{searchTerm}"
              </li>
            )}
          </ul>
        </div>
      )}

      {showModal && (
        <RoasterModal
          onClose={() => {
            setShowModal(false);
            setSearchTerm('');
          }}
          onSubmit={handleAddNewSubmit}
          initialName={searchTerm}
        />
      )}
    </div>
  );
}