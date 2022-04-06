/**
 * @description default token translator
 * @author 阿怪
 * @date 2022/4/3 9:53 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { Tokens } from "../../types/types";
import { getFileDoc } from "./getFileDoc";
import { apiTreeCreator } from "./apiTreeCreator";
import { TransformedAPI } from "../../types/types";

const tokensValidate = (tokens: Tokens) => {
  if (tokens.length === 0) {
    console.warn('this file is empty');
    return true;
  }
  return false;
}


export const translator = (baseToken: Tokens, fileName: string): Omit<TransformedAPI, 'file'> => {
  if (tokensValidate(baseToken)) {
    return {
      fileDoc: '',
      identifierAPIs: []
    };
  }
  let apiToken = baseToken;
  let fileDoc;
  try {
    let docInfo = getFileDoc(baseToken);
    apiToken = docInfo.tokens;
    fileDoc = docInfo.fileDoc;
  } catch (e) {
    console.warn(`file ${fileName} is ${(e as Error).message}`)
  }
  const identifierAPIs = apiTreeCreator(apiToken);


  return {
    fileDoc,
    identifierAPIs
  }

}
