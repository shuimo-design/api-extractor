/**
 * @description file scanner
 * @author 阿怪
 * @date 2022/4/3 12:16 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import os from "os";
import { createProgram, flattenDiagnosticMessageText, ScriptTarget } from "typescript";
import { getSourceFileList } from "./getSourceFileList";
import type { Program } from "typescript";
import type { SourceFileInfo } from "../../types/types";

/**
 * @description file scanner
 * @param include {string[]}
 * @param exclude {string[]}
 */
export default class FileScanner {
  basePaths: string[];
  exclude: string[];

  constructor(options: { include?: string[], exclude?: string[], }) {
    this.basePaths = options.include || ['src'];
    this.exclude = options.exclude || [];
  }

  /**
   * compiler files and return program
   * @param rootNames
   */
  private compiler = (rootNames: string[]) => {
    const program = createProgram(rootNames, {
      target: ScriptTarget.ESNext
    });
    const ignoreCodeList: number[] = [2792];  // maybe 2792 is import error

    // Report any compiler errors
    const compilerDiagnostics = program.getSemanticDiagnostics();
    if (compilerDiagnostics.length > 0) {
      for (const diagnostic of compilerDiagnostics) {
        if (ignoreCodeList.includes(diagnostic.code)) {
          continue;
        }
        const message: string = flattenDiagnosticMessageText(diagnostic.messageText, os.EOL);
        if (diagnostic.file) {
          const location = diagnostic.file.getLineAndCharacterOfPosition(
            diagnostic.start!
          );
          const formattedMessage: string =
            `${diagnostic.file.fileName}(${location.line + 1},${location.character + 1}):` +
            ` [TypeScript] ${message}`;
          console.warn(formattedMessage);
        } else {
          console.warn(message);
        }
      }
    }
    return program;
  }

  /**
   * get file source
   * @param inputFilename
   * @param program
   */
  private getSource = (inputFilename: string, program: Program) => {
    const sourceFile = program.getSourceFile(inputFilename);
    if (!sourceFile) {
      throw new Error('Error retrieving source file');
    }
    return sourceFile;
  }


  run = async (): Promise<SourceFileInfo[]> => {
    const sourceFileLists = await Promise.all(this.basePaths.map(async path =>
      new Promise<string[]>(async resolve => {
        const res = await getSourceFileList(path, this.exclude);
        resolve(res);
      })))
    const sourceFileList = sourceFileLists.flat()
    const program = this.compiler(sourceFileList);
    return sourceFileList.map(file => ({
      source: this.getSource(file, program),
      file
    }));
  }
}
