interface Expense {
  id: number;
  day: string;
  country: string;
  category: string;
  subcategory: string;
  infoExtra: string;
  value: string;
  currency: string;
  valueEur: string;
}

export interface Expenses extends Array<Expense> {}

export interface ExpensesFilters {
  query?: string;
  page: number;
  from?: Date | null;
  to?: Date | null;
  countries?: Array<number>;
  categories?: Array<number>;
  subcategories?: Array<number>;
  currency?: string;
}
