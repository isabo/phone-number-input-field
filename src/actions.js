import { dispatchEventEffect } from 'hyperapp-custom-element';
import { initNativeProperties } from './lib/effects';
import { debounce } from './lib/debounce';
import {
  parsePhoneNumber,
  formatPhoneNumber,
  createSetValidityEffect,
} from './effects';
import { INPUT_DEBOUNCE_INTERVAL, EventTypes } from './constants';

/**
 * Initialises the element.
 *
 * @param {Object} state
 * @returns {Array}
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
 * Sets the default country to use when parsing the phone number.
 *
 * @param {Object} state
 * @param {Object} props
 * @param {string} props.defaultCountry
 * @returns {Array}
 */
export function SetDefaultCountry(state, { defaultCountry }) {
  const newState = {
    ...state,
    defaultCountry,
  };

  // When the default country changes, we need to reprocess the current number.
  return [
    newState,
    [
      parsePhoneNumber,
      { defaultCountry, value: newState.self.value, action: UpdatePhoneNumber },
    ],
  ];
}

/**
 * Sets the error message for the browser to display when validating forms that
 * include this component.
 *
 * @param {Object} state
 * @param {Object} props
 * @param {string} props.errorMsg The error message.
 * @returns {Array}
 */
export function SetErrorMessage(state, { errorMsg }) {
  const newState = { ...state, errorMsg };

  // When changing the error message, the native validity needs to be reset,
  // because the error message itself is used as a validity flag by the native
  // element.
  const effect = createSetValidityEffect(state);

  return [newState, effect];
}

/**
 * Action that triggers parsing of the number that has been entered so far.
 *
 * @param {Object} state
 * @param {InputEvent} event
 * @returns {Array}
 */
function HandleInput(state, event) {
  return [
    state,
    [
      parsePhoneNumber,
      {
        defaultCountry: state.defaultCountry,
        value: event.target.value,
        action: UpdatePhoneNumber,
      },
    ],
  ];
}

export const DebouncedInput = debounce(HandleInput, INPUT_DEBOUNCE_INTERVAL);

/**
 * Updates the state with the results of parsing and validating the contents of
 * the element. Using effects, causes the native element's validity status to be
 * updated, and reformats the punctuation of the number in the element.
 *
 * @param {Object} state
 * @param {Object} props
 * @param {string} props.country
 * @param {boolean} props.phoneIsPossible
 * @param {boolean} props.phoneIsValid
 * @param {string} props.phoneType
 * @param {string} props.phoneE164
 * @returns {Array}
 */
export function UpdatePhoneNumber(state, props) {
  const newState = { ...state, ...props };

  const effects = [
    createSetValidityEffect(newState),
    [
      formatPhoneNumber,
      { defaultCountry: newState.defaultCountry, input: newState.self },
    ],
    // Tell listeners that the number has been parsed.
    [dispatchEventEffect, { eventType: EventTypes.PARSE }],
  ];

  // If the country has changed, add an effect that will dispatch an event.
  if (state.country !== newState.country) {
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
