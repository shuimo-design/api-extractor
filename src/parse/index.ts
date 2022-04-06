/**
 * @description
 * @author 阿怪
 * @date 2022/4/3 12:38 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import FileParser from "./file/FileParser";
import type { SourceFileInfo } from "../../types/types";

export const parse = async (fp: FileParser, sourceFile: SourceFileInfo) => {
  return await fp.run(sourceFile);
}
