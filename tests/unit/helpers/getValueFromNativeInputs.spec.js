import getValueFromNativeInputs from '../../../src/helpers/getValueFromNativeInputs.js';

describe('Helpers => getValueFromNativeInputs', () => {
  it('should return value from native input text', () => {
    const value = 'This is some dummy text';
    const event = {
      target: {
        value,
        type: 'text',
        checked: undefined
      }
    };
    expect(getValueFromNativeInputs(event)).toEqual(value);
  });

  it('should return value from single native input checkbox', () => {
    const checked = false;
    const event = {
      target: {
        type: 'checkbox',
        checked
      }
    };
    expect(getValueFromNativeInputs(event)).toEqual(checked);
  });

  it('should return array value from multiple native input checkbox with same name', () => {
    const checked = true;
    const event = {
      target: {
        type: 'checkbox',
        checked
      }
    };
    const valueProp = 'value 1';
    const expectedValue = [valueProp];
    expect(getValueFromNativeInputs(event, undefined, valueProp)).toEqual(
      expect.arrayContaining(expectedValue)
    );
  });

  it('should return value from native input radio', () => {
    const value = 'This is a value';
    const event = {
      target: {
        type: 'radio',
        value
      }
    };
    expect(getValueFromNativeInputs(event)).toEqual(value);
  });

  it('should return props value from native input radio', () => {
    const value = 'This is a value';
    const event = {
      target: {
        type: 'radio',
        value: undefined
      }
    };
    expect(getValueFromNativeInputs(event, undefined, value)).toEqual(value);
  });
});
