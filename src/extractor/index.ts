/**
 * @description main extractor
 * @author 阿怪
 * @date 2022/4/7 2:42 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { APIOptionType } from "@janghood/config";
import type { JhAPIs } from "../../types/janghood-api-extractor";
import { fileScanner, type SourceFileInfo } from "./tools/fileScanner";
import { tokenExtractor } from "./tools/tokenExtractor";
import { linkJHAPIs } from "../link";

export const extractor = async (option: APIOptionType): Promise<JhAPIs> => {
  // get file source list
  const fileSourceList: SourceFileInfo[] = await fileScanner(option);
  const { extractFileSource } = await tokenExtractor();
  const res =  await extractFileSource(fileSourceList);
  return linkJHAPIs(res);
}
