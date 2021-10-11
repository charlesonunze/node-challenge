import { capitalize } from '@nc/utils/common';
import { Expense } from './types';

const publicFields = [
  'merchant_name',
  'amount_in_dkk',
  'currency',
  'date_created',
  'status',
];

export function secureTrim(expense: Expense[]): string {
  return JSON.stringify(expense, publicFields);
}

export function toDKK(amount_in_cents: number): number {
  // this should probably be fetched as the value is never constant
  // not sure why the amount isn't in DKK/øre in the first place
  // guess it's part of the challenge :)
  const exchangeRate = 6;
  const amountInDKK = (exchangeRate * amount_in_cents).toFixed(2);

  return parseFloat(amountInDKK);
}

export function format(expense: any): Expense {
  return {
    merchant_name: capitalize(expense.merchant_name),
    amount_in_cents: expense.amount_in_cents,
    amount_in_dkk: toDKK(expense.amount_in_cents),
    currency: expense.currency,
    date_created: expense.date_created.toDateString(),
    status: expense.status,
  };
}
