/**
 * @description web-type test
 * @author 阿怪
 * @date 2022/4/5 1:04 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { test, expect, describe, beforeAll } from 'vitest';
import type { JanghoodConfig, WebTypeOption } from '@janghood/config';
import type { JhAPIs } from '../../types/janghood-api-extractor';
import { getJhApi } from '../../src';
import { webTypesCreator } from '../../src/document/web-types';


const tag = {
  'name': 'w-button',
  'source': {
    'symbol': 'WButton'
  },
  'description': 'Button component with wash-painting-ui style.\n水墨组件的按钮组件。',
  'doc-url': 'https://wash-painting.com/button',
  'props': [
    {
      'name': 'text',
      'description': 'button inline text, will replace by slot\n按钮文本 会被slot覆盖',
      'type': 'string',
      'default': ''
    },
    {
      'name': 'disabled',
      'description': 'disable or not 是否禁用',
      'type': 'boolean',
      'default': 'false'
    },
    {
      'name': 'type',
      'description': 'button type 按钮类型',
      'type': 'string',
      'default': 'primary'
    }
  ]
};
const apiInfo = {
  '$schema': 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
  'framework': 'vue',
  'name': '@janghood/api-extractor',
  'version': '0.0.1-alpha.0',
  'js-types-syntax': 'typescript',
  'description-markup': 'markdown',
  'contributions': {
    'html': {
      'vue-components': [tag]
    }
  }
};
const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `W${lastDir}`;
};
const webOptions: WebTypeOption = {
  active: true,
  sourceSymbolTranslator
};
let testApiInfo: JhAPIs = [];

describe('test web-type', () => {

  const janghoodConfig: JanghoodConfig = {
    apiExtractor: {
      include: ['example/base/**/**.d.ts'],
      document: {
        webTypes: webOptions
      }
    }
  };

  beforeAll(async () => {
    testApiInfo = await getJhApi(janghoodConfig);
    testApiInfo = testApiInfo.sort((a,b)=>a.name.localeCompare(b.name));
  });

  test('output expected web-type tag', async () => {
    const webTypeCreateHandler = webTypesCreator();
    console.log('testApiInfo', testApiInfo);
    webTypeCreateHandler.init([testApiInfo[0]]);
    const webTypesInfo = await webTypeCreateHandler.run(janghoodConfig);
    console.log('webTypesInfo', webTypesInfo);
    expect(webTypesInfo?.contributions.html['vue-components'][0]).toMatchObject(tag);
  });

  test('output expected web-type tags', async () => {
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init(testApiInfo);
    const webTypesInfo = await webTypeCreateHandler.run(janghoodConfig);
    // skip version check
    if (webTypesInfo && webTypesInfo?.version) {
      webTypesInfo.version = '0.0.1-alpha.0';
    }
    expect(webTypesInfo).toMatchInlineSnapshot(`
      {
        "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
        "contributions": {
          "html": {
            "vue-components": [
              {
                "description": "Input component with shuimo-ui style.
      水墨组件的输入组件。",
                "doc-url": "https://shuimo.janghood.com/input",
                "name": "m-input",
                "props": [
                  {
                    "default": undefined,
                    "name": "value",
                    "type": [
                      "string",
                      "number",
                    ],
                  },
                ],
                "source": {
                  "symbol": "WUnknownannotate",
                },
              },
              {
                "description": "Message component with shuimo-ui style.
      水墨组件的消息组件。",
                "doc-url": "https://shuimo.janghood.com/message",
                "name": "m-message",
                "props": [
                  {
                    "default": "'info'",
                    "description": "Type of message",
                    "name": "type",
                    "type": "'success'|'warning'|'info'|'error'",
                  },
                  {
                    "default": "3000",
                    "description": "The time of duration",
                    "name": "duration",
                    "type": "number",
                  },
                  {
                    "default": "这是一条消息",
                    "description": "The message content",
                    "name": "content",
                    "type": "string",
                  },
                  {
                    "default": "top-right",
                    "description": "The direction in which the component appears",
                    "name": "direction",
                    "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                  },
                  {
                    "default": "true",
                    "description": "Whether the component is allowed to be dragged",
                    "name": "dragAllow",
                    "type": "boolean",
                  },
                  {
                    "default": "{triggerBoundary:2}",
                    "description": "Whether the component is allowed to be dragged",
                    "name": "dragConfig",
                    "type": "DragConfigType",
                  },
                ],
                "source": {
                  "symbol": "WMessage",
                },
              },
              {
                "description": "Button component with wash-painting-ui style.
      水墨组件的按钮组件。",
                "doc-url": "https://wash-painting.com/button",
                "name": "w-button",
                "props": [
                  {
                    "default": "",
                    "description": "button inline text, will replace by slot
      按钮文本 会被slot覆盖",
                    "name": "text",
                    "type": "string",
                  },
                  {
                    "default": "false",
                    "description": "disable or not 是否禁用",
                    "name": "disabled",
                    "type": "boolean",
                  },
                  {
                    "default": "primary",
                    "description": "button type 按钮类型",
                    "name": "type",
                    "type": "string",
                  },
                ],
                "source": {
                  "symbol": "WButton",
                },
              },
            ],
          },
        },
        "description-markup": "markdown",
        "js-types-syntax": "typescript",
        "name": "@janghood/api-extractor",
        "version": "0.0.1-alpha.0",
      }
    `);
  });

  test('output expected web-type document with webTypesInfo', async () => {
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init([testApiInfo[0]]);

    const config = Object.create(janghoodConfig);
    config.apiExtractor.document.webTypes.webTypesInfo = {
      'framework': 'vue'
    };
    const webTypesInfo = await webTypeCreateHandler.run(config);
    // skip version check
    if (webTypesInfo?.version) {
      webTypesInfo.version = '0.0.1-alpha.0';
    }
    expect(webTypesInfo).toMatchObject(apiInfo);
  });

  test('remove customer annotate', async () => {
    const info = await getJhApi({
      apiExtractor: {
        include: ['example/base/unknownAnnotate/input.d.ts'],
        document: {
          webTypes: webOptions
        },
        annotate: {
          component: {
            type: 'block',
            onInit: (param) => {
              if (param.name === 'value') {
                param.name = 'modelValue';
              }
              return param;
            }
          }
        }
      }
    });
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init(info);
    const webTypesInfo = await webTypeCreateHandler.run(janghoodConfig);
    expect(webTypesInfo?.contributions.html['vue-components'][0].props![0]).toMatchObject({
      name: 'modelValue',
      type: ['string', 'number'],
      default: undefined
    });
  });
});

