<template>
  <form @submit="handleSubmit">
    <slot v-bind="formState" />
  </form>
</template>
<script>
import set from 'lodash.set';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

export default {
  props: {
    submit: {
      type: Function,
      required: true
    },
    initialValues: {
      type: Object,
      default: () => ({})
    },
    keepDirtyOnReinitialize: {
      type: Boolean,
      default: false
    },
    validate: {
      type: [Function, undefined],
      default: undefined
    }
  },
  data() {
    return {
      fields: {},
      active: undefined,
      submitting: false
    };
  },
  computed: {
    formState() {
      return {
        dirty: this.dirty,
        valid: this.valid,
        invalid: this.invalid,
        visited: this.visited,
        modified: this.modified,
        pristine: this.pristine,
        touched: this.touched,
        active: this.active,
        submitting: this.submitting,
        values: this.values,
        errors: this.errors,
        dirtyFields: this.dirtyFields,
        modifiedFields: this.modifiedFields,
        visitedFields: this.visitedFields,
        initialValues: this.initialValues,
        form: {
          handleSubmit: this.handleSubmit,
          initialize: this.initialize,
          reset: this.reset,
          change: this.changeFromForm,
          focus: this.focus,
          blur: this.blur
        }
      };
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
      return Object.keys(this.visitedFields).length === 0;
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
      return this.buildObjecFromKeys(
        this.filterFields('error', { checkForValue: true }),
        'error'
      );
    },
    values() {
      return this.buildObjecFromKeys(
        this.filterFields('value', { checkForValue: true }),
        'value'
      );
    },
    fieldKeys() {
      return Object.keys(this.fields);
    }
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
  created() {
    this.initialize(this.initialValues);
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
      this.fields[name] = undefined;
    },
    initFieldState(name, { value = undefined, validate } = {}) {
      return {
        [name]: {
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
        }
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
    change(name, value) {
      this.fields[name].value = value;
      if (!this.getIn(name, 'modified')) {
        this.fields[name].modified = true;
      }
      this.handleFormValidations();
      this.handleFieldValidations(name);
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
    },
    initialize(initialValues) {
      const newKeys = this.keyify(initialValues);
      newKeys.forEach(key => {
        const path = key.includes('[')
          ? key.substring(0, key.indexOf('['))
          : key;

        if (this.isFieldExist(path)) {
          this.change(path, get(initialValues, path));
        } else {
          this.registerField(path, {
            value: get(initialValues, path)
          });
        }
      });
    },
    // helpers
    setIn(name, property, value) {
      if (this.fields[name]) {
        this.fields[name][property] = value;
      }
    },
    getIn(name, property) {
      if (property) {
        return this.getFieldState(name)[property];
      }
      return this.getFieldState(name);
    },
    setInAll(properties = {}) {
      this.fieldKeys.forEach(key => {
        this.fields[key] = {
          ...this.fields[key],
          ...properties
        };
      });
      this.fieldKeys.forEach(this.handleFieldValidations);
    },
    handleFormValidations() {
      if (this.validate) {
        const errors = this.validate(this.values);
        if (typeof errors === 'object') {
          const keyifiedErrors = this.keyify(errors);
          keyifiedErrors.forEach(path => {
            this.setIn(path, 'error', get(errors, path));
          });
          this.fieldKeys.forEach(path => {
            if (
              !keyifiedErrors.includes(path) &&
              typeof this.getIn(path, 'error') !== 'undefined' &&
              !this.fields[path].validate
            ) {
              this.setIn(path, 'error', undefined);
            }
          });
        }
      }
    },
    handleFieldValidations(name) {
      const state = this.fields[name];
      if (state.validate) {
        const error = Array.isArray(state.validate)
          ? this.composeFieldValidators(state.validate)(
              state.value,
              this.values
            )
          : state.validate(state.value, this.values);
        if (error || (!error && state.error)) {
          this.setIn(name, 'error', error);
        }
      }
    },
    composeFieldValidators(validators) {
      return (...args) =>
        validators.reduce(
          (error, validation) => error || validation(...args),
          undefined
        );
    },
    filterFields(property, { checkForValue } = {}) {
      return this.fieldKeys.reduce((acc, path) => {
        const value = this.getFieldState(path)[property];
        if (checkForValue && typeof value !== 'undefined') {
          acc[path] = true;
        } else if (value) {
          acc[path] = true;
        }
        return acc;
      }, {});
    },
    isFieldExist(name) {
      return typeof this.fields[name] !== 'undefined';
    },
    keyify(obj, prefix = '', prevPrefix = '') {
      return Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
          return [...res, ...this.keyify(obj[el], `${prefix}${el}[`, `]`)];
        } else if (
          typeof obj[el] === 'object' &&
          !obj[el].hasOwnProperty('touched')
        ) {
          return [
            ...res,
            ...this.keyify(obj[el], `${prefix}${el}.`, prevPrefix)
          ];
        }
        return [...res, `${prefix}${el}${prevPrefix}`];
      }, []);
    },
    buildObjecFromKeys(objWithKeys, property) {
      return Object.keys(objWithKeys).reduce((acc, name) => {
        const v = this.getIn(name, property);
        if (!Array.isArray(v)) {
          set(acc, name, v);
        }
        return acc;
      }, {});
    }
  },
  provide() {
    return {
      // methods
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      focus: this.focus,
      blur: this.blur,
      change: this.change,
      getFieldState: this.getFieldState
      // computed
    };
  }
};
</script>
