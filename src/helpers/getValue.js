import isUndefined from './isUndefined';
import isEmptyString from './isEmptyString';
import getValueFromNativeInputs from './getValueFromNativeInputs';

const getValue = (e, currentValue, valueProp, allowNull) => {
  if (isUndefined(e) || isEmptyString(e)) {
    if (allowNull) return null;

    return undefined;
  }

  if (e && e.target) {
    const value = getValueFromNativeInputs(e, currentValue, valueProp);
    if ((isUndefined(value) || isEmptyString(value)) && allowNull) return null;
    if (isEmptyString(value)) return undefined;

    return value;
  }

  return e;
};

export default getValue;
