const keyify = (obj, prefix = '', prevPrefix = '') => {
  return Object.keys(obj).reduce((res, key) => {
    if (Array.isArray(obj[key])) {
      return [...res, ...keyify(obj[key], `${prefix}${key}[`, `]`)];
    } else if (typeof obj[key] === 'object') {
      if (!Object.keys(obj[key]).length && typeof Number(key) === 'number') {
        return [...res, `${prefix}${key}]`];
      } else if (!obj[key].hasOwnProperty('touched')) {
        return [...res, ...keyify(obj[key], `${prefix}${key}.`, prevPrefix)];
      }
    }
    return [...res, `${prefix}${key}${prevPrefix}`];
  }, []);
};

export default keyify;
