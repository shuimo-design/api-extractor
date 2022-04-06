/**
 * @description run
 * @author 阿怪
 * @date 2022/4/3 9:34 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { apiExtractor } from "./index";
import webTypes from "./documenter/web-types";

export const run = async () => {
  const api = await apiExtractor({
    include: ["../wash-painting-ui/lib"],
    exclude: ['dependents']
  });
  await webTypes(api, {
    webTypesInfo: {
      "framework": "vue",
    }
  });
}

run();
