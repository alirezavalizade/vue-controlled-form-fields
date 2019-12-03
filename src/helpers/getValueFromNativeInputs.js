import getSelectedValues from './getSelectedValues';

const getValueFromNativeInputs = (e, currentValue, valueProp) => {
  const {
    target: { value, type, checked }
  } = e;
  if (type === 'checkbox') {
    if (valueProp === undefined) return !!checked;

    if (checked) {
      return Array.isArray(currentValue)
        ? currentValue.concat(valueProp)
        : [valueProp];
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
