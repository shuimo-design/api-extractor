/**
 * @description get file doc
 * @author 阿怪
 * @date 2022/4/3 11:06 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import typescript from "typescript";
import { DocComment } from "@microsoft/tsdoc";
import { Tokens } from "../extractor/tools/tokenExtractor";
import { parseComment } from "../extractor/tools/parseComment";
import { jError } from "../common/console";

const { SyntaxKind } = typescript;


export const getFileDoc = (oldTokens: Tokens) => {
  // maybe need to jump import \ whitespace \ break line
  const [fileDocComment, ...tokens] = oldTokens;
  let fileDoc = null;
  if (fileDocComment.kind !== SyntaxKind.MultiLineCommentTrivia ||
    !(fileDocComment.comment instanceof DocComment)) {
    jError('this doc is no file comment');
    return;
  }
  fileDoc = parseComment(fileDocComment.comment);
  return {
    fileDoc,
    tokens
  };
}
