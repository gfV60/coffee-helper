import { useState } from 'react';
import { Coffee } from './types/coffee';
import { BrewingParameters } from './types/brew';
import { CoffeeForm } from './components/CoffeeForm';
import { CoffeeList } from './components/CoffeeList';
import { SupplyAlert } from './components/SupplyAlert';
import { CoffeeHistory } from './components/CoffeeHistory';
import { OptionsProvider } from './context/OptionsContext';
import { sampleCoffees } from './data/sampleCoffees';

function App() {
  const [coffees, setCoffees] = useState<Coffee[]>(sampleCoffees);
  const [_brews, setBrews] = useState<BrewingParameters[]>([]);

  const handleAddCoffee = (newCoffee: Omit<Coffee, 'id' | 'remainingWeight' | 'isOpen'>) => {
    const coffee: Coffee = {
      ...newCoffee,
      id: crypto.randomUUID(),
      remainingWeight: newCoffee.weight,
      isOpen: false,
    };
    setCoffees((prev) => [...prev, coffee]);
  };

  const handleAddBrew = (brew: Omit<BrewingParameters, 'id'>) => {
    const newBrew: BrewingParameters = {
      ...brew,
      id: crypto.randomUUID(),
    };
    
    setBrews(prev => [...prev, newBrew]);
    
    setCoffees(prev => prev.map(coffee => {
      if (coffee.id === brew.coffeeId) {
        const newRemainingWeight = (coffee.remainingWeight || coffee.weight) - brew.doseWeight;
        return {
          ...coffee,
          remainingWeight: newRemainingWeight,
          ...(newRemainingWeight <= 0 ? { finishedDate: new Date().toISOString() } : {})
        };
      }
      return coffee;
    }));
  };

  const handleOpenCoffee = (coffeeId: string) => {
    setCoffees(prev => prev.map(coffee => {
      if (coffee.id === coffeeId) {
        return {
          ...coffee,
          isOpen: true,
        };
      }
      return coffee;
    }));
  };

  const activeCoffees = coffees.filter(coffee => !coffee.finishedDate);

  return (
    <OptionsProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Home Barista Manager</h1>
            
            <div className="space-y-8">
              <CoffeeForm onSubmit={handleAddCoffee} />
              <SupplyAlert coffees={activeCoffees} />
              <CoffeeList 
                coffees={activeCoffees}
                onAddBrew={handleAddBrew}
                onOpenCoffee={handleOpenCoffee}
              />
              <CoffeeHistory coffees={coffees} />
            </div>
          </div>
        </div>
      </div>
    </OptionsProvider>
  );
}

export default App;