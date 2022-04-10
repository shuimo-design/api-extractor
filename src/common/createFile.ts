/**
 * @description create file
 * @author 阿怪
 * @date 2022/4/6 9:25 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import fs from 'fs';
import path from "path";
import { jWarn } from "./console";

export const createFile = (fileName: string, source: string) => {
  // check dict
  const dictList = fileName.split(path.sep);
  const dict = dictList.slice(0, dictList.length - 1).join(path.sep);
  fs.readdir(dict, async (err) => {
    if (err) {
      fs.mkdir(dict, { recursive: true }, () => {
        writeFile(fileName, source);
      });
      return;
    }
    writeFile(fileName, source);
  })
}

const writeFile = (fileName: string, source: string) => {
  fs.writeFile(fileName, source, 'utf8', (err) => {
    if (err) {
      jWarn('write file error');
    }
  })
}
