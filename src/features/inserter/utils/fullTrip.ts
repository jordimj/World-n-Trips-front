import type { CellValue, Workbook } from 'exceljs';
import type { TableKind } from '../types';

export const KINDS: TableKind[] = ['day', 'night', 'expense', 'spot'];
export const LABELS = { day: 'Days', night: 'Nights', expense: 'Expenses', spot: 'Spots' };
export interface TripSheet {
  kind: TableKind;
  name: string;
  rows: Record<string, string>[];
}
const COLUMNS: Record<TableKind, string[]> = {
  day: ['date', 'kilometers'],
  night: ['date', 'city', 'sleptAt', 'free', 'extraInfo', 'state'],
  expense: ['date', 'category', 'subcategory', 'extraInfo', 'value', 'currency', 'valueEur'],
  spot: ['name', 'spotKind', 'state', 'shire', 'provinceName'],
};
const REQUIRED: Record<TableKind, string[]> = {
  day: ['date', 'kilometers'],
  night: ['date', 'city', 'sleptAt', 'free'],
  expense: ['date', 'category', 'valueEur'],
  spot: ['name', 'spotKind'],
};

function scalar(value: CellValue): string | number | boolean | Date {
  if (value == null) return '';
  if (typeof value !== 'object' || value instanceof Date) return value;
  if ('error' in value) throw new Error(`Excel cell contains ${value.error}`);
  if ('formula' in value || 'sharedFormula' in value) {
    if (value.result === undefined)
      throw new Error('A formula has no saved result. Recalculate and export the workbook again.');
    return scalar(value.result);
  }
  if ('richText' in value) return value.richText.map((part) => part.text).join('');
  if ('text' in value) return value.text;
  return '';
}

export function normalize(value: CellValue, key: string, date1904 = false): string {
  let raw = scalar(value);
  if (key === 'date') {
    if (typeof raw === 'number')
      raw = new Date(
        Date.UTC(date1904 ? 1904 : 1899, date1904 ? 0 : 11, date1904 ? 1 : 30) + raw * 86400000
      );
    if (raw instanceof Date) {
      if (!Number.isFinite(raw.getTime())) throw new Error('Invalid Excel date');
      return `${String(raw.getUTCDate()).padStart(2, '0')}/${String(raw.getUTCMonth() + 1).padStart(2, '0')}/${raw.getUTCFullYear()}`;
    }
    const text = String(raw).trim();
    const iso = /^(\d{4})-(\d{2})-(\d{2})(?:[ T].*)?$/.exec(text);
    if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
    const local = /^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/.exec(text);
    return local ? `${local[1].padStart(2, '0')}/${local[2].padStart(2, '0')}/${local[3]}` : text;
  }
  if (key === 'free') {
    if (raw === true || raw === 1 || /^(1|true|yes|sí|si)$/i.test(String(raw).trim())) return '1';
    if (raw === false || raw === 0 || /^(0|false|no)$/i.test(String(raw).trim())) return '0';
  }
  if (['kilometers', 'value', 'valueEur'].includes(key)) {
    if (typeof raw === 'number') return String(Math.round(raw * 1e8) / 1e8);
    let text = String(raw).replace(/[€$\s]/g, '');
    if (text.includes(',')) text = text.replace(/\./g, '').replace(',', '.');
    return text;
  }
  return String(raw).trim();
}

export function parseWorkbook(workbook: Workbook): TripSheet[] {
  const sheets: TripSheet[] = [];
  for (const sheet of workbook.worksheets) {
    let headers: string[] = [];
    let kind: TableKind | undefined;
    let headerRow = 0;
    for (let i = 1; i <= Math.min(sheet.rowCount, 30); i++) {
      const candidate = Array.from({ length: sheet.columnCount }, (_, j) =>
        String(scalar(sheet.getRow(i).getCell(j + 1).value)).trim()
      );
      kind = KINDS.find((item) => REQUIRED[item].every((column) => candidate.includes(column)));
      if (kind) {
        headers = candidate;
        headerRow = i;
        break;
      }
    }
    if (!kind) {
      const knownNames = /^(dies|days?|nits|nights?|despeses|expenses?|spots?)$/i;
      if (knownNames.test(sheet.name.trim())) {
        throw new Error(
          `${sheet.name}: could not find the required column headers. Use the same headers as the CSV importer.`
        );
      }
      continue;
    }
    if (sheets.some((item) => item.kind === kind))
      throw new Error(
        `More than one ${LABELS[kind]} table found. Keep one table per kind in this first version.`
      );
    const indices = COLUMNS[kind].map((key) => headers.indexOf(key));
    const rows: Record<string, string>[] = [];
    for (let i = headerRow + 1; i <= sheet.rowCount; i++) {
      const row = sheet.getRow(i);
      if (
        !indices.some(
          (index) =>
            index >= 0 &&
            row.getCell(index + 1).value != null &&
            row.getCell(index + 1).value !== ''
        )
      )
        continue;
      const result: Record<string, string> = { sourceRow: String(i) };
      COLUMNS[kind].forEach((key, j) => {
        try {
          result[key] =
            indices[j] < 0
              ? ''
              : normalize(row.getCell(indices[j] + 1).value, key, workbook.properties.date1904);
        } catch (error) {
          throw new Error(`${sheet.name}, row ${i}, ${key}: ${(error as Error).message}`);
        }
      });
      // Numbers exports a SUM footer beneath the dated days in the sample workbook.
      const kilometers =
        kind === 'day' ? row.getCell(headers.indexOf('kilometers') + 1).value : null;
      if (
        kind === 'day' &&
        result.date === '' &&
        kilometers &&
        typeof kilometers === 'object' &&
        'formula' in kilometers &&
        typeof kilometers.formula === 'string' &&
        /^SUM\(/i.test(kilometers.formula)
      )
        continue;
      if (COLUMNS[kind].some((key) => result[key] !== '')) rows.push(result);
    }
    sheets.push({ kind, name: sheet.name, rows });
  }
  if (!sheets.some((sheet) => sheet.kind === 'day' && sheet.rows.length))
    throw new Error('No days table found. Include date and kilometers column headers.');
  return KINDS.flatMap((kind) =>
    sheets.filter((sheet) => sheet.kind === kind && sheet.rows.length)
  );
}

export function validDate(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const date = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  return (
    date.getUTCFullYear() === Number(match[3]) &&
    date.getUTCMonth() === Number(match[2]) - 1 &&
    date.getUTCDate() === Number(match[1])
  );
}

export function validateSheets(
  sheets: TripSheet[],
  categories?: Record<string, string[]>,
  provinces?: Record<string, string>
): string[] {
  const errors: string[] = [];
  const days = new Set<string>();
  const provinceNames = new Map<string, string>();
  for (const sheet of sheets.filter((sheet) => sheet.kind === 'spot')) {
    for (const row of sheet.rows) {
      const name = (row.provinceName ?? '').trim();
      if (row.state && name && !provinceNames.has(row.state.trim()))
        provinceNames.set(row.state.trim(), name);
    }
  }
  for (const sheet of sheets)
    for (const row of sheet.rows) {
      const prefix = `${sheet.name}, row ${row.sourceRow}`;
      if (sheet.kind !== 'spot' && !validDate(row.date))
        errors.push(`${prefix}: invalid date (use DD/MM/YYYY).`);
      if (sheet.kind === 'day') {
        if (days.has(row.date)) errors.push(`${prefix}: duplicate day ${row.date}.`);
        days.add(row.date);
      }
      for (const key of sheet.kind === 'day'
        ? ['kilometers']
        : sheet.kind === 'expense'
          ? ['valueEur', 'value']
          : []) {
        if (key === 'value' && row[key] === '') continue;
        if (row[key] === '' || !Number.isFinite(Number(row[key])) || Number(row[key]) < 0)
          errors.push(`${prefix}: ${key} must be a non-negative number.`);
      }
      if (sheet.kind === 'night') {
        if (!['0', '1'].includes(row.free)) errors.push(`${prefix}: free must be 0 or 1.`);
        if (
          !row.city ||
          row.city.length > 25 ||
          row.sleptAt.length > 20 ||
          row.extraInfo.length > 60
        )
          errors.push(
            `${prefix}: check city (1–25 characters), sleptAt (up to 20) and extraInfo (up to 60).`
          );
      }
      if (sheet.kind === 'spot' && (!row.name || !row.spotKind))
        errors.push(`${prefix}: name and spotKind are required.`);
      if (sheet.kind === 'spot') {
        const code = row.state.trim();
        const name = (row.provinceName ?? '').trim();
        if (!code && name) errors.push(`${prefix}: provinceName needs a state code.`);
        if (code && provinces && !Object.hasOwn(provinces, code) && !provinceNames.has(code))
          errors.push(`${prefix}: provinceName is required for new province ${code}.`);
        const existingName = provinces?.[code] ?? provinceNames.get(code);
        if (code && name && existingName && existingName !== name)
          errors.push(
            `${prefix}: conflicting province name for ${code} (expected ${existingName}).`
          );
        if (name.length > 255 || code.length > 255)
          errors.push(`${prefix}: province code and name must be at most 255 characters.`);
      }
      if (sheet.kind === 'expense') {
        if (!/^[A-Z]{3}$/.test(row.currency))
          errors.push(`${prefix}: currency must be a three-letter code.`);
        if (row.extraInfo.length > 50) errors.push(`${prefix}: extraInfo exceeds 50 characters.`);
        if (categories && !(row.category in categories))
          errors.push(`${prefix}: unknown category ${row.category}.`);
        else if (
          categories &&
          row.subcategory &&
          !categories[row.category].includes(row.subcategory)
        )
          errors.push(`${prefix}: subcategory does not belong to ${row.category}.`);
      }
    }
  for (const sheet of sheets.filter((item) => ['night', 'expense'].includes(item.kind)))
    for (const row of sheet.rows) {
      if (!days.has(row.date))
        errors.push(`${sheet.name}, row ${row.sourceRow}: ${row.date} is missing from Days.`);
    }
  return errors;
}
