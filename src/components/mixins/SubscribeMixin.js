export default {
  data() {
    return {
      subscribers: []
    };
  },
  watch: {
    values() {
      this.notifySubscribers();
    }
  },
  methods: {
    handleSubscribe(subscriber) {
      this.subscribers.push(subscriber);

      return () => {
        this.subscribers.pop();
      };
    },
    notifySubscribers() {
      for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](this.formStateReport);
      }
    }
  }
};
