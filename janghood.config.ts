/**
 * @description 极客江湖配置文件
 * @author 阿怪
 * @date 2022/4/6 3:37 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineJhConfig } from '@janghood/config';


const firstUpperCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1, str.length)}`;

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `M${lastDir}`;
};

export default defineJhConfig({
  apiExtractor: {
    // include: ['example/**/*.d.ts'],
    include: ['example/base/message/message.d.ts'],
    document: {
      webTypes: {
        active: true,
        webTypesInfo: {
          'framework': 'vue'
        },
        sourceSymbolTranslator
      },
      markdown: {
        output: 'doc',
        active: true
      }
    },
    annotate: {
      component: {
        type: 'block'
      }
    }
  }
});
