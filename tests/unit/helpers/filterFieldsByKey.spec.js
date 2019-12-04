import filterFieldsByKey from '../../../src/helpers/filterFieldsByKey.js';
import fieldState from '../../../src/helpers/fieldState.js';

describe('Helpers => buildObjecFromKeys', () => {
  it('should get the specific value by calling getFieldState()[property] and return an object of paths which have only true value', () => {
    const property = 'visited';
    const getState = jest.fn(() => ({
      ...fieldState({ name: Math.random() }),
      [property]: true
    }));
    const checkForValue = false;
    const fieldKeys = ['a.b.c', 'a.c.b', 'b'];
    const expectObject = {
      'a.b.c': true,
      'a.c.b': true,
      b: true
    };
    expect(
      filterFieldsByKey(fieldKeys, getState, property, checkForValue)
    ).toEqual(expectObject);
  });

  it('should get the specific value by calling getFieldState()[property] and return an object of paths which have none undefined value', () => {
    const property = 'value';
    const getState = jest.fn(() => ({
      ...fieldState({ name: Math.random() }),
      [property]: 'A value'
    }));
    const checkForValue = true;
    const fieldKeys = ['a.b.c', 'a.c.b'];
    const expectObject = {
      'a.b.c': true,
      'a.c.b': true
    };
    expect(
      filterFieldsByKey(fieldKeys, getState, property, checkForValue)
    ).toEqual(expectObject);
  });

  it('should get the specific value by calling getFieldState()[property] and return an empty object when the value(s) are undefined', () => {
    const property = 'value';
    const getState = jest.fn(() => ({
      ...fieldState({ name: Math.random() }),
      [property]: undefined
    }));
    const checkForValue = true;
    const fieldKeys = ['a.b.c', 'a.c.b'];
    expect(
      filterFieldsByKey(fieldKeys, getState, property, checkForValue)
    ).toEqual({});
  });
});
