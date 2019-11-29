<template>
  <native
    v-if="component"
    :input="input"
    :events="events"
    :isNativeSelect="isNativeSelect"
    :isNativeInput="isNativeInput"
    :isNativeTextarea="isNativeTextarea"
    :field-value="fieldState.value"
  />
  <span v-else>
    <slot v-bind="params" />
  </span>
</template>
<script>
import Native from './native/Native';
import getValue from '../helpers/getValue';

export default {
  name: 'Field',
  inject: [
    'registerField',
    'getFieldState',
    'change',
    'unregisterField',
    'blur',
    'focus'
  ],
  components: {
    Native
  },
  props: {
    name: {
      type: String,
      required: true
    },
    // ONLY FOR HTML ELEMENTS
    type: {
      type: String,
      default: 'text',
      validator: v => ['checkbox', 'text', 'email', 'radio'].includes(v)
    },
    component: {
      type: String,
      default: '',
      validator: v => ['input', 'select', 'textarea', ''].includes(v)
    },
    value: {
      type: [String, Number, Boolean, undefined],
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    // end
    isNullAllowed: {
      type: Boolean,
      default: false
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
        input: this.input,
        events: this.events,
        name: this.name,
        value: this.fieldState.value,
        change: this.events.change
      };
    },
    fieldState() {
      return this.getFieldState(this.name);
    },
    events() {
      return {
        change: this.changeFieldValue,
        focus: () => this.focus(this.name),
        blur: () => this.blur(this.name)
      };
    },
    input() {
      const params = {
        type: this.type,
        name: this.name,
        multiple: this.multiple,
        placeholder: this.placeholder
      };
      if (this.isNativeCheckbox || this.isNativeRadio) {
        if (typeof this.value === 'undefined') {
          params.checked = !!this.fieldState.value;
        } else if (Array.isArray(this.fieldState.value)) {
          params.checked = this.fieldState.value.includes(this.value);
        } else {
          params.checked = this.fieldState.value === this.value;
        }
      }
      if ((this.isNativeSelect && !this.multiple) || !this.isNativeSelect) {
        params.value = this.fieldState.value;
      }
      return params;
    },
    isNativeSelect() {
      return this.component === 'select';
    },
    isNativeInput() {
      return this.component === 'input';
    },
    isNativeTextarea() {
      return this.component === 'textarea';
    },
    isNativeCheckbox() {
      return this.isNativeInput && this.type === 'checkbox';
    },
    isNativeRadio() {
      return this.isNativeInput && this.type === 'radio';
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
    changeFieldValue(v) {
      this.change(
        this.name,
        getValue(v, this.fieldState.value, this.value, this.isNullAllowed)
      );
    }
  },
  provide() {
    return {
      fieldState: () => this.params
    };
  }
};
</script>
