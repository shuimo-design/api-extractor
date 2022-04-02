/**
 * @description file scanner
 * @author 阿怪
 * @date 2022/4/3 12:16 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from "path";
import os from "os";
import type { Program } from "typescript";
import { createProgram, flattenDiagnosticMessageText, ScriptTarget } from "typescript";

/**
 * file scanner
 * @param src root src
 */
export const fileScanner = (src?: string) => {
  const sourceFileSrc = '../lib/index.d.ts';
  const inputFilename: string = path.resolve(path.join(__dirname, '..', '', sourceFileSrc));

  return getSource(inputFilename, compiler([inputFilename]));
}

/**
 * compiler files and return program
 * @param rootNames
 */
const compiler = (rootNames: string[]) => {
  const program = createProgram(rootNames, {
    target: ScriptTarget.ESNext
  });
  // Report any compiler errors
  const compilerDiagnostics = program.getSemanticDiagnostics();
  if (compilerDiagnostics.length > 0) {
    for (const diagnostic of compilerDiagnostics) {
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
  } else {
    console.log('No compiler errors or warnings.');
  }
  return program;
}

/**
 * get file source
 * @param inputFilename
 * @param program
 */
const getSource = (inputFilename: string, program: Program) => {
  const sourceFile = program.getSourceFile(inputFilename);
  if (!sourceFile) {
    throw new Error('Error retrieving source file');
  }
  return sourceFile;
}
