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
import HooksMixin from './mixins/HooksMixin';
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
    HooksMixin,
    HelpersMixin
  ],

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
</script>
