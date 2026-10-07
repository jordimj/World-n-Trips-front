const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');
const filename = path.resolve('src/features/trips/utils/date.ts');
const loaded = new Module(filename, module);
loaded._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  filename
);
const { getTripRange } = loaded.exports;

test('counts inclusive calendar days across DST and year boundaries', () => {
  assert.deepEqual(getTripRange(new Date('2026-03-28'), new Date('2026-03-30')), {
    from: '2026-03-28',
    to: '2026-03-30',
    days: 3,
  });
  assert.equal(getTripRange(new Date('2025-12-31'), new Date('2026-01-01')).days, 2);
  assert.equal(getTripRange(new Date('2026-10-02'), new Date('2026-10-02')).days, 1);
});

test('retains API date boundaries regardless of local timezone and skips undated trips', () => {
  const previous = process.env.TZ;
  try {
    for (const zone of ['America/Los_Angeles', 'Europe/Zurich', 'Pacific/Auckland']) {
      process.env.TZ = zone;
      assert.deepEqual(getTripRange(new Date('2026-09-18'), new Date('2026-09-27')), {
        from: '2026-09-18',
        to: '2026-09-27',
        days: 10,
      });
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
  assert.deepEqual(getTripRange(null, null), { from: undefined, to: undefined, days: 0 });
});
