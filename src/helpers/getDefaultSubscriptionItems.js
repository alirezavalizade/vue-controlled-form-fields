import {
  formSubscriptionItems,
  fieldSubscriptionItems
} from './subscriptionItems';

const getDefaultSubscriptionItems = (type = 'form') => {
  const items =
    type === 'form' ? formSubscriptionItems : fieldSubscriptionItems;
  return {
    default: true,
    ...items.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {})
  };
};
export default getDefaultSubscriptionItems;
