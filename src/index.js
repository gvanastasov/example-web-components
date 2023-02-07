const ExampleButton = require("./components/example-button");
const jss = require('jss').default;
const preset = require('jss-preset-default').default

jss.setup({...preset(), insertionPoint: 'jss'})

customElements.define('example-button', ExampleButton, { extends: 'button' })

require('./components/test-component').register();
