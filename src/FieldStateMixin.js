export default {
  inject: ['fieldState'],
  computed: {
    field() {
      return this.fieldState();
    }
  }
};
