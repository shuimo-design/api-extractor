/**
 * @description load package.json
 * @author 阿怪
 * @date 2022/4/5 11:41 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import fs from 'fs';
import { Doc } from '@janghood/config';

export const loadPackage = (packageUrl = 'package.json'): Promise<Doc> => {
  return new Promise((resolve, reject) => {
    fs.readFile(packageUrl, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const packageJson = JSON.parse(data);
      resolve(packageJson);
    });
  });
};
