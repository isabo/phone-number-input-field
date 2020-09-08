export { debounce, cancelAction };

/**
 * The default number of milliseconds to wait before invoking an action.
 */
const DEFAULT_INTERVAL = 250;

/**
 * Creates a debounced version of an original Hyperapp action.
 *
 * Strategy:
 * 1. Construct and return an action that does nothing but trigger an effect.
 * 2. Configure the effect to dispatch the original action after the specified
 *    interval.
 *
 * @param {function} action The action to invoke in a debounced way.
 * @param {number} [interval] The number of milliseconds to wait for another
 *    invocation before triggering the action.
 * @returns {function} a replacement action.
 */
function debounce(action, interval = DEFAULT_INTERVAL) {
  return function (state, props) {
    const effect = [debounceEffect, { action, props, interval }];
    return [state, effect];
  };
}

/**
 * A map of currently scheduled timeouts. The keys of the map are the Action
 * functions for which timeouts are scheduled. Having objects as keys is a very
 * convenient property of WeakMaps.
 */
const pendingTimeouts = new WeakMap();

/**
 * This function is a Hyperapp effect that invokes an action after a specified
 * interval. The interval is restarted if the effect is invoked again for the
 * same action before the action itself has been invoked.
 *
 * Strategy:
 * 1. The first time this is called for a specific action, set a timeout.
 * 2. Maintain a map of pending timeouts, indexed by action.
 * 3. On subsequent calls for the same action, restart the timeout if it hasn't
 *    yet fired.
 *
 * @param {function} dispatch
 * @param {Object} props
 * @param {function} props.action The action to dispatch after the interval.
 * @param {*} props.payload The argument to call the action with.
 * @param {number} props.interval The interval (milliseconds) after which to
 *    dispatch the action.
 */
function debounceEffect(dispatch, { action, props, interval }) {
  // If the action has already been scheduled, restart the interval.
  cancelAction(action);

  const handle = setTimeout(() => {
    pendingTimeouts.delete(action);
    dispatch(action, props);
  }, interval);

  pendingTimeouts.set(action, handle);
}

/**
 * Cancels a specific pending action. This should be done when a state change
 * means that it would be inappropriate to follow through with the specific
 * pending action that was submitted before the state change.
 *
 * @param {function} action The action to cancel.
 */
function cancelAction(action) {
  const handle = pendingTimeouts.get(action);
  if (handle) {
    clearTimeout(handle);
    pendingTimeouts.delete(action);
  }
}
