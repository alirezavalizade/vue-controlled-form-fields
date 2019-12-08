<template>
  <input-item :label="label">
    <a-checkbox
      :default-checked="field.value"
      :checked="field.value"
      v-on="field.events"
      >{{ label || placeholder }}</a-checkbox
    >
  </input-item>
</template>

<script>
import { Checkbox } from 'ant-design-vue';
import InputMixin from './InputMixin';

export default {
  components: {
    aCheckbox: Checkbox
  },
  mixins: [InputMixin]
};
</script>
