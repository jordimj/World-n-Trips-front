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
  countries?: Array<number>;
  categories?: Array<number>;
  subcategories?: Array<number>;
  currencies?: Array<string>;
  price: Array<number>;
  orderBy?: OrderBy;
  order?: 'asc' | 'desc';
}
