/**
 * @description to create token tree
 * @author 阿怪
 * @date 2022/4/4 12:00 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import typescript from "typescript";
import type { Token, Tokens } from "../extractor/tools/tokenExtractor";
import type { JhAPI, JhAPIs } from "../../types/janghood-api-extractor";
import { identifierInterpreter } from "./interpreter/identifier";

const { SyntaxKind } = typescript;
export type GToken = Generator<Token, void, unknown>

const toTokenIterator: (tokens: Tokens) => GToken = tokens => {
  // clear token
  const t = tokens.filter(t => t.kind !== 4 && t.kind !== 5);

  function* tokenIterable() {
    for (let i = 0; i < t.length; i++) {
      yield t[i];
    }
  }

  return tokenIterable();
}


export const apiTreeCreator = (tokens: Tokens) => {
  const identifierAPIs: JhAPIs = [];

  let tokenIterator = toTokenIterator(tokens);
  let token = tokenIterator.next();

  while (!token.done) {
    const { kind } = token.value;

    if (kind === SyntaxKind.TypeKeyword) {
      // is type
      token = tokenIterator.next();
      if (token.value!.kind === SyntaxKind.Identifier) {
        let jhApi: JhAPI = { doc: {}, name: '', children: [], intersections: [] };
        const name = token.value!.key;
        const iResult = identifierInterpreter(tokenIterator, name);
        jhApi.name = iResult.name;
        tokenIterator = iResult.tokenIterator;
        if (iResult.jhApi.children) {
          jhApi.children!.push(...iResult.jhApi.children);
        }
        if (iResult.jhApi.intersections) {
          jhApi.intersections!.push(...iResult.jhApi.intersections);
        }
        identifierAPIs.push(clearAPI(jhApi));
      }
      token = tokenIterator.next();
      continue;
    }

    if (kind === SyntaxKind.EnumKeyword) {

    }

    token = tokenIterator.next();
  }


  return identifierAPIs;
}

export const clearAPI = (jhApi: JhAPI) => {
  if (jhApi.children && jhApi.children.length === 0) {
    delete jhApi.children;
  }
  if (jhApi.intersections && jhApi.intersections.length === 0) {
    delete jhApi.intersections;
  }
  if (Object.keys(jhApi.doc!).length === 0) {
    delete jhApi.doc;
  }
  return jhApi;
}
