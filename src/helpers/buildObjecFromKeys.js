import set from 'lodash.set';

const buildObjecFromKeys = (objWithKeys, getState, property) => {
  return Object.keys(objWithKeys).reduce((acc, name) => {
    const value = getState(name)[property];
    if (
      (Array.isArray(value) && value.some(v => typeof v === 'string')) ||
      !Array.isArray(value)
    ) {
      set(acc, name, value);
    }
    return acc;
  }, {});
};

export default buildObjecFromKeys;
