const composeFieldValidators = validators => {
  return (...args) =>
    validators.reduce(
      (error, validation) => error || validation(...args),
      undefined
    );
};

export default composeFieldValidators;
