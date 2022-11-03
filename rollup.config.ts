/**
 * @Description: plugin rollup config
 * @Author: 阿怪
 * @Date: 2022/3/25 2:20 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default ({
  input: 'src/index.ts',
  plugins: [typescript(), json()],
  output: [{
    sourcemap: true,
    file: 'dist/index.js',
    format: 'cjs',
  }],
  external: [
    'typescript',
    '@microsoft/tsdoc',
    '@microsoft/tsdoc-config',
    'tsutils',
    'path',
    'fs',
    'os',
    'fast-glob'
  ],
});
