<template>
  <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
    <a-button
      :type="type"
      :disabled="disabled"
      :icon="icon"
      :size="size"
      :shape="shape"
      @click="$emit('click')"
    >
      <slot />
    </a-button>
  </a-form-item>
</template>

<script>
import { Form, Button } from 'ant-design-vue';

export default {
  components: {
    AButton: Button,
    AFormItem: Form.Item
  },
  props: ['type', 'disabled', 'icon', 'size', 'shape']
};
</script>
