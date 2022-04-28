/**
 * @description source handler tools
 * @author 阿怪
 * @date 2022/4/7 3:23 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Program } from "typescript";
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
 * @description get source filename list
 * @param include ['/src\/**\/*.d.ts']
 * @param exclude []
 * @return source filename list
 */
export const getSourceFilenameLists = async (include: string[],
                                             exclude?: string[]): Promise<string[]> => {
  return await FastGlob(include, { ignore: exclude });
}

