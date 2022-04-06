/**
 * @description jh-api cli
 * @author 阿怪
 * @date 2022/4/6 11:38 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { loadConfigFromFile } from "../config/config";
import type { JanghoodConfig } from "../../types/config";

const { apiExtractor, webTypes } = require('../index.js');

const run = async () => {
  const loadResult = await loadConfigFromFile();
  let config: JanghoodConfig = {};
  if (loadResult) {
    config = {
      ...config,
      ...loadResult.config
    }
  }
  const api = await apiExtractor({
    include: config.apiExtractor?.include,
    exclude: config.apiExtractor?.exclude,
  });

  await webTypes(api, {
    webTypesInfo: config.apiExtractor?.document?.webTypesInfo,
    packageUrl: config.apiExtractor?.document?.packageUrl,
    sourceSymbolTranslator: config.apiExtractor?.document?.sourceSymbolTranslator
  });

}

run();
