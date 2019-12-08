<template>
  <a-form-item
    :id="field.name"
    :validate-status="status"
    :data-validate-status="status"
    :help="message"
    :label="label"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 19 }"
  >
    <slot />
  </a-form-item>
</template>

<script>
import { Form } from 'ant-design-vue';
import { FieldStateMixin } from 'vue-controlled-form-fields';

export default {
  components: {
    aFormItem: Form.Item
  },
  mixins: [FieldStateMixin],
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    message() {
      const { error, touched } = this.field.meta;
      if (error && touched) {
        return error;
      }
      return undefined;
    },
    status() {
      return this.message ? 'error' : '';
    }
  }
};
</script>
