const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const Excel = require('exceljs');
const filename = require('node:path').resolve('src/features/inserter/utils/fullTrip.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const loaded = new Module(filename, module);
loaded._compile(compiled, filename);
const { parseWorkbook, normalize, validateSheets } = loaded.exports;

function sample() {
  const workbook = new Excel.Workbook();
  workbook.addWorksheet('Dies').addRows([
    ['date', 'kilometers'],
    [new Date('2026-09-18T00:00:00Z'), 8.7],
    [null, { formula: 'SUM(B2:B2)', result: 8.7 }],
  ]);
  workbook.addWorksheet('Nits').addRows([
    ['date', 'city', 'sleptAt', 'free', 'extraInfo'],
    [new Date('2026-09-18T00:00:00Z'), 'Avió', '', true, ''],
  ]);
  workbook.addWorksheet('Despeses').addRows([
    ['date', 'category', 'subcategory', 'extraInfo', 'value', 'currency', 'valueEur', '', ''],
    [
      new Date('2026-09-18T00:00:00Z'),
      '\tBEGUDA',
      'Aigua',
      'Water',
      10,
      'CNY',
      { formula: '1+3', result: 4 },
      '',
      'TOTAL',
    ],
    ['', '', '', '', '', '', '', '', 1000],
  ]);
  workbook.addWorksheet('Spots').addRows([
    ['name', 'spotKind', 'state', 'shire', '', ''],
    ['Beijing', 'City', 'CN-BJ', '', '', 'CN-BJ'],
    ['', '', '', '', '', 'Summary'],
  ]);
  return workbook;
}

test('reads a real xlsx round-trip with Catalan sheets, typed dates, cached formulas and side summaries', async () => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(await sample().xlsx.writeBuffer());
  const sheets = parseWorkbook(workbook);
  assert.deepEqual(
    sheets.map((sheet) => [sheet.kind, sheet.rows.length]),
    [
      ['day', 1],
      ['night', 1],
      ['expense', 1],
      ['spot', 1],
    ]
  );
  assert.equal(sheets[0].rows[0].date, '18/09/2026');
  assert.equal(sheets[0].rows[0].kilometers, '8.7');
  assert.equal(sheets[1].rows[0].free, '1');
  assert.equal(sheets[2].rows[0].category, 'BEGUDA');
  assert.equal(sheets[2].rows[0].valueEur, '4');
  assert.deepEqual(validateSheets(sheets, { BEGUDA: ['Aigua'] }), []);
});

test('normalizes localized amounts without stripping decimal points from numeric cells', () => {
  assert.equal(normalize(71.5, 'value'), '71.5');
  assert.equal(normalize('1.234,56 €', 'valueEur'), '1234.56');
  assert.equal(normalize('2026-09-18', 'date'), '18/09/2026');
  assert.equal(normalize(0, 'date', true), '01/01/1904');
  assert.equal(normalize(0, 'free'), '0');
});

test('blocks missing days, impossible dates, duplicate days and invalid expense categories', () => {
  const sheets = parseWorkbook(sample());
  sheets[0].rows.push({ ...sheets[0].rows[0], sourceRow: '3' });
  sheets[1].rows[0].date = '31/02/2026';
  const errors = validateSheets(sheets, {});
  assert.ok(errors.some((error) => error.includes('duplicate day')));
  assert.ok(errors.some((error) => error.includes('invalid date')));
  assert.ok(errors.some((error) => error.includes('missing from Days')));
  assert.ok(errors.some((error) => error.includes('unknown category')));
});

test('rejects unreadable formulas and missing day headers', () => {
  assert.throws(() => normalize({ formula: '1+1' }, 'valueEur'), /no saved result/);
  assert.throws(() => parseWorkbook(new Excel.Workbook()), /No days table/);
  const workbook = sample();
  workbook.addWorksheet('Other days').addRows([
    ['date', 'kilometers'],
    ['18/09/2026', 1],
  ]);
  assert.throws(() => parseWorkbook(workbook), /More than one Days/);
});

test('accepts categories without children and rejects a non-empty subcategory for them', () => {
  const sheets = parseWorkbook(sample());
  const expense = sheets.find((sheet) => sheet.kind === 'expense').rows[0];
  expense.category = 'ASSEGURANÇA DE VIATGE';
  expense.subcategory = '';
  const categories = { 'ASSEGURANÇA DE VIATGE': [] };
  assert.deepEqual(validateSheets(sheets, categories), []);
  expense.subcategory = 'Unknown';
  assert.ok(
    validateSheets(sheets, categories).some((error) =>
      error.includes('subcategory does not belong')
    )
  );
});

test('reads provinceName and validates new, reused and conflicting province codes', () => {
  const workbook = sample();
  const spots = workbook.getWorksheet('Spots');
  spots.getCell('E1').value = 'provinceName';
  spots.getCell('E2').value = 'Beijing';
  const sheets = parseWorkbook(workbook);
  const sheet = sheets.find((sheet) => sheet.kind === 'spot');
  assert.equal(sheet.rows[0].provinceName, 'Beijing');
  assert.deepEqual(validateSheets(sheets, { BEGUDA: ['Aigua'] }, {}), []);
  sheet.rows.push({ ...sheet.rows[0], sourceRow: '3', provinceName: '' });
  assert.deepEqual(validateSheets(sheets, { BEGUDA: ['Aigua'] }, {}), []);
  sheet.rows[0].provinceName = '';
  assert.ok(
    validateSheets(sheets, undefined, {}).some((error) =>
      error.includes('provinceName is required')
    )
  );
  assert.deepEqual(validateSheets(sheets, { BEGUDA: ['Aigua'] }, { 'CN-BJ': 'Beijing' }), []);
  sheet.rows[0].provinceName = 'Other';
  assert.ok(
    validateSheets(sheets, undefined, { 'CN-BJ': 'Beijing' }).some((error) =>
      error.includes('conflicting province name')
    )
  );
  sheet.rows[1].provinceName = 'Beijing';
  assert.ok(
    validateSheets(sheets, undefined, {}).some((error) =>
      error.includes('conflicting province name')
    )
  );
});
