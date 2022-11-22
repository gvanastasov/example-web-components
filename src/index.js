const TimeFormatted = require("./components/time-formatted");
const ExampleButton = require("./components/example-button");
const jss = require('jss').default;

jss.setup({ insertionPoint: 'jss' })

customElements.define('time-formatted', TimeFormatted);
customElements.define('example-button', ExampleButton, { extends: 'button' })