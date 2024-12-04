import { Coffee } from '../types/coffee';
import { Archive } from 'lucide-react';
import { roastLevelLabels } from '../types/roastLevel';

interface CoffeeHistoryProps {
  coffees: Coffee[];
}

export function CoffeeHistory({ coffees }: CoffeeHistoryProps) {
  const finishedCoffees = coffees
    .filter(coffee => coffee.finishedDate)
    .sort((a, b) => new Date(b.finishedDate!).getTime() - new Date(a.finishedDate!).getTime());

  if (finishedCoffees.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Archive className="h-6 w-6" />
        Coffee History
      </h2>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Coffee</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Roaster</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Origin</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Roast Level</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Finished Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {finishedCoffees.map((coffee) => {
              const roastDate = new Date(coffee.roastDate);
              const finishDate = new Date(coffee.finishedDate!);
              const durationDays = Math.round((finishDate.getTime() - roastDate.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <tr key={coffee.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {coffee.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {coffee.roaster.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {coffee.origin}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {roastLevelLabels[coffee.roastLevel]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {finishDate.toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {durationDays} days
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}