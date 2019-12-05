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
    },
    validateOnBlur: {
      type: Boolean,
      default: false
    },
    destroyOnUnregister: {
      type: Boolean,
      default: true
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
  ]
};
</script>
