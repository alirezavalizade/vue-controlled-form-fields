<template>
  <textarea v-bind="input" v-on="events" />
</template>

<script>
export default {
  props: ['input', 'events']
};
</script>
