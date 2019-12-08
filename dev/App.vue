<template>
  <a-layout class="app">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu
        :examples="examples"
        :selectedComponent="selectedComponent"
        @select="onSelectMenu"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content>
        <div>
          <h1>{{ examples[selectedComponent].title }}</h1>
          <br />
        </div>
        <component :is="examples[selectedComponent].component" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Layout, Icon } from 'ant-design-vue';
import Menu from './components/Menu';
import NativeForm from '../examples/Native/NativeForm.vue';
import AntdForm from '../examples/Antd/AntdForm.vue';

export default {
  components: {
    ALayout: Layout,
    ALayoutSider: Layout.Sider,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    AMenu: Menu,
    AIcon: Icon,
    NativeForm,
    AntdForm
  },
  data: () => ({
    collapsed: false,
    selectedComponent: 'AntdForm',
    examples: {
      NativeForm: {
        component: NativeForm,
        title: 'Native Form Input'
      },
      AntdForm: {
        component: AntdForm,
        title: 'Ant Design Form and Components'
      }
    }
  }),
  methods: {
    onSelectMenu({ key }) {
      this.selectedComponent = key;
    }
  }
};
</script>
<style lang="scss">
.app {
  form {
    max-width: 700px;
    margin: 0 auto;
  }

  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: calc(100vh - 112px);
  }

  pre {
    border: 1px solid #ccc;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
