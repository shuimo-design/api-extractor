/**
 * @description web-types document creator
 * @author 阿怪
 * @date 2022/4/5 12:45 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TransformedAPI, WebTypeOption } from "../../../types/types";
import { webTypesTagCreator } from "./webTypesTagCreator";

export const webTypesDocumentCreator = (apis: TransformedAPI[],option?:WebTypeOption) => {
  // need load package.json
  const tags = Promise.all(apis.map(api=>new Promise(resolve => {
    const tag = webTypesTagCreator(option).run(api);
    resolve(tag);
  })));

  return tags;
}
