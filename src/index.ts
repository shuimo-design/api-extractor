/**
 * @description index
 * @author 阿怪
 * @date 2022/4/2 11:46 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { JhAPIs, JanghoodConfig } from "../types/janghood-api-extractor";
import { jError } from "./common/console";
import { extractor } from "./extractor";
import jhConfig from "./config/defineJhConfig";

export const getJhApi = async (config: JanghoodConfig): Promise<JhAPIs> => {
  if (!config.apiExtractor) {
    jError('can not find apiExtractor config');
    return [];
  }
  const { apiExtractor } = config;
  if (!apiExtractor.document) {
    jError('can not find document config');
    return [];
  }

  return await extractor(apiExtractor);
}

export const defineJhConfig = jhConfig;
