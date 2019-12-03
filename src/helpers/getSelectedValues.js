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

export default getSelectedValues;
