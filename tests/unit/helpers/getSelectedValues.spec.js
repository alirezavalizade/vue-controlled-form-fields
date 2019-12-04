import getSelectedValues from '../../../src/helpers/getSelectedValues.js';

describe('Helpers => getSelectedValues', () => {
  it('should return selected values from options from native select', () => {
    const options = [
      {
        selected: true,
        value: 'option 1'
      },
      {
        selected: false,
        value: 'option 2'
      },
      {
        selected: false,
        value: 'option 3'
      }
    ];

    const expectResult = ['option 1'];
    expect(getSelectedValues(options)).toEqual(
      expect.arrayContaining(expectResult)
    );
  });
});
