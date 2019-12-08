<template>
  <input-item :label="label">
    <a-input
      autocomplete="off"
      :id="field.name"
      :disabled="disabled"
      :name="field.name"
      :value="field.value"
      :type="type"
      :placeholder="label || placeholder"
      v-on="field.events"
    >
      <slot slot="prefix" name="prefix" />
      <slot slot="suffix" name="suffix" />
    </a-input>
  </input-item>
</template>

<script>
import { Input } from 'ant-design-vue';
import InputMixin from './InputMixin';

export default {
  components: {
    aInput: Input
  },
  mixins: [InputMixin]
};
</script>
