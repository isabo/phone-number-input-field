import { eventSubscriber } from './lib/events';
import { DebouncedInput } from './actions';

/**
 * Returns an array of subscriptions.
 * We need to catch the `input` events dispatched by the native InputElement
 * functionality.
 *
 * @param {Object} state
 * @returns {Array.<[function, Object]>}
 */
export function subscriptions(state) {
  return [
    [
      eventSubscriber,
      {
        target: state.self,
        eventType: 'input',
        action: DebouncedInput,
      },
    ],
  ];
}
