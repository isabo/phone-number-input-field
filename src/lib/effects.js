/**
 * Effect that initialises a native element's built-in properties.
 */
export function initNativeProperties(_, props) {
  for (const propName in props) {
    this[propName] = props[propName];
  }
}

/**
 * Sets the native input control's validity status. This affects the :valid and
 * :invalid CSS pseudo-classes and form validation.
 *
 * @param {function} dispatch
 * @param {Object} props
 * @param {HTMLInputElement} props.input The input element instance.
 * @param {boolean} props.isValid Whether the value is considered valid.
 * @param {string} props.errorMsg An error message that will be displayed when
 *    the form is validated by the browser prior to submission.
 */
export function setValidity(dispatch, { input, isValid, errorMsg }) {
  input.setCustomValidity(isValid ? '' : errorMsg);
}
