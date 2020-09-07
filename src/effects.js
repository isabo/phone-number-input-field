import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js/max';
import { setValidity } from './lib/effects';
import { ERROR_INVALID_PHONE_NUMBER, E164 } from './constants';

export function parsePhoneNumber(dispatch, { defaultCountry, value, action }) {
  // Attempt to parse the phone number.
  const phone = parsePhoneNumberFromString(value, defaultCountry);

  const parsed = {
    country: phone?.country,
    phoneIsPossible: phone?.isPossible() || false,
    phoneIsValid: phone?.isValid() || false,
    phoneType: phone?.getType(),
    phoneE164: phone?.format(E164),
  };

  dispatch(action, parsed);
}

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

export function createSetValidityEffect(state) {
  return [
    setValidity,
    {
      input: state.self,
      isValid: state.phoneIsValid,
      errorMsg: state.errorMsg || ERROR_INVALID_PHONE_NUMBER,
    },
  ];
}
