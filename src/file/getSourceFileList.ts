/**
 * @description source file list getter
 * @author 阿怪
 * @date 2022/4/5 6:28 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import fs from "fs";
import path from "path";

export const getSourceFileList = (filePath: string, excludes?: string[]): Promise<string[]> => {
  const defaultExFiles = ['node_modules', 'dist', '.nuxt', '.yarn', 'assets'];
  if (excludes) {
    defaultExFiles.push(...excludes);
  }
  const filePromise = (__filename: string) => {
    // for single document/file name  针对单个文件(夹)名
    return new Promise<string[]>((resolve2) => {
      const newFilePath = path.join(filePath, __filename);
      fs.stat(newFilePath, async (error, stats) => {
        if (stats.isFile()) {
          if (newFilePath.endsWith('.d.ts')) {
            resolve2([newFilePath]);
          }
          resolve2([]);
        }

        const isDocument = stats.isDirectory();
        if (isDocument &&
          !defaultExFiles.every(e => newFilePath.includes(e))) {
          const files = await getSourceFileList(newFilePath);
          resolve2(files);
        }
      });
    })
  }
  return new Promise((resolve) => {
    // maybe need to check dir or file
    fs.readdir(filePath, async (err, files) => {
      if (err) {
        console.warn(filePath, err);
        resolve([]);
      }
      // 针对path下每个file or document
      if (files) {
        const filePromises = files.map(__filename => filePromise(__filename));
        const scanList = await Promise.all(filePromises);
        const fileList = scanList.flat();
        resolve(fileList);
      }
      resolve([]);
    })
  })
}

