import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

interface AutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onAddNew: (value: string) => void;
  label: string;
  required?: boolean;
  name: string;
}

export function Autocomplete({
  options,
  value,
  onChange,
  onAddNew,
  label,
  required = false,
  name,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options
    .filter(option => 
      option.toLowerCase().includes(inputValue.toLowerCase()))
    .sort();

  const exactMatch = options.some(
    option => option.toLowerCase() === inputValue.toLowerCase()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setInputValue(option);
    setIsOpen(false);
  };

  const handleAddNew = () => {
    if (inputValue.trim()) {
      onAddNew(inputValue.trim());
      onChange(inputValue.trim());
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(prev => 
        Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleOptionClick(filteredOptions[highlightedIndex]);
      } else if (!exactMatch && inputValue.trim()) {
        handleAddNew();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const element = listRef.current.children[highlightedIndex] as HTMLElement;
      element.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            id={name}
            ref={inputRef}
            required={required}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="block w-full rounded-l-md border-r-0 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul
            ref={listRef}
            className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
            role="listbox"
          >
            {(inputValue.trim() === '' ? options : filteredOptions).map((option, index) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                  highlightedIndex === index
                    ? 'text-white bg-blue-600'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
                role="option"
              >
                {option}
              </li>
            ))}
            {!exactMatch && inputValue.trim() !== '' && (
              <li
                onClick={handleAddNew}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-blue-600 hover:bg-gray-100 flex items-center`}
                role="option"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add "{inputValue}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}