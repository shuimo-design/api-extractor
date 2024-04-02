/**
 * @description vscode vetur components data creator
 * @author youus
 * @date 2024/2/22 23:34
 * @version v1.0.0
 *
 * Hello, humor
 */

import type { JhAPIs } from '../../../types/janghood-api-extractor';
import {
  JanghoodConfig,
  JanghoodDefineConfig,
  validateDocumentConfig,
  VeturAttributes,
  VeturTags,
} from '@janghood/config';
import { jError } from '../../common/console';
import { veturDataCreator } from './veturDataCreator';
import { createFile } from '../../common/createFile';


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
    let localTags: VeturTags = {}
    let localAttributes: VeturAttributes = {}
    apis.forEach(api => {
      const apiTag = generateVeturTag(api);
      if (apiTag) {
        localTags = { ...localTags, ...apiTag }
      }
      const apiAttributes = generateVeturAttributes(api);
      if (apiAttributes) {
        localAttributes = { ...localAttributes, ...apiAttributes }
      }
    })
    const tags: VeturTags = {}
    const attributes: VeturAttributes = {}
    Object.keys(localTags).sort((a, b) => a.localeCompare(b)).forEach(key => {
      if (localTags[key].attributes) {
        localTags[key].attributes.sort((aAt, bAt) => aAt.localeCompare(bAt))
      }
      tags[key] = localTags[key]
    })
    Object.keys(localAttributes).sort((a, b) => a.localeCompare(b)).forEach(key => {
      attributes[key] = localAttributes[key]
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
