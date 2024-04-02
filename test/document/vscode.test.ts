import { beforeAll, describe, expect, test } from 'vitest';
import type { JanghoodConfig } from '@janghood/config';
import { getJhApi } from '../../src';
import type { JhAPIs } from '../../types/janghood-api-extractor';
import { veturCreator } from '../../src/document/vscode';

const tags = {
  'm-button': {
    'attributes': ['disabled', 'link', 'text', 'type'],
    'description': 'Button component with shuimo-ui style.\n水墨组件的按钮组件。\n[docs](https://shuimo.design/button)',
  },
};

const attributes = {
  'm-button/text': {
    'default': '', 'description': 'button inline text, will replace by slot\n按钮文本 会被slot覆盖', 'type': 'string',
  }, 'm-button/link': {
    'default': 'false', 'description': 'link or not 是否是链接', 'type': 'boolean',
  }, 'm-button/disabled': {
    'default': 'false', 'description': 'disable or not 是否禁用', 'type': 'boolean',
  }, 'm-button/type': {
    'default': 'default',
    'description': 'button type 按钮类型',
    'options': ['\'default\'', '\'primary\'', '\'error\'', '\'confirm\'', '\'warning\''],
    'type': 'string',
  },
};

let testApiInfo: JhAPIs = [];

describe('test vscode tags and attributes', () => {
  const janghoodConfig = {
    apiExtractor: {
      include: ['example/base/**/**.d.ts'], document: {
        vscode: {
          active: true,
        },
      },
    },
  };

  beforeAll(async () => {
    testApiInfo = await getJhApi(janghoodConfig);
    testApiInfo = testApiInfo.sort((a, b) => a.name.localeCompare(b.name));
  });

  test('output expected vscode tag', async () => {
    const veturCreateHandler = veturCreator();
    veturCreateHandler.init([testApiInfo[0]]);
    const veturData = await veturCreateHandler.run(janghoodConfig as JanghoodConfig);
    expect(veturData?.tags).toMatchObject(tags);
    expect(veturData?.attributes).toMatchObject(attributes);
  });
});
