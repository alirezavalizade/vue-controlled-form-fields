const getSelectedValues = (options = []) => {
  if (typeof options === 'object') {
    return Array.prototype.filter
      .call(options, ({ selected }) => {
        return !!selected;
      })
      .map(({ value }) => value);
  }
  return options.filter(({ selected }) => !!selected).map(({ value }) => value);
};

const getEventValue = (e, currentValue, valueProp) => {
  const {
    target: { value, type, checked }
  } = e;
  switch (type) {
    case 'checkbox': {
      if (valueProp === undefined) return !!checked;

      // we are maintaining an array, not just a boolean
      if (checked) {
        // add value to current array value
        return Array.isArray(currentValue)
          ? currentValue.concat(valueProp)
          : [valueProp];
      }
      // remove value from current array value
      if (!Array.isArray(currentValue)) return currentValue;

      const index = currentValue.indexOf(valueProp);
      if (index < 0) return currentValue;

      return currentValue.slice(0, index).concat(currentValue.slice(index + 1));
    }
    case 'radio': {
      return valueProp || value;
    }

    case 'select-multiple':
      return getSelectedValues(e.target.options);

    default:
      return value;
  }
};

const getValue = (e, currentValue, valueProp, allowNull) => {
  if (isUndefined(e) || isEmptyString(e)) {
    if (allowNull) return null;

    return undefined;
  }

  if (e && e.target) {
    const value = getEventValue(e, currentValue, valueProp);
    if ((isUndefined(value) || isEmptyString(value)) && allowNull) return null;
    if (isEmptyString(value)) return undefined;

    return value;
  }

  return e;
};

const isUndefined = value => typeof value === 'undefined';
const isEmptyString = value => value === '';

export default getValue;
