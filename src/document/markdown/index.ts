/**
 * @description markdown document creator
 * @author 阿怪
 * @date 2022/4/8 2:47 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { JhAPIs } from "../../../types/janghood-api-extractor";
import { markdownFormCreator } from "./markdownFormCreator";

export const markdownCreator = () => {

  let apis: JhAPIs;

  const init = (apiList: JhAPIs) => {
    apis = apiList;
  }

  const run = () => {
    return apis.map(api => markdownFormCreator(api));
  }

  return {
    init,
    run
  }

}
