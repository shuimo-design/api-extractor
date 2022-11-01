/**
 * @description bin方法打包
 * @author 阿怪
 * @date 2022/4/6 11:45 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default ({
  input: 'src/bin/jh-api.ts',
  plugins: [typescript(), json()],
  output: [{
    sourcemap: true,
    file: 'dist/bin/jh-api.js',
  }],
  external: [
    'typescript',
    '@microsoft/tsdoc',
    '@microsoft/tsdoc-config',
    'tsutils',
    'path',
    'fs',
    'os'
  ]
});
