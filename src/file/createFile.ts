/**
 * @description create file
 * @author 阿怪
 * @date 2022/4/6 9:25 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import fs from 'fs';

export const createFile = (fileName: string, source: string) => {
  fs.writeFile(fileName, source, 'utf8', (err) => {
    if (err) {
      console.warn(err);
    }
  })
}
