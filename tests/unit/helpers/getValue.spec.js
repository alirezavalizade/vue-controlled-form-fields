import getValue from '../../../src/helpers/getValue.js';

describe('Helpers => getValue', () => {
  // undefined value
  it('should return null in case of event or value is undefined and allowNull parameters is true', () => {
    expect(getValue(undefined, undefined, undefined, true)).toEqual(null);
  });

  it('should return null in case of event or value empty string and allowNull parameters is true', () => {
    expect(getValue('', undefined, undefined, true)).toEqual(null);
  });

  it('should return undefined in case of event or value is undefined and allowNull parameters is false', () => {
    expect(getValue(undefined, undefined, undefined, false)).toEqual(undefined);
  });

  it('should return undefined in case of event or value empty string and allowNull parameters is false', () => {
    expect(getValue('', undefined, undefined, false)).toEqual(undefined);
  });

  // event and event.target + undefined value
  const eventWithEmptyStringValue = {
    target: {
      value: '',
      type: 'any'
    }
  };
  const eventWithEmptyUndefinedValue = {
    target: {
      value: '',
      type: 'any'
    }
  };
  const eventWithValue = {
    target: {
      value: 'This is a value',
      type: 'any'
    }
  };
  it('should return null in case of value of native input is undefined and allowNull parameters is true', () => {
    expect(
      getValue(eventWithEmptyUndefinedValue, undefined, undefined, true)
    ).toEqual(null);
  });

  it('should return null in case of value of native input empty string and allowNull parameters is true', () => {
    expect(
      getValue(eventWithEmptyStringValue, undefined, undefined, true)
    ).toEqual(null);
  });

  it('should return undefined in case of value of native input is undefined and allowNull parameters is false', () => {
    expect(
      getValue(eventWithEmptyUndefinedValue, undefined, undefined, false)
    ).toEqual(undefined);
  });

  it('should return undefined in case of value of native input empty string and allowNull parameters is false', () => {
    expect(
      getValue(eventWithEmptyStringValue, undefined, undefined, false)
    ).toEqual(undefined);
  });

  // value with none native input
  it('should return value in case of value is not event of native input', () => {
    expect(getValue(eventWithValue)).toEqual(eventWithValue.target.value);
  });
});
