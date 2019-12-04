import isUndefined from '../../../src/helpers/isUndefined.js';

describe('Helpers => isUndefined', () => {
  test('Object is not undefined', () => {
    expect(isUndefined({})).toBe(false);
  });

  test('Boolean is not undefined', () => {
    expect(isUndefined(false)).toBe(false);
  });

  test('String is not undefined', () => {
    expect(isUndefined('')).toBe(false);
  });

  test('Number is not undefined', () => {
    expect(isUndefined(1000)).toBe(false);
  });

  test('Array is not undefined', () => {
    expect(isUndefined([])).toBe(false);
  });

  test('Undefined is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
});
