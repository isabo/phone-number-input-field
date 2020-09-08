import { h, app } from 'hyperapp';
import { generateClass } from 'hyperapp-custom-element';
import { traceDispatch } from 'hyperapp-debug-trace';
import { subscriptions } from './subscriptions';
import { InitialiseState, SetErrorMessage, SetDefaultCountry } from './actions';

const PhoneNumberInput = generateClass({
  app,
  init: [InitialiseState, {}],
  view: () => h('span', {}),
  subscriptions,
  exposedConfig: [
    {
      propName: 'defaultCountry',
      attrName: 'default-country',
      setter: SetDefaultCountry,
    },
    {
      propName: 'errorMsg',
      attrName: 'error-msg',
      setter: SetErrorMessage,
    },
    {
      propName: 'phoneIsValid',
      attrName: 'phone-is-valid',
    },
    {
      propName: 'phoneIsPossible',
      attrName: 'phone-is-possible',
    },
    {
      propName: 'country',
      attrName: 'country',
    },
    {
      propName: 'phoneType',
      attrName: 'phone-type',
    },
    {
      propName: 'phoneE164',
      attrName: 'phone-e164',
    },
    {
      propName: 'oncountrychange',
      attrName: 'oncountrychange',
      eventType: 'phone-country-change',
    },
  ],
  useShadowDOM: false,
  parent: HTMLInputElement,
  middleware: traceDispatch,
});

customElements.define('phone-number-input', PhoneNumberInput, {
  extends: 'input',
});
