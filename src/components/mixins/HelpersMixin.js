import filterFieldsByKey from '../../helpers/filterFieldsByKey';
import isUndefined from '../../helpers/isUndefined';

export default {
  methods: {
    filterFields(property, { checkForValue } = {}) {
      return filterFieldsByKey(
        this.fieldKeys,
        this.getFieldState,
        property,
        checkForValue
      );
    },
    isFieldExist(name) {
      return !isUndefined(this.fields[name]);
    }
  }
};
