import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/component.js',
  output: [
    {
      file: './dist/phone-number-input.min.js',
      format: 'iife',
      sourcemap: true,
      globals: {
        'libphonenumber-js/max': 'libphonenumber',
      },
      plugins: [terser({ keep_fnames: true })],
    },
    {
      file: './dist/phone-number-input.js',
      format: 'iife',
      sourcemap: false,
      globals: {
        'libphonenumber-js/max': 'libphonenumber',
      },
    },
  ],
  plugins: [nodeResolve()],
  external: ['libphonenumber-js/max'],
};
