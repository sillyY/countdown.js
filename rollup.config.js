import path from 'path'

import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: {
    dir: 'dist',
    format: 'cjs',
    name: 'countdown',
    exports: "default",
  },
  external: ['path'],
  plugins: [typescript(), commonjs({ extensions: ['.js', '.ts'] })],
}
