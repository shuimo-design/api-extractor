/**
 * @description
 * @author 阿怪
 * @date 2022/4/6 3:37 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { OptionType } from "./types";

export interface JanghoodConfig {
  apiExtractor?: OptionType
}

// not support env yet ,also it's not necessary.
export type JanghoodConfigFn = () => JanghoodConfig | Promise<JanghoodConfig>;
export type JanghoodConfigExport = JanghoodConfig | Promise<JanghoodConfig> | JanghoodConfigFn;
