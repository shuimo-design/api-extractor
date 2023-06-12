/**
 * @description default token translator
 * @author 阿怪
 * @date 2022/4/3 9:53 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { getFileDoc } from "./getFileDoc";
import { apiTreeCreator } from "./apiTreeCreator";
import type { Tokens } from "../extractor/tools/tokenExtractor";
import type { JhAPI } from "../../types/janghood-api-extractor";
import { JhAPIs } from "../../types/janghood-api-extractor";
import { jWarn } from "../common/console";
import { intersectionsProcess } from "./process/intersectionsProcess";
import { linkerProcess } from './process/linkerProcess';

const tokensValidate = (tokens: Tokens) => {
  if (tokens.length === 0) {
    jWarn('this file is empty');
    return true;
  }
  return false;
}


export const translator = (baseToken: Tokens, fileName: string): JhAPI | undefined => {
  if (tokensValidate(baseToken)) {
    return;
  }
  let apiToken = baseToken;
  let doc;
  try {
    let docInfo = getFileDoc(baseToken);
    if (docInfo) {
      apiToken = docInfo.tokens;
      doc = docInfo.fileDoc;
    }
  } catch (e) {
    jWarn(`file ${fileName} throw error: ${(e as Error).message}`)
  }

  let children: JhAPIs | undefined;
  try {
    children = apiTreeCreator(apiToken);
  } catch (e) {
    jWarn(`file ${fileName} has unexpected identifier: ${(e as Error).message}`)
    throw e;
  }

  if (!children) {
    throw new Error('api info is empty');
  }

  try {
    children = intersectionsProcess(children);
    children = linkerProcess(children);
    return {
      //  to fix path info
      name: fileName,
      doc,
      children
    }
  } catch (e) {
    throw e;
  }


}
