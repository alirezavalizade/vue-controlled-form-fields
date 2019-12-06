import isEqual from 'lodash.isequal';
import { formSubscriptionItems } from '../../helpers/subscriptionItems';
import getDefaultSubscriptionItems from '../../helpers/getDefaultSubscriptionItems';

export default {
  data: () => ({
    formListeners: []
  }),
  created() {
    this.subscribeFormListeners();
  },
  destroyed() {
    this.unsubscribeFormListeners();
  },
  methods: {
    handleSubscribe(subscriber, subscription = getDefaultSubscriptionItems()) {
      let unwatch;
      if (subscription.default) {
        unwatch = this.$watch(
          function() {
            return this.formStateReport;
          },
          function(state) {
            subscriber(state);
          }
        );
      } else {
        const keys = Object.keys(subscription);
        unwatch = this.$watch(
          function() {
            return keys.reduce((acc, key) => {
              acc[key] = this[key];

              return acc;
            }, {});
          },
          function(state, oldState) {
            if (!isEqual(state, oldState)) {
              subscriber(state);
            }
          }
        );
      }

      return () => {
        if (subscription.default) {
          return unwatch();
        }
      };
    },
    subscribeFormListeners() {
      const listenersKeys = Object.keys(this.$listeners);
      const validListenersKeys = listenersKeys.filter(key =>
        formSubscriptionItems.includes(key)
      );
      for (let i = 0; i < validListenersKeys.length; i++) {
        this.formListeners[i] = this.form.subscribe(
          this.$listeners[validListenersKeys[i]],
          {
            [validListenersKeys[i]]: true
          }
        );
      }
      // Avoid using update incase @change hasn't passed to form
      if (listenersKeys.includes('change')) {
        this.form.subscribe(this.$listeners.change);
      }
    },
    unsubscribeFormListeners() {
      this.formListeners.forEach(un => un());
    }
  }
};
