<template>
  <span>
    <span v-if="component">
      <!--https://github.com/vuejs/vue/issues/4763-->
      <input v-if="isNastiveInput" :type="type" v-bind="input" v-on="events" />
      <textarea
        v-else-if="isNativeTextarea"
        v-bind="input"
        v-on="events"
      ></textarea>
      <select v-else-if="isNativeSelect" v-bind="input" v-on="events">
        <option
          v-for="option in options"
          :selected="
            Array.isArray(fieldState.value)
              ? fieldState.value.includes(
                  option.data ? option.data.attrs.value : undefined
                )
              : false
          "
          :value="option.data ? option.data.attrs.value : undefined"
          :key="option.data ? option.data.attrs.value : undefined"
          >{{ option.data ? option.data.attrs.value : undefined }}</option
        >
      </select>
    </span>
    <slot v-else v-bind="params" />
  </span>
</template>
<script>
import getValue from './getValue';

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
      validator: v => ['input', 'select', 'textarea'].includes(v)
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
  created() {
    this.registerField(this.name, {
      validate: this.validate
    });
  },
  destroyed() {
    this.unregisterField(this.name);
  },
  computed: {
    params() {
      return {
        meta: this.fieldState,
        input: this.input,
        events: this.events
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
    // helpers
    options() {
      if (!this.isNativeSelect) {
        return undefined;
      }
      if (this.$slots) {
        return this.$slots.default.filter(item => item.tag === 'option');
      }
      return [];
    },
    isNastiveInput() {
      return this.component === 'input';
    },
    isNativeTextarea() {
      return this.component === 'textarea';
    },
    isNativeSelect() {
      return this.component === 'select';
    },
    isNativeCheckbox() {
      return this.isNastiveInput && this.type === 'checkbox';
    },
    isNativeRadio() {
      return this.isNastiveInput && this.type === 'radio';
    },
    isValueArray() {
      return Array.isArray(this.fieldState.value);
    }
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
      field: () => this.params
    };
  }
};
</script>
