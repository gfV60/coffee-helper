import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Coffee } from '../types/coffee';
import { calculateSupplyStatus } from '../utils/coffeeSupplyCalculator';

interface SupplyAlertProps {
  coffees: Coffee[];
}

export function SupplyAlert({ coffees }: SupplyAlertProps) {
  const status = calculateSupplyStatus(coffees);

//  if (status.severity === 'none') return null;

  const severityStyles = {
    high: 'bg-red-50 text-red-800 border-red-200',
    medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    low: 'bg-blue-50 text-blue-800 border-blue-200',
    none: ''
  };

  const iconStyles = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-blue-500',
    none: ''
  };

  return (
    <div className={`mb-6 p-4 rounded-lg border ${severityStyles[status.severity]}`}>
      <div className="flex items-center">
        {status.severity !== 'none' && (
          <AlertTriangle className={`h-5 w-5 mr-2 ${iconStyles[status.severity]}`} />
        )}
        <div className="flex-1">
          <p className="font-medium">{status.message}</p>
          <p className="text-sm mt-1">
            Current supply: {status.totalRemainingWeight.toFixed(0)}g 
            ({status.daysUntilShortage} days at current consumption rate)
          </p>
        </div>
      </div>
    </div>
  );
}