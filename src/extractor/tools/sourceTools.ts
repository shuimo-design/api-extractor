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

const defaultExFiles = ['node_modules', 'dist', '.nuxt', '.yarn', 'assets'];


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
 * @param exclude
 */
export const getSourceFilenameList = (filepath: string, exclude: readonly string[] = defaultExFiles): Promise<string[]> => {
  const filePromise = (__filename: string) => {
    // for single document/file name  针对单个文件(夹)名
    return new Promise<string[]>((resolve2) => {
      const newFilePath = path.join(filepath, __filename);
      fs.stat(newFilePath, async (error, stats) => {
        if (stats.isFile()) {
          if (newFilePath.endsWith('.d.ts') && !exclude.some(e => newFilePath.includes(e))) {
            resolve2([newFilePath]);
          }
          resolve2([]);
        }

        const isDocument = stats.isDirectory();
        if (isDocument &&
          !exclude.some(e => newFilePath.includes(e))) {
          const files = await getSourceFilenameList(newFilePath, exclude);
          resolve2(files);
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
 * @param include ['src']
 * @param exclude []
 * @return source filename list
 */
export const getSourceFilenameLists = async (include: string[],
                                             exclude?: string[]): Promise<string[]> => {
  if (exclude) {
    defaultExFiles.push(...exclude);
  }
  const sourceFileLists = await Promise.all(include.map(async path =>
    new Promise<string[]>(async resolve => {
      const res = await getSourceFilenameList(path, defaultExFiles);
      resolve(res);
    })));

  return sourceFileLists.flat();
}

