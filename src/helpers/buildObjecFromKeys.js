import set from 'lodash.set';

const buildObjecFromKeys = (objWithKeys, value) => {
  return Object.keys(objWithKeys).reduce((acc, name) => {
    if (!Array.isArray(value)) {
      set(acc, name, value);
    }
    return acc;
  }, {});
};

export default buildObjecFromKeys;
