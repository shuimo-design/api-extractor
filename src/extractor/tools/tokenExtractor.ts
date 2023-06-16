/**
 * @description token extractor
 * @author 阿怪
 * @date 2022/4/7 3:06 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { jError } from '../../common/console';
import { TSDocConfigFile } from '@microsoft/tsdoc-config';
import { DocNode, TextRange, TSDocConfiguration, TSDocParser } from '@microsoft/tsdoc';
import { forEachTokenWithTrivia } from 'tsutils';
import type { Node, SyntaxKind as SyntaxKindType } from 'typescript';
import typescript from 'typescript';
import type { SourceFileInfo } from './fileScanner';
import { translator } from '../../translator';
import { JhAPI, JhAPIs } from '../../../types/janghood-api-extractor';
import { getPathInfo, logMessage } from './uitls';
import jsonConfigObjStr from '../../../tsdoc.json';
import { ApiExtractorType } from '@janghood/config/types/api-extractor/apiExtractor';

const { SyntaxKind } = typescript;

export declare type Token = {
  kind: SyntaxKindType,
  comment: DocNode,
  key: string,
  parent: Node
};
export declare type Tokens = Token[];

export const parseInit = (option?: ApiExtractorType) => {
  // need init config
  if (!jsonConfigObjStr) {
    jError('tsdoc.json not found');
  }

  if (option?.annotate && jsonConfigObjStr.tagDefinitions) {
    const tagDefinitions = Object.keys(option.annotate)
      .map(tagName => ({ tagName: `@${tagName}`, syntaxKind: option.annotate![tagName].type ?? 'block' }));
    jsonConfigObjStr.tagDefinitions.push(...tagDefinitions);
  }
  const tsdocConfigFile = TSDocConfigFile.loadFromObject(jsonConfigObjStr ?? {});
  const customConfiguration = new TSDocConfiguration();
  tsdocConfigFile.configureParser(customConfiguration);
  const tsdocParser = new TSDocParser(customConfiguration);

  return {
    tsdocParser
  };
};

export const tokenExtractor = async (option?: ApiExtractorType) => {

  const { tsdocParser } = parseInit(option);

  const getComment = (textRange: TextRange) => {
    const parserContext = tsdocParser!.parseRange(textRange);
    return parserContext.docComment;
  };

  const getTokensByFile = async (sourceFile: SourceFileInfo): Promise<Tokens> => {
    const { source } = sourceFile;
    const buffer = source.getSourceFile().getFullText();
    // check hole source file first
    const parserContent = tsdocParser.parseString(buffer);
    logMessage(parserContent, source);

    const comments: Tokens = [];
    return new Promise((resolve) => {
      forEachTokenWithTrivia(source, (fullText, kind, range, parent) => {
        const textRange = TextRange.fromStringRange(buffer, range.pos, range.end);
        const comment: DocNode = getComment(textRange);
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
    });
  };

  /**
   * @description extract single file
   * @param sourceFile file info
   */
  const extract = async (sourceFile: SourceFileInfo) => {
    const tokens = await getTokensByFile(sourceFile);
    try {
      return translator(tokens, sourceFile.filename, option?.annotate);
    } catch (e) {
      jError(`file:${sourceFile.filename}: ${(e as Error).message}`);
    }
  };

  const extractFileSource = async (fileSourceList: SourceFileInfo[]) => {
    const apiList = await Promise.all(
      fileSourceList.map(source => new Promise<JhAPI | undefined>(async resolve => {
        const api = await extract(source);
        if (api) {
          const pathInfo = getPathInfo(source.filename);
          resolve({
            ...api,
            name: source.filename,
            path: pathInfo
          });
        }
        resolve(undefined);
      }))
    );
    return (apiList.filter(e => e) as JhAPIs).flat();
  };

  return {
    getTokensByFile,
    extract,
    extractFileSource
  };
};
