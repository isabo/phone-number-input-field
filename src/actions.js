import { dispatchEventEffect } from 'hyperapp-custom-element';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { initNativeProperties } from './lib/effects';
import { formatPhoneNumber } from './effects';

/**
 * Initialises the element.
 *
 * @param {Object} state
 * @returns {Object}
 */
export function InitialiseState(state = {}) {
  // We add a reference to the element itself so that subscriber functions can
  // easily use it as a target for registering event listeners.
  const newState = {
    ...state,
    self: this,
  };

  // Set the native field's type to "tel" so that the mobile keyboard
  // adapts to show only digits.
  const effect = [initNativeProperties, { type: 'tel' }];

  return [newState, effect];
}

/**
 * Action that attempts to parse the number that has been entered so far, and
 * stores the results in the state. The new state will also cause the attributes
 * to change.
 *
 * @param {Object} state
 * @param {InputEvent} event
 * @returns a new state and an effect that will reformat the number if necessary
 */
export function HandleInput(state, event) {
  // Attempt to parse the phone number.
  const phone = parsePhoneNumberFromString(
    event.target.value,
    state.defaultCountry
  );

  // If the country changes, we'll need to dispatch an event.
  const prevCountry = state.country;

  const newState = {
    ...state,
    country: phone?.country || '',
    phoneIsPossible: !!phone?.isPossible(),
    phoneIsValid: !!phone?.isValid(),
    phoneType: phone?.getType() || '',
    phoneE164: phone?.format('E.164') || '',
  };

  const effects = [
    [
      formatPhoneNumber,
      { defaultCountry: state.defaultCountry, input: event.target },
    ],
  ];

  // If the country has changed, add an effect that will dispatch an event.
  if (prevCountry !== newState.country) {
    effects.push([
      dispatchEventEffect,
      {
        eventType: 'phone-country-change',
        eventInit: { detail: newState.country, bubbles: true },
      },
    ]);
  }

  return [newState, ...effects];
}
