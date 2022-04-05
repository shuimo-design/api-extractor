/**
 * @description
 * @author 阿怪
 * @date 2022/4/2 11:46 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { parse } from "./parse";
import FileScanner from "./file/FileScanner";
import { OptionType, TransformedAPI } from "../types/types";

export const apiExtractor = async (option: OptionType): Promise<TransformedAPI[]> => {
  const sourceList = await new FileScanner(option).run();
  const apiList = await Promise.all(
    sourceList.map(source => new Promise<TransformedAPI>(async resolve => {
      const api = await parse(source);
      resolve({
        ...api,
        file: source.file
      });
    }))
  );

  return apiList.flat();
}

