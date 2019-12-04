import composeFieldValidators from '../../../src/helpers/composeFieldValidators.js';

describe('Helpers => composeFieldValidators', () => {
  const required = () => 'Required';
  const shouldBeString = () => 'Should be string';
  const shouldBeNumber = () => 'Should be number';
  it('should return first result of array of functions', () => {
    expect(
      composeFieldValidators([required, shouldBeString, shouldBeNumber])({})
    ).toEqual('Required');
  });

  it('should return first result of array of functions', () => {
    expect(
      composeFieldValidators([shouldBeString, required, shouldBeNumber])({})
    ).toEqual('Should be string');
  });

  it('should return first result of array of functions', () => {
    expect(
      composeFieldValidators([shouldBeNumber, shouldBeString, required])({})
    ).toEqual('Should be number');
  });
});
