import { AsYouType } from 'libphonenumber-js/max';

/**
 * Effect that adds spaces or hyphens at appropriate places as the number is
 * being entered.
 *
 * @param {function} dispatch
 * @param {Object} props
 * @param {string} props.defaultCountry The 2-letter code of the default country
 * @param {HTMLInputElement} props.input The input element instance.
 */
export function formatPhoneNumber(dispatch, { defaultCountry, input }) {
  // Determine the appropriate formatting for the number as entered so far.
  const formatted = new AsYouType(defaultCountry).input(input.value);

  if (input.value !== formatted) {
    // Punctuation is about to be added. If the cursor is not at the end of the
    // input field, it will jump to the end. We therefore have to save and
    // restore its position.
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const shouldMoveCursor = start !== input.value.length;

    input.value = formatted;

    if (shouldMoveCursor) {
      input.setSelectionRange(start, end);
    }
  }
}
