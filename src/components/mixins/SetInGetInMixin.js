export default {
  methods: {
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
      const keys = this.fieldKeys;
      for (let i = 0; i < keys.length; i++) {
        this.fields[keys[i]] = {
          ...this.fields[keys[i]],
          ...properties
        };
        this.handleFieldValidations(keys[i]);
      }
    }
  }
};
