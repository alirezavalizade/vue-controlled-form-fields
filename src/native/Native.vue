<template>
  <!--https://github.com/vuejs/vue/issues/4763-->
  <native-input v-if="isNativeInput" :input="input" :events="events" />
  <native-textarea
    v-else-if="isNativeTextarea"
    :input="input"
    :events="events"
  />
  <native-select
    v-else-if="isNativeSelect"
    :input="input"
    :events="events"
    :fieldValue="fieldValue"
  />
</template>

<script>
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';

export default {
  components: {
    NativeInput: Input,
    NativeTextarea: Textarea,
    NativeSelect: Select
  },
  props: [
    'input',
    'events',
    'isNativeSelect',
    'isNativeTextarea',
    'isNativeInput',
    'fieldValue'
  ]
};
</script>
