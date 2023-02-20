export type ImportData = TableData | string;
export type TableData = Days | Nights | Expenses | Spots;

export type KindOfData = TableKind | 'journal';
export type TableKind = 'day' | 'night' | 'expense' | 'spot';

export interface Day {
  id?: number;
  date: string;
  kilometers: number;
  tripId?: number;
}

export interface Days extends Array<Day> {}

export interface Night {
  id?: number;
  date: string;
  sleptAt: string;
  extraInfo: string;
  free: boolean;
  city: string;
  state?: string;
  countryId?: number;
}

export interface Nights extends Array<Night> {}

export interface Expense {
  id?: number;
  date: string;
  category: string;
  subcategory: string;
  extraInfo: string;
  value?: number;
  currency?: string;
  valueEur: number;
  countryId?: number;
}

export interface Expenses extends Array<Expense> {}

export interface Spot {
  id?: number;
  name: string;
  spotKind: string;
  state: string;
  shire: string;
  countryId?: number;
}

export interface Spots extends Array<Spot> {}

export interface Journal {
  id?: number;
  title: string;
  text: string;
  dayId: number;
}
