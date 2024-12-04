import { Coffee } from '../types/coffee';

const WORKING_DAYS_TO_RECEIVE = 3;
const AVERAGE_RESTING_WEEKS = 3;
const DAYS_IN_WEEK = 7;

export interface SupplyStatus {
  daysUntilShortage: number;
  totalRemainingWeight: number;
  shouldOrderNow: boolean;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'none';
}

export function calculateSupplyStatus(coffees: Coffee[]): SupplyStatus {
  const today = new Date();
  const totalRemainingWeight = coffees.reduce((sum, coffee) => 
    sum + (coffee.remainingWeight ?? coffee.weight), 0);
  
  // Calculate when unopened coffees will be ready
  const unopenedCoffees = coffees.filter(coffee => !coffee.isOpen);
  const readyDates = unopenedCoffees.map(coffee => {
    const roastDate = new Date(coffee.roastDate);
    const restDays = coffee.idealRestingTime * DAYS_IN_WEEK;
    const readyDate = new Date(roastDate);
    readyDate.setDate(readyDate.getDate() + restDays);
    return { date: readyDate, weight: coffee.weight };
  });

  // Sort ready dates chronologically
  readyDates.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calculate daily consumption rate based on opened coffees
  const openedCoffees = coffees.filter(coffee => coffee.isOpen);
  if (openedCoffees.length === 0) return {
    daysUntilShortage: Infinity,
    totalRemainingWeight,
    shouldOrderNow: false,
    message: "No opened coffee bags yet",
    severity: 'none'
  };

  const oldestOpenDate = Math.min(...openedCoffees.map(coffee => 
    new Date(coffee.roastDate).getTime()));
  const daysOpen = Math.ceil((today.getTime() - oldestOpenDate) / (1000 * 60 * 60 * 24));
  const consumedWeight = openedCoffees.reduce((sum, coffee) => 
    sum + (coffee.weight - (coffee.remainingWeight ?? 0)), 0);
//  const dailyConsumption = consumedWeight / daysOpen;
  const dailyConsumption = 31;

  // Calculate days until we need new coffee
  const daysUntilShortage = Math.floor(totalRemainingWeight / dailyConsumption);
  const daysNeededForNewCoffee = WORKING_DAYS_TO_RECEIVE + (AVERAGE_RESTING_WEEKS * DAYS_IN_WEEK);
  const shouldOrderNow = daysUntilShortage <= daysNeededForNewCoffee;

  // Determine severity and message
  let severity: SupplyStatus['severity'] = 'none';
  let message = '';

  if (daysUntilShortage <= WORKING_DAYS_TO_RECEIVE) {
    severity = 'high';
    message = 'Critical: Order coffee immediately!';
  } else if (shouldOrderNow) {
    severity = 'medium';
    message = 'Time to order new coffee to maintain optimal supply';
  } else if (daysUntilShortage <= daysNeededForNewCoffee * 1.5) {
    severity = 'low';
    message = 'Start looking for new coffee options';
  } else {
    message = 'Coffee supply is healthy';
  }

  return {
    daysUntilShortage,
    totalRemainingWeight,
    shouldOrderNow,
    message,
    severity
  };
}