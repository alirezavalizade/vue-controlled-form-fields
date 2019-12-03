import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import keyify from '../../helpers/keyify';

export default {
  created() {
    this.initialize(this.initialValues);
  },
  watch: {
    initialValues(newValue, prevValue) {
      if (!isEqual(newValue, prevValue)) {
        this.initialize(newValue);
        if (!this.keepDirtyOnReinitialize) {
          this.setInAll({ dirty: false });
        }
      }
    }
  },
  methods: {
    initialize(initialValues) {
      const newKeys = keyify(initialValues);
      for (let i = 0; i < newKeys.length; i++) {
        const path = newKeys[i].includes('[')
          ? newKeys[i].substring(0, newKeys[i].indexOf('['))
          : newKeys[i];

        if (this.isFieldExist(path)) {
          this.change(path, get(initialValues, path));
        } else {
          this.registerField(path, {
            value: get(initialValues, path)
          });
        }
      }
    }
  }
};
