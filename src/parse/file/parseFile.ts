/**
 * @description parse one file
 * @author 阿怪
 * @date 2022/4/3 9:37 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SyntaxKind } from "typescript";
import { forEachTokenWithTrivia } from "tsutils";
import {
  DocComment,
  ParserContext,
  TextRange,
  TSDocConfiguration,
  TSDocParser
} from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import path from "path";
import type { SourceFile } from "typescript";
import type { Tokens } from "../../../types/types";
import { translator } from "../../translator";

const jsonConfig: string = '/../config/tsdoc.json';
const tsdocConfigFile: TSDocConfigFile = TSDocConfigFile.loadFile(path.dirname(__dirname) + jsonConfig);
const customConfiguration: TSDocConfiguration = new TSDocConfiguration();
tsdocConfigFile.configureParser(customConfiguration);
const tsdocParser: TSDocParser = new TSDocParser(customConfiguration);


export const parseFile = async (sourceFile: SourceFile) => {
  const tokens = await getTokens(sourceFile);
  return translator(tokens);;
}

const getTokens = (sourceFile: SourceFile): Promise<Tokens> => {
  const buffer = sourceFile.getSourceFile().getFullText();
  const comments: any[] = [];
  return new Promise((resolve) => {
    forEachTokenWithTrivia(sourceFile, (fullText, kind, range, parent) => {
      const textRange = TextRange.fromStringRange(buffer, range.pos, range.end);
      const comment = getComment(textRange);
      comments.push({
        kind,
        key: textRange.toString(),
        comment,
        parent
      });
      // console.log(textRange.toString(),range.pos, range.end);
      if (kind === SyntaxKind.EndOfFileToken) {
        resolve(comments);
      }
    });
  })
}

const getComment = (textRange: TextRange) => {
  const parserContext: ParserContext = tsdocParser.parseRange(textRange);
  const docComment: DocComment = parserContext.docComment;
  return docComment;
}



