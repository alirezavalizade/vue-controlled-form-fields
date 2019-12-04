import buildObjecFromKeys from '../../../src/helpers/buildObjecFromKeys.js';
import fieldState from '../../../src/helpers/fieldState.js';

describe('Helpers => buildObjecFromKeys', () => {
  const value = Math.random();
  const property = 'value';
  const getState = jest.fn(() => fieldState({ name: Math.random(), value }));
  const expectObject = {
    a: {
      b: {
        c: {
          d: {
            e: value
          }
        }
      }
    }
  };

  it('should get the specific value by calling getFieldState()[property] and return an object which build from paths to nested properties', () => {
    const fields = {
      'a.b.c.d.e': {}
    };
    expect(buildObjecFromKeys(fields, getState, property)).toEqual(
      expectObject
    );
  });

  it('should get the specific value by calling getFieldState()[property] and return an object including Arrays which build from paths to nested properties', () => {
    const expectedObjectIncludesArrays = {
      a: [value, value, value, value]
    };
    const fields = {
      'a[0]': {},
      'a[1]': {},
      'a[2]': {},
      'a[3]': {}
    };
    expect(buildObjecFromKeys(fields, getState, property)).toEqual(
      expectedObjectIncludesArrays
    );
  });
});
