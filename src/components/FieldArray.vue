<template>
  <span>
    <slot v-bind="params" />
  </span>
</template>
<script>
export default {
  name: 'FieldArray',
  inject: [
    'registerField',
    'unregisterField',
    'getFieldState',
    'change',
    'blur',
    'focus'
  ],
  props: {
    name: {
      type: String,
      required: true
    },
    validate: {
      type: [Function, Array, undefined],
      default: undefined
    }
  },
  computed: {
    params() {
      return {
        meta: this.fieldState,
        fields: {
          map: this.map,
          push: this.push,
          remove: this.remove
        }
      };
    },
    fieldState() {
      return this.getFieldState(this.name);
    },
    isValueArray() {
      return Array.isArray(this.fieldState.value);
    }
  },
  created() {
    this.registerField(this.name, {
      validate: this.validate
    });
  },
  destroyed() {
    this.unregisterField(this.name);
  },
  methods: {
    map() {
      const { value } = this.fieldState;
      return Array.from(
        {
          length: this.isValueArray ? value.length : 0
        },
        (item, i) => this.getName(i)
      );
    },
    push(value) {
      const { value: fieldValue } = this.fieldState;
      const newValue = this.isValueArray ? [...fieldValue, value] : [value];
      this.change(this.name, newValue);
    },
    remove(i) {
      const { value: fieldValue } = this.fieldState;
      const newValue = this.isValueArray
        ? fieldValue.filter((item, index) => i !== index)
        : [];
      this.change(this.name, newValue);
    },
    getName(index) {
      return `${this.name}[${index}]`;
    }
  },
  provide() {
    return {
      fieldState: () => this.params
    };
  }
};
</script>
