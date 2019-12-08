import getSelectedValues from './getSelectedValues';

const getValueFromNativeInputs = (e, currentValue, valueProp) => {
  const {
    target: { value, type, checked }
  } = e;
  if (type === 'checkbox') {
    if (valueProp === undefined) return !!checked;

    if (Array.isArray(currentValue)) {
      if (checked) {
        return currentValue.concat(valueProp);
      } else {
        const v = currentValue;
        v.splice(currentValue.indexOf(valueProp), 1);
        return v;
      }
    } else {
      return [valueProp];
    }
  }
  if (type === 'radio') {
    return valueProp || value;
  }
  if (type === 'select-multiple') {
    return getSelectedValues(e.target.options);
  }
  return value;
};

export default getValueFromNativeInputs;
