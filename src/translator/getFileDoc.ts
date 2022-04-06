/**
 * @description get file doc
 * @author 阿怪
 * @date 2022/4/3 11:06 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { Tokens } from "../../types/types";
import { SyntaxKind } from "typescript";
import { DocComment } from "@microsoft/tsdoc";
import { parseComment } from "../parse/file/parseComment";


export const getFileDoc = (oldTokens: Tokens) => {
  // maybe need to jump import \ whitespace \ break line
  const [fileDocComment, ...tokens] = oldTokens;
  let fileDoc = null;
  if (fileDocComment.kind !== SyntaxKind.MultiLineCommentTrivia ||
    !(fileDocComment.comment instanceof DocComment)) {
    throw new Error('this doc is no file comment');
  }
  fileDoc = parseComment(fileDocComment.comment);
  return {
    fileDoc,
    tokens
  };
}
