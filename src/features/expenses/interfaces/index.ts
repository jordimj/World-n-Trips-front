import { Options } from '@/template/components/Autocomplete/Autocomplete';

interface Expense {
  id: number;
  day: string;
  trip: string;
  country: string;
  category: string;
  subcategory: string;
  details: string;
  value: string;
  currency: string;
  valueEur: string;
}

export interface Expenses extends Array<Expense> {}

export type OrderBy =
  | 'day'
  | 'category'
  | 'subcategory'
  | 'details'
  | 'valueEur'
  | 'country'
  | 'trip';

export interface ExpensesFilters {
  query?: string;
  from?: Date | null;
  to?: Date | null;
  countries?: Options;
  categories?: Array<number>;
  subcategories?: Array<number>;
  currencies?: Array<string>;
  price: Array<number>;
  orderBy?: OrderBy;
  order?: 'asc' | 'desc';
}
