<template>
  <form @submit="handleSubmit">
    <slot v-bind="formState" />
  </form>
</template>
<script>
import SetInGetInMixin from './mixins/SetInGetInMixin';
import FormStateMixin from './mixins/FormStateMixin';
import SubscribeMixin from './mixins/SubscribeMixin';
import InitializeMixin from './mixins/InitializeMixin';
import ValidationMixin from './mixins/ValidationMixin';
import HelpersMixin from './mixins/HelpersMixin';

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
  mixins: [
    SetInGetInMixin,
    FormStateMixin,
    SubscribeMixin,
    InitializeMixin,
    ValidationMixin,
    HelpersMixin
  ],
  created() {
    this.$emit('created', this.form);
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
