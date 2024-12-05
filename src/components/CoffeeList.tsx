import React, { useState } from 'react';
import { Coffee, calculateBestOpenDate } from '../types/coffee';
import { BrewingParameters } from '../types/brew';
import { Coffee as CoffeeIcon, Lock, Unlock } from 'lucide-react';
import { BrewForm } from './BrewForm';
import { roastLevelLabels } from '../types/roastLevel';

interface CoffeeListProps {
  coffees: Coffee[];
  onAddBrew: (params: Omit<BrewingParameters, 'id'>) => void;
  onOpenCoffee: (coffeeId: string) => void;
}

export function CoffeeList({ coffees, onAddBrew, onOpenCoffee }: CoffeeListProps) {
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | null>(null);

  const handleBrewSubmit = (params: Omit<BrewingParameters, 'id'>) => {
    onAddBrew(params);
    setSelectedCoffeeId(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">My Coffee Collection</h2>
      
      {coffees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <CoffeeIcon className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No coffee in your stash</h3>
          <p className="mt-2 text-sm text-gray-500">
            Start building your collection by adding your first coffee above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coffees.map((coffee) => {
            const bestOpenDate = calculateBestOpenDate(coffee.roastDate, coffee.idealRestingTime);
            const isReadyToOpen = new Date() >= bestOpenDate;
            
            return (
              <div key={coffee.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{coffee.name}</h3>
                    <p className="text-sm text-gray-500">
                      {coffee.roaster.name} ({coffee.roaster.country.name})
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {roastLevelLabels[coffee.roastLevel]}
                  </span>
                </div>
                
                <dl className="mt-4 space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Origin</dt>
                    <dd className="text-sm text-gray-900">{coffee.origin}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Producer</dt>
                    <dd className="text-sm text-gray-900">{coffee.producer}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Varietal</dt>
                    <dd className="text-sm text-gray-900">{coffee.varietal}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Process</dt>
                    <dd className="text-sm text-gray-900">{coffee.process}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Roast Date</dt>
                    <dd className="text-sm text-gray-900">{new Date(coffee.roastDate).toLocaleDateString()}</dd>
                  </div>

                  {!coffee.isOpen && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Best Open Date</dt>
                      <dd className={`text-sm ${isReadyToOpen ? 'text-green-600 font-medium' : 'text-orange-600'}`}>
                        {bestOpenDate.toLocaleDateString()}
                        {isReadyToOpen ? ' (Ready!)' : ''}
                      </dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Price</dt>
                      <dd className="text-sm text-gray-900">${coffee.price.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Remaining</dt>
                      <dd className="text-sm text-gray-900">{coffee.remainingWeight ?? coffee.weight}g</dd>
                    </div>
                  </div>

                  {coffee.notes && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Notes</dt>
                      <dd className="text-sm text-gray-900">{coffee.notes}</dd>
                    </div>
                  )}

                  <div className="pt-4">
                    {!coffee.isOpen ? (
                      <button
                        onClick={() => onOpenCoffee(coffee.id)}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          isReadyToOpen 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-orange-600 hover:bg-orange-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        {isReadyToOpen ? 'Ready to Open!' : 'Open Early'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedCoffeeId(coffee.id)}
                        disabled={(coffee.remainingWeight ?? coffee.weight) <= 0}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        {(coffee.remainingWeight ?? coffee.weight) <= 0 ? 'Empty' : 'Brew it!'}
                      </button>
                    )}
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      )}

      {selectedCoffeeId && (
        <BrewForm
          coffeeId={selectedCoffeeId}
          remainingWeight={
            coffees.find(c => c.id === selectedCoffeeId)?.remainingWeight ??
            coffees.find(c => c.id === selectedCoffeeId)?.weight ??
            0
          }
          onSubmit={handleBrewSubmit}
          onClose={() => setSelectedCoffeeId(null)}
        />
      )}
    </div>
  );
}