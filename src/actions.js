import { dispatchEventEffect } from 'hyperapp-custom-element';
import { initNativeProperties } from './lib/effects';
import {
  parsePhoneNumber,
  formatPhoneNumber,
  createSetValidityEffect,
} from './effects';

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

  // When changing the error message, the native validity needs to be reset.
  const effect = createSetValidityEffect(state);

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

export function UpdatePhoneNumber(state, props) {
  const newState = { ...state, ...props };

  const effects = [
    createSetValidityEffect(newState),
    [
      formatPhoneNumber,
      { defaultCountry: newState.defaultCountry, input: newState.self },
    ],
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
