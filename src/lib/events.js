export function eventSubscriber(dispatch, { target, eventType, action }) {
  target = target || window;

  target.addEventListener(eventType, handleEvent);

  return () => {
    target.removeEventListener(eventType, handleEvent);
  };

  function handleEvent(event) {
    dispatch([action, event]);
  }
}
