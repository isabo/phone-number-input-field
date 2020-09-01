# Phone Number Input Field

The Phone Number Input Field is a form field with the following features:

- **Incremental Formatting**  
  Phone numbers are formatted gradually with each keystroke. The digits are
  grouped and spaced in the standard way for the country of origin.

- **Phone Number Validation**  
  The entered number is validated with each keystroke to determine whether it is
  a valid number for the country it belongs to.

- **Determination of Phone Number Type**  
  In many countries it is possible to distinguish between mobile and land lines,
  among other types of numbers.

- **All the features of a regular \<input\> tag**  
  The Phone Number Input Field is an `<input>` tag with enhanced functionality.
  As a regular `<input>` tag, you can style it and interact with it in the
  normal way.

- **Status Attributes**  
  The HTML tag adds, removes or changes the value of various attributes in order
  to indicate what is known so far about the number that is being entered. These
  can be incorporated into CSS rules that indicate the style visually.

## How to Install

### Use a bundler such as Webpack, Parcel etc.

1. Install the library into your Node project:

```
npm install phone-number-input-field
```

2. In your HTML, refer to the libphonenumber-js library and this one:

```html
<script src="./path-to/libphonenumber-max.js"></script>
<script src="./path-to/phone-number-input.min.js"></script>
```

### Use a CDN

In your HTML, refer to the libphonenumber-js library and this one:

```html
<script src="https://cdn.jsdelivr.net/npm/libphonenumber-js/bundle/libphonenumber-max.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phone-number-input-field"></src>
```

## How to Use

### HTML

It can be used in the same way as a regular `input` tag, but the
`is="phone-number-input"` attribute must be specified.

```html
<input is="phone-number-input" />
```

### Javascript

Create an instance, then add it to the DOM in the normal way:

```javascript
// Option 1: Use createElement
const input1 = document.createElement('input', { is: 'phone-number-input' });
document.body.appendChild(input1);

// Option 2: Use the constructor
const PhoneNumberInput = customElements.get('phone-number-input');
const input2 = new PhoneNumberInput();
document.body.appendChild(input2);
```

## Properties / Attributes

| Property        | Attribute         | Description                                                                                                                                                                                                                               |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultCountry  | default-country   | Sets/gets the default country. This is needed when the entered number does not start with a country code prefix, e.g. +44. If you have a \<select\> tag with a list of countries, it should set this property when a country is selected. |
| country         | country           | Gets the country of the current number. This allows the user to override the default country by using a country code prefix.                                                                                                              |
| phoneIsValid    | phone-is-valid    | Indicates whether the current number is considered a valid number for the country.                                                                                                                                                        |
| phoneIsPossible | phone-is-possible | Indicates whether the length of the phone number is reasonable for the country.                                                                                                                                                           |
| phoneType       | phone-type        | The type of the phone number: MOBILE, FIXED_LINE, FIXED_LINE_OR_MOBILE, PREMIUM_RATE, TOLL_FREE, SHARED_COST, VOIP, PERSONAL_NUMBER, PAGER, UAN, VOICEMAIL                                                                                |
| phoneE164       | phone-e164        | The phone number in E164 format, e.g. +12125551234                                                                                                                                                                                        |
| oncountrychange | oncountrychange   | Sets an inline handler for the `phone-country-change` event. See below.                                                                                                                                                                   |

## Events

| Event                | Description                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| phone-country-change | Dispatched whenever the country that is identified from the entered number changes. |
