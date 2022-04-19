/**
 * @description identifier interpreter
 * @author 阿怪
 * @date 2022/4/19 09:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { clearAPI, GToken } from "../apiTreeCreator";
import { SyntaxKind } from "typescript";
import { DocComment } from "@microsoft/tsdoc";
import { parseComment } from "../../extractor/tools/parseComment";
import { JhAPI, JhAPIs } from "../../../types/janghood-api-extractor";
import { jError } from "../../common/console";
import { Token } from "../../extractor/tools/tokenExtractor";


// when token is identifier
export const identifierInterpreter = (tokenIterator: GToken) => {
  let token = tokenIterator.next();
  if (!token.value) {
    jError('interpreter error: identifier is empty');
  }
  let jhApi: JhAPI = { doc: {}, name: '', children: [], intersections: [] };
  if (token.value!.kind !== SyntaxKind.EqualsToken) {
    // unknown token
    jError(`【interpreter error】 unknown token ${token.value?.key} kind is ${token.value?.kind}`);
  }

  // after equal token,
  // 1. open brace token "{"
  // 2. identifier token with ampersand "&"

  // type identifier
  const iResult = interpretType(tokenIterator);
  tokenIterator = iResult.tokenIterator;
  token = tokenIterator.next();
  jhApi.children = iResult.children;

  // 1. maybe document is end
  if (token.done) {
    return { jhApi, tokenIterator };
  }

  // 2. maybe have AmpersandToken
  if (token.value!.kind === SyntaxKind.AmpersandToken) {
    const iResult = interpretIntersections(token, tokenIterator);
    tokenIterator = iResult.tokenIterator;
    jhApi.intersections!.push(...iResult.intersections);
  }


  // 3. maybe have other identifier
  // not support right now

  return {
    jhApi: clearAPI(jhApi),
    tokenIterator
  };
}


/**
 * interpret whole type block
 * @param tokenIterator
 */
const interpretType = (tokenIterator: GToken) => {
  let token = tokenIterator.next();
  if (!token.value) {
    jError('interpreter error: type identifier is empty');
  }
  if (token.value!.kind !== SyntaxKind.OpenBraceToken) {
    jError('interpreter error: can not interpret type block');
  }
  // must start with openBraceToken

  const children: JhAPIs = [];

  // interpret every param
  while (token.value!.kind !== SyntaxKind.CloseBraceToken) {
    if (!passedKind(token.value!.kind)) {
      token = tokenIterator.next();
      continue;
    }

    let paramJhApi: JhAPI = { doc: {}, name: '', children: [], intersections: [] };
    // interpret a param

    // if type param has comment
    if (token.value!.kind === SyntaxKind.MultiLineCommentTrivia) {
      // old parser comment function
      if (token.value!.comment instanceof DocComment) {
        const apiObj = parseComment(token.value!.comment);
        if (Object.keys(apiObj).length > 0) {
          // identifierAPI.doc must only have one
          paramJhApi.doc = apiObj;
        }
      }

      token = tokenIterator.next();
    }


    const iResult = getParamInfo(token, tokenIterator);
    tokenIterator = iResult.tokenIterator;
    paramJhApi = {
      doc: { ...paramJhApi.doc, ...iResult.jhApi.doc },
      name: iResult.jhApi.name,
      children: iResult.jhApi.children,
    }
    token = iResult.token;
    children.push(clearAPI(paramJhApi));
  }
  // until closeBraceToken

  return {
    children,
    tokenIterator
  };
}

/**
 * to identifier a param info
 * support like this:
 * - param: boolean,
 * - [K in AEnum]?: string
 * break at identifier or  comma or close brace
 */
const getParamInfo = (currentToken: IteratorResult<Token>, tokenIterator: GToken) => {
  const jhApi: JhAPI = { doc: {}, name: '', children: [], intersections: [] };

  if (currentToken.value!.kind !== SyntaxKind.Identifier) {
    // if is '['
    if (currentToken.value!.kind === SyntaxKind.OpenBracketToken) {
      // skip open bracket token
      currentToken = tokenIterator.next();
      const tokenList: string[] = [];
      while (currentToken.value!.kind !== SyntaxKind.CloseBracketToken) {
        tokenList.push(currentToken.value!.key);
        currentToken = tokenIterator.next();
      }
      jhApi.name = tokenList.join(' ');
      // skip close bracket token
      tokenIterator.next();
    } else {
      jError(`interpreter error: can not interpret type block => ${currentToken.value!.key} kind:${currentToken.value!.kind}`);
    }
  } else {
    jhApi.name = currentToken.value!.key;
  }


  jhApi.doc = {
    required: 'true'
  }

  let token = tokenIterator.next();
  // kind is ?
  if (token.value!.kind === SyntaxKind.QuestionToken) {
    jhApi.doc.required = 'false';
    token = tokenIterator.next();
  }

  if (token.value!.kind !== SyntaxKind.ColonToken) {
    jError(`type interpreter error: identifier followed token can not be ${token.value!.key} `);
  }

  token = tokenIterator.next();
  const keyList = [];
  while (notBreakKind(token.value!.kind)) {
    keyList.push(token.value!.key);
    token = tokenIterator.next();
  }
  jhApi.doc.type = keyList.join('');

  return {
    jhApi,
    token,
    tokenIterator,
  };
}

const notBreakKind = (kind: SyntaxKind) => {
  return ![SyntaxKind.Identifier,
    SyntaxKind.CloseBraceToken,
    SyntaxKind.CommaToken,
    SyntaxKind.MultiLineCommentTrivia].includes(kind);
}

const passedKind = (kind: SyntaxKind) => {
  return [SyntaxKind.Identifier,
    SyntaxKind.MultiLineCommentTrivia,
    // 中括号
  ].includes(kind);
}

const interpretIntersections = (currentToken: IteratorResult<Token>, tokenIterator: GToken) => {
  const intersections = [];
  while (currentToken.value!.kind === SyntaxKind.AmpersandToken) {
    currentToken = tokenIterator.next();
    if (currentToken.value!.kind !== SyntaxKind.Identifier) {
      jError('ampersand token must be followed by identifier');
    }
    intersections.push(currentToken.value!.key);
    currentToken = tokenIterator.next();
  }

  return {
    intersections,
    tokenIterator
  }
}
