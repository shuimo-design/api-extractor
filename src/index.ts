/**
 * @description
 * @author 阿怪
 * @date 2022/4/2 11:46 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { parse } from "./parse";
import { fileScanner } from "./source/fileScanner";
import { OptionType } from "../types/types";

export const apiExtractor = async (option: OptionType) => {
  const file = fileScanner(option.fileSrc);
  return await parse(file);
}

