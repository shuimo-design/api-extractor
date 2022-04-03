/**
 * @description to create token tree
 * @author 阿怪
 * @date 2022/4/4 12:00 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { Tokens, IdentifierAPI } from "../../types/types";
import { SyntaxKind } from "typescript";
import { DocComment } from "@microsoft/tsdoc";
import { parseComment } from "../parse/file/parseComment";

const tokenSkip = (kind: SyntaxKind) => {
  return !![
    SyntaxKind.WhitespaceTrivia,
    SyntaxKind.NewLineTrivia,
    SyntaxKind.OpenBraceToken,
    SyntaxKind.CloseBraceToken,
  ].includes(kind);
}


export const apiTreeCreator = (tokens: Tokens) => {
  let index = 0;
  const identifierAPIs: IdentifierAPI[] = [];
  while (index < tokens.length) {
    const { blockToken, index: traverseIndex } = traverseToken(tokens, index);
    index = traverseIndex + 1;
    identifierAPIs.push(blockToken);
  }

  return identifierAPIs;
}


const traverseToken = (tokens: Tokens, index: number) => {
  const traverse = (pos: number, end: number, index: number) => {
    const blockToken: IdentifierAPI = {
      doc: {},
      identifier: '',
      children: []
    };
    for (let i = index; i < tokens.length; i++) {
      if (tokenSkip(tokens[i].kind)) continue;
      const token = tokens[i];
      index = i;
      const parent = token.parent;

      if (parent.pos === pos && parent.end === end) {
        // set api
        if (token.comment instanceof DocComment) {
          const apiObj = parseComment(token.comment);
          if (Object.keys(apiObj).length > 0) {
            // blockToken.doc must only have one
            blockToken.doc = parseComment(token.comment);
          }
        }
        if (token.kind === SyntaxKind.Identifier) {
          blockToken.identifier = token.key;
        }
        continue;
      }

      if (parent.pos >= end) {
        index--;
        break;
      }

      const { blockToken: child, index: newIndex } = traverse(parent.pos, parent.end, index);
      i = index = newIndex;
      blockToken.children.push(child);
    }

    return {
      blockToken,
      index
    };
  }
  return traverse(tokens[index].parent.pos, tokens[index].parent.end, index);
}
