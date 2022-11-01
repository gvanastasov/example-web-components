const commonjs = require('@rollup/plugin-commonjs')
const pkg = require('./package.json')

const package = {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [commonjs()]
};

const script = {
  input: 'src/index.js',
  output: {
    name: 'example-web-components',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [commonjs()]
}

module.exports = [package, script];