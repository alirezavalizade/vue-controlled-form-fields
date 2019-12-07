# `FieldStateMixin`

```js
import { FieldStateMixin } from 'vue-controlled-form-fields';
```

#### **`FieldStateMixin` is a injector helper. Importing it is required when we want to use custom reusable components (When you want to create separate component in a different file to reuse it everywhere).**

By importing it you can access to field property. which is an object including `meta`, `events`, `value`, `name`.

#### Example 1

```vue
//**** InputText.vue *******
<template>
  <div>
    <label>
      {{ label }}
      <input
        :disabled="disabled"
        :type="type"
        :placeholder="placeholder"
        :value="field.value"
        v-on="field.events"
      />
      <span v-if="field.touched && field.error">{{ field.error }}</span>
    </label>
  </div>
</template>

<script>
import { FieldStateMixin } from 'vue-controlled-form-fields';

export default {
  mixins: [FieldStateMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
};
</script>
```

#### example 2 (Ant design)

```vue
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
import { FieldStateMixin } from 'vue-controlled-form-fields';
import { Select } from 'ant-design-vue';

export default {
  components: {
    ASelect: Select,
    ASelectOption: Select.Option
  },
  mixins: [FieldStateMixin],
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
```

<a href="../Field.md">Please see `<Field />` documents.</a>
