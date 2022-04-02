/**
 * @description
 * @author 阿怪
 * @date 2022/4/3 12:38 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from "path";
import { forEachComment } from "tsutils";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import { logMessage } from "../parse/uitls";
import { parseBlock } from "../parse/parseBlock";
import type { DocAPIType } from "../../types/types";
import {
  DocBlock,
  DocComment,
  DocNode,
  DocSection,
  ParserContext,
  TextRange,
  TSDocConfiguration,
  TSDocParser
} from "@microsoft/tsdoc";
import { SourceFile } from "typescript";


const jsonConfig: string = '/config/tsdoc.json';
const tsdocConfigFile: TSDocConfigFile = TSDocConfigFile.loadFile(path.dirname(__dirname) + jsonConfig);
const customConfiguration: TSDocConfiguration = new TSDocConfiguration();
tsdocConfigFile.configureParser(customConfiguration);
const tsdocParser: TSDocParser = new TSDocParser(customConfiguration);


export const parse = (sourceFile: SourceFile) => {
  const buffer = sourceFile.getSourceFile().getFullText();
  const dumpList: any = [];
  forEachComment(sourceFile, (fullText, comment) => {
    const dumps = parseTSDoc(TextRange.fromStringRange(buffer, comment.pos, comment.end), sourceFile);
    dumpList.push(dumps);
  })
  return dumpList;
}

const parseTSDoc = (textRange: TextRange, sourceFile: SourceFile) => {
  const parserContext: ParserContext = tsdocParser.parseRange(textRange);
  const docComment: DocComment = parserContext.docComment;
  logMessage(parserContext, sourceFile);

  return parseComment(docComment);
}

const parseComment = (comment: DocComment) => {
  const commentApiList: DocAPIType[] = [];
  for (const child of comment.getChildNodes()) {

    const infos = parseCommentChild(child);
    if (infos) {
      commentApiList.push(infos);
    }
  }
  return keyValueListToObj(commentApiList);
}

const parseCommentChild = (node: DocNode) => {
  if (node instanceof DocBlock) {
    return parseBlock(node);
  }
  if (node instanceof DocSection) {
    // need example
    return;
  }
  console.warn(`${node.kind} is not supported`);
  return;
}

const keyValueListToObj = (commentApiList: DocAPIType[]) => {
  const obj: Record<string, string> = {};
  commentApiList.forEach(item => {
    obj[item.key] = item.value;
  });
  return obj;
}


