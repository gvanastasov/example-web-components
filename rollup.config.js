const replace = require('rollup-plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const sourcemaps = require('rollup-plugin-sourcemaps')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const pkg = require('./package.json')

const package = {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [commonjs(), nodeResolve()]
};

const script = {
  input: 'src/index.js',
  output: {
    name: 'example-web-components',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    commonjs(),
    sourcemaps(),
    nodeResolve()
  ]
}

module.exports = [package, script];