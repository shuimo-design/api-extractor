/**
 * @description web-types document creator
 * @author 阿怪
 * @date 2022/4/7 1:50 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { WebTypesTag, JanghoodConfig } from '@janghood/config';
import { JanghoodDefineConfig, validateDocumentConfig } from '@janghood/config';
import type { JhAPIs } from '../../../types/janghood-api-extractor';
import { loadPackage } from '../../common/loadPackage';
import { jError } from '../../common/console';
import { webTypesTagCreator, WebTypesTagCreatorRunner } from './webTypesTagCreator';
import { createFile } from '../../common/createFile';

export const webTypesCreator = () => {

  let apis: JhAPIs;
  let tagCreator: {
    run: WebTypesTagCreatorRunner
  };

  const init = (apiList: JhAPIs) => {
    apis = apiList.filter(api => api.doc && api.children && api.children.length > 0);
    apis.forEach(api => {
      if (api.children && api.children.length > 0) {
        api.children = api.children.filter(item => item.name !== '');
      }
    });
  };

  const createBaseInfo = async (config: JanghoodConfig) => {
    // get package.json info
    const option = config.apiExtractor!.document!.webTypes;
    const packageJson = await loadPackage(option?.packageUrl);
    tagCreator = webTypesTagCreator(option);
    if (!packageJson) {
      jError('can not get package.json info');
    }

    return {
      '$schema': 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
      name: packageJson.name,
      version: packageJson.version,
      'js-types-syntax': 'typescript',
      'description-markup': 'markdown',
      contributions: {
        html: {
          'vue-components': [] as WebTypesTag[]
        }
      },
      ...option?.webTypesInfo
    };
  };


  const run = async (config: JanghoodConfig) => {
    if (!validateDocumentConfig(config as JanghoodDefineConfig, 'webTypes')) {
      return;
    }
    const webTypesInfo = await createBaseInfo(config);
    if (!apis || !tagCreator) {
      jError('please init first');
      return;
    }
    webTypesInfo.contributions.html['vue-components'] = apis.map(api => tagCreator.run(api))
      .filter(e => e)
      .sort((a, b) => {
        if (!a || !b || !a.name || !b.name) {
          return 0;
        }
        return a.name.localeCompare(b.name);
      }) as WebTypesTag[];
    return webTypesInfo;
  };

  return {
    init,
    run
  };
};

export default async function (apis: JhAPIs, option?: JanghoodConfig) {
  const w = webTypesCreator();
  w.init(apis);
  const info = await w.run(option || {});
  if (info) {
    createFile('web-types.json', JSON.stringify(info, null, 2));
  }
}
