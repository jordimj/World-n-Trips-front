import { z, ZodIssue } from 'zod';
import { Day, Expense, Night, Spot } from '../types';

type MapFunc<T = any> = (val: T, index?: number, arr?: T[]) => T;
const isString = <T = any>(str: string | T): str is string => typeof str === 'string';

const groupBy = <T = any>(arr: T[], fn: MapFunc<T> | string, sortKey?: string) => {
  if (sortKey === undefined) {
    return arr.map(isString(fn) ? (val: any) => val[fn] : fn).reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
  }

  return arr
    .map(isString(fn) ? (val: any) => val[fn] : fn)
    ?.sort((a, b) => a[sortKey] - b[sortKey])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
};

const DaySchema = z.object({
  id: z.number(),
  date: z.string(),
  kilometers: z.string(),
});

const NightSchema = z.object({
  id: z.number(),
  date: z.string(),
  sleptAt: z.string(),
  extraInfo: z.string(),
  free: z.string(),
  city: z.string(),
  state: z.string(),
});

const SpotSchema = z.object({
  id: z.number(),
  name: z.string(),
  spotKind: z.string(),
  state: z.string(),
  shire: z.string(),
});

const ExpenseSchema = z.object({
  id: z.number(),
  date: z.string(),
  category: z.string().refine((category) => ALLOWED_CATEGORIES.includes(category), {
    message: 'Category not allowed',
  }),
  subcategory: z.string(),
  extraInfo: z.string().max(50),
  value: z.string(),
  currency: z.string().length(3),
  valueEur: z.string(),
});

const ALLOWED_CATEGORIES = [
  'ALLOTJAMENT',
  'ACTIVITATS',
  'BEGUDA',
  'MENJAR',
  'SALUT',
  'ASSEGURANÇA DE VIATGE',
  'TRANSPORT INTERNACIONAL',
  'ALTRES',
  'TELÈFON',
  'REGALS',
  'SUBMARINISME',
  'SIGHTSEEING',
  'TRANSPORT',
  'VISAT',
  'TREBALL',
];

const getSchema = (variant: 'day' | 'night' | 'spot' | 'expense') => {
  return {
    day: DaySchema,
    night: NightSchema,
    spot: SpotSchema,
    expense: ExpenseSchema,
  }[variant];
};

interface DayRow {
  dataKind: 'day';
  row: Day;
}

interface NightRow {
  dataKind: 'night';
  row: Night;
}

interface SpotRow {
  dataKind: 'spot';
  row: Spot;
}

interface ExpenseRow {
  dataKind: 'expense';
  row: Expense;
}

type Props = DayRow | NightRow | SpotRow | ExpenseRow;

function useDataValidation(props: Props) {
  const { dataKind, row } = props;

  const validation = getSchema(dataKind).safeParse(row);
  const validationErrors = validation.success
    ? []
    : groupBy<ZodIssue>(validation.error.issues, 'path');

  return {
    isValid: validation.success,
    validationErrors,
  };
}

export default useDataValidation;
