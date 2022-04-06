/**
 * @description
 * @author 阿怪
 * @date 2022/4/3 9:34 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { apiExtractor } from "./index";
import webTypes from "./documenter/web-types";


const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `W${lastDir}`;
}

const run = async () => {
  const api = await apiExtractor({
    include: ["example"],
  });

  await webTypes(api, {
    sourceSymbolTranslator,
    webTypesInfo: {
      "framework": "vue",
    }
  });
}

run();
