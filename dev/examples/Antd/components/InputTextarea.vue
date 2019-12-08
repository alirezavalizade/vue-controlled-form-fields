<template>
  <input-item :label="label">
    <a-textarea
      autocomplete="off"
      :id="field.name"
      :disabled="disabled"
      :placeholder="label || placeholder"
      :autosize="{ minRows: minRows, maxRows: maxRows }"
      v-on="field.events"
      v-bind="field.input"
    />
  </input-item>
</template>

<script>
import { Input } from 'ant-design-vue';
import InputMixin from './InputMixin';

export default {
  components: {
    aTextarea: Input.TextArea
  },
  props: {
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    }
  },
  mixins: [InputMixin]
};
</script>
