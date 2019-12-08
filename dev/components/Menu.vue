<template>
  <a-menu
    theme="dark"
    mode="inline"
    :defaultSelectedKeys="[selectedComponent]"
    @select="state => $emit('select', state)"
  >
    <a-menu-item v-for="example in Object.keys(examples)" :key="example">
      <a-icon type="check" />
      <span>{{ examples[example].title }}</span>
    </a-menu-item>
  </a-menu>
</template>
<script>
import { Menu, Icon } from 'ant-design-vue';

export default {
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    examples: {
      type: Object,
      required: true
    },
    selectedComponent: {
      type: String,
      default: ''
    }
  }
};
</script>
