<template>
  <input-item :label="label">
    <a-select
      :allow-clear="allowClear"
      :filter-option="filterOption"
      :mode="mode"
      :placeholder="label || placeholder"
      :value="field.value"
      :show-search="showSearch"
      :loading="loading"
      :disabled="disabled"
      @blur="field.events.blur"
      @focus="field.events.focus"
      @change="onChange"
    >
      <slot slot="suffixIcon" />
      <a-select-option
        v-for="option in options"
        :key="option"
        :value="option"
        :disabled="false"
        >{{ option }}</a-select-option
      >
    </a-select>
  </input-item>
</template>

<script>
import InputMixin from './InputMixin';
import { Select } from 'ant-design-vue';

export default {
  components: {
    ASelect: Select,
    ASelectOption: Select.Option
  },
  mixins: [InputMixin],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    mode: {
      type: String,
      default: 'default',
      validate: v => ['default', 'multiple', 'tags'].includes(v)
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    filterOption: {
      type: [Function, undefined],
      default(input, option) {
        return (
          option.componentOptions.children[0].text
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        );
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(v) {
      this.field.change(v);
    }
  }
};
</script>

<style lang="scss" scoped>
.ant-select {
  width: 100% !important;
}
</style>
