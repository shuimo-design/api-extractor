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
import webTypes from "./documenter/web-types";
import FileParser from "./parse/file/FileParser";

const apiExtractor = async (option: OptionType): Promise<TransformedAPI[]> => {
  const sourceList = await new FileScanner(option).run();
  const fp = new FileParser();
  await fp.init();
  const apiList = await Promise.all(
    sourceList.map(source => new Promise<TransformedAPI | null>(async resolve => {
      const api = await parse(fp, source);
      if (api) {
        resolve({
          ...api,
          file: source.file
        });
      }
      resolve(null);
    }))
  );

  return (apiList.filter(e => e) as TransformedAPI[]).flat();
}

export {
  apiExtractor,
  webTypes
};
