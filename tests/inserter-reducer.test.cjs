const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');
const filename = path.resolve('src/features/inserter/reducer/index.ts');
const loaded = new Module(filename, module);
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
loaded._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  filename
);
const { default: reducer, initialState } = loaded.exports;
const defaults = { name: '', summary: '', coverImage: '', imageFile: null, work: null };

test('every trip-field update initializes a complete trip from an empty state', () => {
  for (const [type, field, payload] of [
    ['SET_TRIP_NAME', 'name', 'Greece'],
    ['SET_TRIP_SUMMARY', 'summary', 'A summer trip'],
    ['SET_TRIP_COVER', 'coverImage', 'https://example.com/cover.jpg'],
    ['SET_TRIP_WITH_WORK', 'work', 'telework'],
    ['SET_TRIP_FILE', 'imageFile', null],
  ]) {
    const result = reducer(initialState, { type, payload });
    assert.deepEqual(result.trip, { ...defaults, [field]: payload });
    assert.equal(initialState.trip, undefined);
  }
});

test('trip updates preserve existing fields and reset clears the trip', () => {
  const named = reducer(initialState, { type: 'SET_TRIP_NAME', payload: 'Greece' });
  const updated = reducer(named, { type: 'SET_TRIP_SUMMARY', payload: 'Summer' });
  assert.deepEqual(updated.trip, { ...defaults, name: 'Greece', summary: 'Summer' });
  assert.equal(named.trip.summary, '');
  assert.equal(reducer(updated, { type: 'RESET_STATE' }).trip, undefined);
});
