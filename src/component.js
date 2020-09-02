import { h, app } from 'hyperapp';
import { generateClass } from 'hyperapp-custom-element';
import { subscriptions } from './subscriptions';
import { InitialiseState } from './actions';

const PhoneNumberInput = generateClass({
  app,
  init: [InitialiseState, {}],
  view: () => h('span', {}),
  subscriptions,
  exposedConfig: [
    {
      propName: 'defaultCountry',
      attrName: 'default-country',
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
  // middleware: wrapDispatch,
});

customElements.define('phone-number-input', PhoneNumberInput, {
  extends: 'input',
});
