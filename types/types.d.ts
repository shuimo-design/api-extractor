/**
 * @description types
 * @author 阿怪
 * @date 2022/4/3 3:49 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocNode } from "@microsoft/tsdoc";
import { SyntaxKind } from "typescript";
import type { Node } from "typescript";

type OptionType = {
  tokenTranslator?: any, // todo can use custom token translator
  fileSrc?: string,
}

export declare type DocAPIType = {
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


type IdentifierAPI = {
  doc: Record<string, string>,
  identifier: string,
  children: IdentifierAPI[]
}
