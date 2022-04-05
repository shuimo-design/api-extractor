/**
 * @description types
 * @author 阿怪
 * @date 2022/4/3 3:49 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocNode } from "@microsoft/tsdoc";
import { SourceFile, SyntaxKind } from "typescript";
import type { Node } from "typescript";

type OptionType = {
  include?: string[],
  exclude?: string[],
  translator?: {
    token?: () => void,
  },
  document?: WebTypeOption
}

type WebTypeOption = {
  webTypesInfo?: Doc,
  packageUrl?: string,
  sourceSymbolTranslator?: (dirList: string[]) => string
}

type SourceFileInfo = {
  source: SourceFile,
  file: string
}

type TransformedAPI = {
  fileDoc: any,
  file: string,
  identifierAPIs: IdentifierAPI[]
};

type DocAPIType = {
  key: string,
  value: string
}

type Token = {
  kind: SyntaxKind,
  comment: DocNode,
  key: string,
  parent: Node
};
type Tokens = Token[];

type Doc = Record<string, string>;

type IdentifierAPI = {
  doc?: Doc,
  identifier: string,
  children?: IdentifierAPI[]
}
