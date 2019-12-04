import isEmptyString from '../../../src/helpers/isEmptyString.js';

describe('Helpers => isEmptyString', () => {
  test('Object is not empty string', () => {
    expect(isEmptyString({})).toBe(false);
  });

  test('Boolean is not empty string', () => {
    expect(isEmptyString(false)).toBe(false);
  });

  test('None empty string is not empty string', () => {
    expect(isEmptyString('value')).toBe(false);
  });

  test('Number is not empty string', () => {
    expect(isEmptyString(1000)).toBe(false);
  });

  test('Array is not empty string', () => {
    expect(isEmptyString([])).toBe(false);
  });

  test('empty string is empty string', () => {
    expect(isEmptyString('')).toBe(true);
  });
});
