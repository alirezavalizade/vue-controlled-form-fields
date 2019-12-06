import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import buildObjecFromKeys from '../../helpers/buildObjecFromKeys';
import fieldState from '../../helpers/fieldState';

export default {
  data() {
    return {
      fields: {},
      active: undefined,
      submitting: false,
      form: {
        handleSubmit: this.handleSubmit,
        initialize: this.initialize,
        reset: this.reset,
        change: this.changeFromForm,
        focus: this.focus,
        blur: this.blur,
        subscribe: this.handleSubscribe,
        getFieldState: this.getFieldState,
        getFormState: this.getFormState,
        getRegisteredFields: this.getRegisteredFields
      }
    };
  },
  computed: {
    formState() {
      return {
        ...this.formStateReport,
        form: this.form
      };
    },
    formStateReport() {
      const keys = Object.keys(this.subscription);
      return keys.reduce((acc, key) => {
        acc[key] = this[key];
        return acc;
      }, {});
    },
    dirty() {
      return !!Object.keys(this.dirtyFields).length;
    },
    valid() {
      return Object.keys(this.errors).length === 0;
    },
    invalid() {
      return !this.valid;
    },
    visited() {
      return Object.keys(this.visitedFields).length > 0;
    },
    modified() {
      return Object.keys(this.modifiedFields).length > 0;
    },
    pristine() {
      return (
        Object.keys(this.filterFields('pristine')).length ===
        this.fieldKeys.length
      );
    },
    touched() {
      return Object.keys(this.filterFields('touched')).length > 0;
    },
    dirtyFields() {
      return this.filterFields('dirty');
    },
    modifiedFields() {
      return this.filterFields('modified');
    },
    visitedFields() {
      return this.filterFields('visited');
    },
    errors() {
      return buildObjecFromKeys(
        this.filterFields('error', { checkForValue: true }),
        this.getIn,
        'error'
      );
    },
    values() {
      return buildObjecFromKeys(
        this.filterFields('value', { checkForValue: true }),
        this.getIn,
        'value'
      );
    },
    fieldKeys() {
      return this.getRegisteredFields();
    }
  },
  methods: {
    registerField(name, config) {
      if (!this.isFieldExist(name)) {
        this.fields = {
          ...this.fields,
          ...this.initFieldState(name, config)
        };
      } else {
        this.setConfig(name, config);
      }
      this.handleFormValidations();
      this.handleFieldValidations(name);
    },
    unregisterField(name) {
      if (this.destroyOnUnregister) {
        this.fields[name] = undefined;
      }
    },
    initFieldState(name, { value = undefined, validate } = {}) {
      return {
        [name]: fieldState({ name, value, validate })
      };
    },
    setConfig(name, config = {}) {
      if (!isEqual(config.validate, this.fields[name].validate)) {
        this.setIn(name, 'validate', config.validate);
      }
    },
    getFieldState(name) {
      const state = get(this.fields, name);
      const pristine =
        typeof this.initialValues === 'object'
          ? isEqual(get(this.initialValues, name), get(state, 'value'))
          : true;
      return {
        ...state,
        validate: undefined,
        dirty: !pristine,
        pristine
      };
    },
    getFormState() {
      return this.formStateReport;
    },
    getRegisteredFields() {
      return Object.keys(this.fields);
    },
    change(name, value) {
      this.setIn(name, 'value', value);
      if (!this.getIn(name, 'modified')) {
        this.setIn(name, 'modified', true);
      }
      if (!this.validateOnBlur) {
        this.handleFormValidations();
        this.handleFieldValidations(name);
      }
    },
    changeFromForm(name, value) {
      // need to register
      if (!this.fields.hasOwnProperty(name)) {
        this.registerField(name, value);
      } else {
        this.change(name, value);
      }
    },
    handleSubmit() {
      this.setInAll({ touched: true });
      if (this.valid) {
        this.submitting = true;
        try {
          return this.submit(this.values);
        } finally {
          this.submitting = false;
        }
      }
    },
    reset() {
      this.setInAll({
        value: undefined,
        dirty: false,
        error: undefined,
        invalid: false,
        modified: false,
        pristine: false,
        touched: false,
        valid: false,
        visited: false
      });
    },
    focus(name) {
      this.active = name;
      this.setIn(name, 'active', true);
      this.setIn(name, 'visited', true);
    },
    blur(name) {
      this.active = undefined;
      this.setIn(name, 'active', false);
      this.setIn(name, 'touched', true);
      if (this.validateOnBlur) {
        this.handleFormValidations();
        this.handleFieldValidations(name);
      }
    }
  },
  provide() {
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      focus: this.focus,
      blur: this.blur,
      change: this.change,
      getFieldState: this.getFieldState
    };
  }
};
