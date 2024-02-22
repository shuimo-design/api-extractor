/**
 * @description vscode vetur components data creator
 * @author youus
 * @date 2024/2/22 23:34
 * @version v1.0.0
 *
 * Hello, humor
 */

import type { JhAPIs } from '../../../types/janghood-api-extractor';
import { JanghoodConfig, JanghoodDefineConfig, validateDocumentConfig } from '@janghood/config';
import { jError } from '../../common/console';
import { veturDataCreator } from './veturDataCreator';
import { createFile } from '../../common/createFile';

interface VeturTags {
  [key: string]: {
    attributes: string[]
    description: string
  }
}

interface VeturAttributes {
  [key: string]: {
    default: string
    description: string
    type: string
  }
}

export const veturCreator = () => {
  let apis: JhAPIs;

  const init = (apiList: JhAPIs) => {
    apis = apiList.filter(api => api.doc && api.children && api.children.length > 0);
    apis.forEach(api => {
      if (api.children && api.children.length > 0) {
        api.children = api.children.filter(item => item.name !== '');
      }
    });
  };

  const run = async (config: JanghoodConfig) => {
    if (!validateDocumentConfig(config as JanghoodDefineConfig, 'vscode')) {
      return;
    }
    if (!apis) {
      jError('please init first');
      return;
    }
    const { generateVeturTag, generateVeturAttributes } = veturDataCreator();
    let tags: VeturTags = {}
    let attributes: VeturAttributes = {}
    apis.forEach(api => {
      const apiTag = generateVeturTag(api);
      if (apiTag) {
        tags = { ...tags, ...apiTag }
      }
      const apiAttributes = generateVeturAttributes(api);
      if (apiAttributes) {
        attributes = { ...attributes, ...apiAttributes }
      }
    })
    return {
      tags,
      attributes
    }
  }

  return {
    init,
    run
  }
}

export default async function (apis: JhAPIs, option?: JanghoodConfig) {
  const creator = veturCreator();
  creator.init(apis);
  const veturData = await creator.run(option || {});
  if (veturData) {
    createFile('tags.json', JSON.stringify(veturData.tags, null, 2));
    createFile('attributes.json', JSON.stringify(veturData.attributes, null, 2));
  }
}
