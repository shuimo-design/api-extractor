/**
 * @description
 * @author 阿怪
 * @date 2022/4/3 12:38 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { SourceFile } from "typescript";
import { parseFile } from "./file/parseFile";

export const parse = async (sourceFile: SourceFile) => {
  return await parseFile(sourceFile);
}
