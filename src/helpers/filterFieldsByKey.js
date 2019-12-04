import isUndefined from './isUndefined';

const filterFieldsByKey = (
  fieldKeys,
  getFieldState,
  property,
  checkForValue
) => {
  if (!Array.isArray(fieldKeys)) {
    return {};
  }
  return fieldKeys.reduce((acc, path) => {
    const value = getFieldState(path)[property];
    if (checkForValue && !isUndefined(value)) {
      acc[path] = true;
    } else if (value) {
      acc[path] = true;
    }
    return acc;
  }, {});
};

export default filterFieldsByKey;
