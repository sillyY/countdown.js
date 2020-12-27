import path from 'path'

import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'countdown',
    exports: 'named',
  },
  external: ['path'],
  plugins: [typescript(), nodeResolve(), commonjs({ extensions: ['.js', '.ts'] })],
}
