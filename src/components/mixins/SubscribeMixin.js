export default {
  data() {
    return {
      subscribers: {}
    };
  },
  watch: {
    values() {
      this.notifySubscribers();
    }
  },
  methods: {
    handleSubscribe(subscriber) {
      const subscriberID = Math.random();
      this.$set(this.subscribers, subscriberID, subscriber);

      return () => {
        this.$delete(this.subscribers, subscriberID);
      };
    },
    notifySubscribers() {
      // TODO: Add custom listeners
      const subscriberIDs = Object.keys(this.subscribers);
      for (var i = 0; i < subscriberIDs.length; i++) {
        this.subscribers[subscriberIDs](this.formStateReport);
      }
    }
  }
};
