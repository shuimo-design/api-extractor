/**
 * @description markdown type
 * @author 阿怪
 * @date 2022/4/8 2:52 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { BaseDocumentOption } from "./common";


/**
 * @description markdown option
 */
export declare type MarkdownOption = {
  /**
   * @description output file path
   */
  output?: string;
} & BaseDocumentOption;
