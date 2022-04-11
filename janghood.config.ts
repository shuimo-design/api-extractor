/**
 * @description 极客江湖配置文件
 * @author 阿怪
 * @date 2022/4/6 3:37 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import defineJhConfig from "./src/config/defineJhConfig";


const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `W${lastDir}`;
}

export default defineJhConfig({
  apiExtractor: {
    include: ["example"],
    document: {
      webTypes: {
        active: true,
        webTypesInfo: {
          "framework": "vue",
        },
        sourceSymbolTranslator
      },
      markdown: {
        output: 'doc',
        active: true
      }
    }
  }
});
