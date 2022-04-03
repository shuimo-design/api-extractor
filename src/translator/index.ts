/**
 * @description default token translator
 * @author 阿怪
 * @date 2022/4/3 9:53 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { Tokens } from "../../types/types";
import { SyntaxKind } from "typescript";
import { getFileDoc } from "./getFileDoc";
import { apiTreeCreator } from "./apiTreeCreator";

const tokensValidate = (tokens: Tokens) => {
  if (tokens.length === 0) {
    console.warn('this file is empty');
    return true;
  }
  return false;
}


export const translator = (baseToken: Tokens) => {
  if (tokensValidate(baseToken)) {
    return;
  }
  let { tokens, fileDoc } = getFileDoc(baseToken);
  const identifierAPIs = apiTreeCreator(tokens);


  return {
    fileDoc,
    identifierAPIs
  }

}
