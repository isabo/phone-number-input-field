/**
 * Effect that initialises a native element's built-in properties.
 */
export function initNativeProperties(_, props) {
  for (const propName in props) {
    this[propName] = props[propName];
  }
}
