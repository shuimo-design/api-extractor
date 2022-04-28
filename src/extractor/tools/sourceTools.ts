/**
 * @description source handler tools
 * @author 阿怪
 * @date 2022/4/7 3:23 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Program } from "typescript";
import path from "path";
import fs from "fs";
import FastGlob from 'fast-glob';


/**
 * get file source
 * @param inputFilename
 * @param program
 */
export const getSource = (inputFilename: string, program: Program) => {
  const sourceFile = program.getSourceFile(inputFilename);
  if (!sourceFile) {
    throw new Error('Error retrieving source file');
  }
  return sourceFile;
}

/**
 * get filename list from filepath
 * @param filepath filepath
 */
export const getSourceFilenameList = (filepath: string): Promise<string[]> => {
  const filePromise = (__filename: string) => {
    // for single file name  针对单个文件名
    return new Promise<string[]>((resolve2) => {
      const newFilePath = path.join(filepath, __filename);
      fs.stat(newFilePath, async (error, stats) => {
        if (stats.isFile()) {
          resolve2([newFilePath]);
        }
        resolve2([]);
      });
    })
  }
  return new Promise((resolve) => {
    // maybe need to check dir or file
    fs.readdir(filepath, async (err, files) => {
      if (err) {
        console.warn(filepath, err);
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

/**
 * @description get source filename list
 * @param include ['/src\/**\/*.d.ts']
 * @param exclude []
 * @return source filename list
 */
export const getSourceFilenameLists = async (include: string[],
                                             exclude?: string[]): Promise<string[]> => {
  return await FastGlob(include, { ignore: exclude });
}

