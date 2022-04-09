/**
 * @description base config type
 * @author 阿怪
 * @date 2022/4/6 3:37 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WebTypeOption } from "./web-type";
import { MarkdownOption } from "./markdown";

/**
 * @description api option
 */
export declare type APIOptionType = {
  /**
   * @description scan file include path, not support filename yet
   * @type string[]
   * @default []
   */
  include?: string[],
  /**
   * @description scan file exclude path
   * @type string[]
   * @default []
   */
  exclude?: string[],
  translator?: {
    token?: () => void,
  }
}

export type Documents = {
  webTypes?: WebTypeOption,
  markdown?: MarkdownOption
}

export interface JanghoodConfig {
  apiExtractor?: APIOptionType & {
    /**
     * @description document creator option
     */
    document?: Documents
  }
}

// not support env yet, also it's not necessary.
export type JanghoodConfigFn = () => JanghoodConfig | Promise<JanghoodConfig>;
export type JanghoodConfigExport = JanghoodConfig | Promise<JanghoodConfig> | JanghoodConfigFn;
