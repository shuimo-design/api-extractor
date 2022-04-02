/**
 * @Description: plugin rollup config
 * @Author: 阿怪
 * @Date: 2022/3/25 2:20 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import typescript from "@rollup/plugin-typescript";

export default ({
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [{
    file: 'dist/index.js',
    format: 'cjs'
  }]
});
