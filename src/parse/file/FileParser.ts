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
import type { Tokens } from "../../../types/types";
import { translator } from "../../translator";
import { SourceFileInfo } from "../../../types/types";
import jsonConfigObjStr from "../../../tsdoc.json";

export default class FileParser {
  private tsdocParser: TSDocParser | undefined;


  constructor() {
  }

  async init() {
    if (!jsonConfigObjStr) {
      throw new Error('tsdoc.json not found');
    }
    const tsdocConfigFile = TSDocConfigFile.loadFromObject(jsonConfigObjStr);
    const customConfiguration = new TSDocConfiguration();
    tsdocConfigFile.configureParser(customConfiguration);
    this.tsdocParser = new TSDocParser(customConfiguration);
  }

  getTokens(sourceFile: SourceFileInfo): Promise<Tokens> {
    const buffer = sourceFile.source.getSourceFile().getFullText();
    const comments: any[] = [];
    return new Promise((resolve) => {
      forEachTokenWithTrivia(sourceFile.source, (fullText, kind, range, parent) => {
        const textRange = TextRange.fromStringRange(buffer, range.pos, range.end);
        const comment = this.getComment(textRange);
        comments.push({
          kind,
          key: textRange.toString(),
          comment,
          parent
        });
        if (kind === SyntaxKind.EndOfFileToken) {
          resolve(comments);
        }
      });
    })
  }

  getComment(textRange: TextRange) {
    const parserContext: ParserContext = this.tsdocParser!.parseRange(textRange);
    const docComment: DocComment = parserContext.docComment;
    return docComment;
  }

  async run(sourceFile: SourceFileInfo) {
    const tokens = await this.getTokens(sourceFile);
    return translator(tokens, sourceFile.file);
  }
}





