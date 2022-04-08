/**
 * @description to create token tree
 * @author 阿怪
 * @date 2022/4/4 12:00 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SyntaxKind } from "typescript";
import { DocComment } from "@microsoft/tsdoc";
import { Tokens } from "../extractor/tools/tokenExtractor";
import { JhAPI, JhAPIs } from "../../types/janghood-api-extractor";
import { parseComment } from "../extractor/tools/parseComment";

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
  const identifierAPIs: JhAPIs = [];
  while (index < tokens.length) {
    const { identifierAPI, index: traverseIndex } = traverseToken(tokens, index);
    index = traverseIndex + 1;
    identifierAPIs.push(identifierAPI);
  }

  return identifierAPIs;
}


const traverseToken = (tokens: Tokens, index: number) => {
  const traverse = (pos: number, end: number, index: number) => {
    const jhApi: JhAPI = {
      doc: {},
      name: '',
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
            // identifierAPI.doc must only have one
            jhApi.doc = apiObj;
          }
        }
        if (token.kind === SyntaxKind.Identifier) {
          jhApi.name = token.key;
        }
        continue;
      }

      if (parent.pos >= end) {
        index--;
        break;
      }

      const { identifierAPI: child, index: newIndex } = traverse(parent.pos, parent.end, index);
      i = index = newIndex;
      if (child.name !== '') {
        jhApi.children!.push(child);
      }
    }

    if (jhApi.children && jhApi.children.length === 0) {
      delete jhApi.children;
    }
    if (Object.keys(jhApi.doc!).length === 0) {
      delete jhApi.doc;
    }

    return {
      identifierAPI: jhApi,
      index
    };
  }
  return traverse(tokens[index].parent.pos, tokens[index].parent.end, index);
}
