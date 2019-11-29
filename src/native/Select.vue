<template>
  <select v-bind="input" v-on="events">
    <option
      v-for="option in options"
      :key="getValueFromOption(option)"
      :selected="isOptionSelected(option)"
      :value="getValueFromOption(option)"
      >{{ getValueFromOption(option) }}</option
    >
  </select>
</template>

<script>
export default {
  props: ['input', 'events', 'fieldValue'],
  computed: {
    options() {
      if (this.$parent.$parent.$slots) {
        return this.$parent.$parent.$slots.default.filter(
          item => item.tag === 'option'
        );
      }
      return [];
    },
    isValueArray() {
      return Array.isArray(this.fieldValue);
    }
  },
  methods: {
    getValueFromOption(option) {
      return option.data ? option.data.attrs.value : undefined;
    },
    isOptionSelected(option) {
      return this.isValueArray
        ? this.fieldValue.includes(this.getValueFromOption(option))
        : false;
    }
  }
};
</script>
