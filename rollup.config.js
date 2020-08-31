import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/component.js',
  output: {
    file: './dist/phone-number-input.min.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [nodeResolve(), terser()],
};
