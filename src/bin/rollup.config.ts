/**
 * @description bin方法打包
 * @author 阿怪
 * @date 2022/4/6 11:45 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import typescript from "@rollup/plugin-typescript";

export default ({
  input: 'src/bin/jhAPI.ts',
  plugins: [typescript()],
  output: [{
    file: 'dist/bin/jhAPI.js',
    format: 'cjs'
  }]
});
