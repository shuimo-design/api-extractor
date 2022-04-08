/**
 * @description
 * @author 阿怪
 * @date 2022/4/3 1:52 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocNode, DocExcerpt, ParserContext } from "@microsoft/tsdoc";
import type { SourceFile } from "typescript";
import path from "path";

export const notSoftBreak = (docNode: DocNode) => {
  if (docNode instanceof DocExcerpt && docNode.excerptKind === "SoftBreak") {
    return false;
  }
  return docNode.kind !== "SoftBreak";
}
export const isSoftBreak = (docNode: DocNode) => {
  return !notSoftBreak(docNode);
}

export const logMessage = (parserContext: ParserContext, sourceFile: SourceFile) => {
  if (parserContext.log.messages.length === 0) {
    return;
  }
  for (const message of parserContext.log.messages) {
    // Since we have the compiler's analysis, use it to calculate the line/column information,
    // since this is currently faster than TSDoc's TextRange.getLocation() lookup.
    const location = sourceFile.getLineAndCharacterOfPosition(message.textRange.pos);
    const formattedMessage = `${sourceFile.fileName}(${location.line + 1},${location.character + 1}): [TSDoc] ${message}`;
    console.warn(formattedMessage);
  }
}

export const getPathInfo = (fileSrc: string) => {
  const file = path.basename(fileSrc);
  const directory = path.dirname(fileSrc);

  return {
    file,
    directory
  }
}
