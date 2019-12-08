const REGEX_EMAIL = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const isEmpty = v => typeof v === 'undefined';

export const required = v => {
  if (
    isEmpty(v) ||
    (typeof v === 'boolean' && v === false) ||
    (Array.isArray(v) && v.length === 0)
  ) {
    return 'Required';
  }
  return undefined;
};

export const email = v => {
  const isNotValid = !REGEX_EMAIL.test(String(v).toLowerCase());
  if (isNotValid) {
    return 'Invalid Email Address';
  }
  return undefined;
};

export const shouldBeMatchWith = (name, prefixMessage) => (
  value,
  formValues
) => {
  if (!value) {
    return false;
  }
  return value === formValues[name]
    ? undefined
    : `${prefixMessage || 'Passwords'} are not match`;
};
