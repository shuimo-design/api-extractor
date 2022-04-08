/**
 * @description main extractor
 * @author 阿怪
 * @date 2022/4/7 2:42 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { APIOptionType } from "../../types/module/config";
import type { JhAPIs } from "../../types/janghood-api-extractor";
import { fileScanner, SourceFileInfo } from "./tools/fileScanner";
import { tokenExtractor } from "./tools/tokenExtractor";

export const extractor = async (option: APIOptionType): Promise<JhAPIs> => {
  // get file source list
  const fileSourceList: SourceFileInfo[] = await fileScanner(option);
  const { extractFileSource } = await tokenExtractor();
  return await extractFileSource(fileSourceList);
}
