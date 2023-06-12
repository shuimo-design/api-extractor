/**
 * @description file scanner
 * @author 阿怪
 * @date 2022/4/7 2:49 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { APIOptionType } from '@janghood/config';
import os from 'os';
import type { SourceFile } from 'typescript';
import typescript from 'typescript';
import { getSource, getSourceFilenameLists } from './sourceTools';


const { createProgram, flattenDiagnosticMessageText, ScriptTarget } = typescript;

/**
 * @description file scanner will return this type array.
 */
export type SourceFileInfo = {
  source: SourceFile,
  filename: string
}

export const fileScanner = async (option: APIOptionType): Promise<SourceFileInfo[]> => {

  const include = option.include || ['/src/**/*.d.ts'];
  const exclude = option.exclude || [];

  /**
   * compiler files
   * @param rootNames
   */
  const compiler = (rootNames: string[]) => {
    const program = createProgram(rootNames, {
      target: ScriptTarget.ESNext
    });
    // Report any compiler errors

    const ignoreCodeList: number[] = [2792];  // maybe 2792 is import error
    const compilerDiagnostics = program.getSemanticDiagnostics();
    if (compilerDiagnostics.length > 0) {
      for (const diagnostic of compilerDiagnostics) {
        if (ignoreCodeList.includes(diagnostic.code)) {
          continue;
        }
        const message: string = flattenDiagnosticMessageText(diagnostic.messageText, os.EOL);
        if (diagnostic.file) {
          const location = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
          const formattedMessage =
            `${diagnostic.file.fileName}(${location.line + 1},${location.character + 1}): [TypeScript] ${message}`;
          // jWarn(formattedMessage);
        } else {
          // jWarn(message);
        }
      }
    }
    return program;
  };
  const sourceFileList = await getSourceFilenameLists(include, exclude);
  const program = compiler(sourceFileList);
  return sourceFileList.map(filename => ({
    source: getSource(filename, program),
    filename
  }));
};
