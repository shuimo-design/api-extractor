/**
 * @description web-type types
 * @author 阿怪
 * @date 2022/4/7 8:17 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { BaseDocumentOption, Doc } from "./common";

/**
 * @description web-type option types
 */
export declare type WebTypeOption = {
  /**
   * @description to fill base web-type.json information
   * @type object
   * @default {}
   */
  webTypesInfo?: Doc,
  /**
   * @description package.json path , to set name\version
   * @type string
   * @default 'package.json'
   */
  packageUrl?: string,
  /**
   * @description source symbol translator
   * @type (dirList: string[]) => string
   * @default extDir name
   */
  sourceSymbolTranslator?: (dirList: string[]) => string
} & BaseDocumentOption;

/**
 * @description web-type types, maybe is a vue prop **attribute** info
 * @example
 * ``` json
 * {
 *   "name": "text",
 *   "description": "button component text attribute",
 *   "doc-url": "https://higuaifan.com",
 *   "value":{
 *     "type": "string",
 *     "default": "",
 *     "kind": "expression"
 *   }
 * }
 * ```
 */
export type WebTypesAttributes = {
  name: string,
  description?: string,
  'doc-url'?: string,
  value?: Doc
}

/**
 * @description web-type tag types, maybe is a vue prop info,includes all attributes
 */
export type WebTypesTag = {
  name: string,
  source?: { symbol: string } | { file: string, offset: number },
  description?: string,
  'doc-url'?: string,
  attributes?: WebTypesAttributes[],
  events?: [],
  slots?: []
}
