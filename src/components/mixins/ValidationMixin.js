import get from 'lodash.get';
import isUndefined from '../../helpers/isUndefined';
import keyify from '../../helpers/keyify';
import composeFieldValidators from '../../helpers/composeFieldValidators';

export default {
  methods: {
    handleFormValidations() {
      if (this.validate) {
        const errors = this.validate(this.values);
        if (typeof errors === 'object') {
          const keyifiedErrors = keyify(errors);
          for (let i = 0; i < keyifiedErrors.length; i++) {
            this.setIn(
              keyifiedErrors[i],
              'error',
              get(errors, keyifiedErrors[i])
            );
          }
          for (let i = 0; i < this.fieldKeys.length; i++) {
            if (
              !keyifiedErrors.includes(this.fieldKeys[i]) &&
              !isUndefined(this.getIn(this.fieldKeys[i], 'error')) &&
              !this.fields[this.fieldKeys[i]].validate
            ) {
              this.setIn(this.fieldKeys[i], 'error', undefined);
            }
          }
        }
      }
    },
    handleFieldValidations(name) {
      const state = this.fields[name];
      if (state.validate) {
        const error = Array.isArray(state.validate)
          ? composeFieldValidators(state.validate)(state.value, this.values)
          : state.validate(state.value, this.values);
        if (error || (!error && state.error)) {
          this.setIn(name, 'error', error);
        }
      }
    }
  }
};
