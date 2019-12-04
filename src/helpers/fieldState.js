const fieldState = ({ name, value, validate }) => ({
  name,
  value,
  validate,
  active: false,
  dirty: false,
  error: undefined,
  invalid: false,
  modified: false,
  pristine: false,
  touched: false,
  valid: false,
  visited: false
});

export default fieldState;
