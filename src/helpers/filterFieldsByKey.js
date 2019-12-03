const filterFieldsByKey = (
  fieldKeys,
  getFieldState,
  property,
  checkForValue
) => {
  return fieldKeys.reduce((acc, path) => {
    const value = getFieldState(path)[property];
    if (checkForValue && typeof value !== 'undefined') {
      acc[path] = true;
    } else if (value) {
      acc[path] = true;
    }
    return acc;
  }, {});
};

export default filterFieldsByKey;
