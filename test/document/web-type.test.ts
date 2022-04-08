/**
 * @description web-type test
 * @author 阿怪
 * @date 2022/4/5 1:04 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { test, expect, describe, beforeAll, vi } from "vitest";
import { JhAPIs, WebTypeOption } from "../../types/janghood-api-extractor";
import { getJhApi } from "../../src";
import webTypes, { webTypesCreator } from "../../src/document/web-types";


const tag = {
  "name": "w-button",
  "source": {
    "symbol": "WButton"
  },
  "description": "Button component with wash-painting-ui style.\n水墨组件的按钮组件。",
  "doc-url": "https://wash-painting.com/button",
  "attributes": [
    {
      "name": "text",
      "description": "button inline text, will replace by slot\n按钮文本 会被slot覆盖",
      "value": {
        "type": "string | VNode",
        "kind": "expression",
        "default": ""
      }
    },
    {
      "name": "disabled",
      "description": "disable or not 是否禁用",
      "value": {
        "type": "boolean",
        "kind": "expression",
        "default": "false"
      }
    },
    {
      "name": "type",
      "description": "button type 按钮类型",
      "value": {
        "type": "string",
        "kind": "expression",
        "default": "primary"
      }
    }
  ]
};
const apiInfo = {
  "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
  "framework": "vue",
  "name": "@janghood/api-extractor",
  "version": "0.0.1-alpha.0",
  "contributions": {
    "html": {
      "types-syntax": "typescript",
      "description-markup": "markdown",
      "tags": [tag]
    }
  }
}
const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `W${lastDir}`;
}
const webOptions: WebTypeOption = {
  active: true,
  sourceSymbolTranslator
};
let testApiInfo: JhAPIs = [];

beforeAll(async () => {
  testApiInfo = await getJhApi({
    apiExtractor: {
      include: ['example'],
      document: {
        webTypes: webOptions
      }
    }
  });
});

describe('test web-type', () => {
  test('output expected web-type tag', async () => {
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init([testApiInfo[0]]);
    const webTypesInfo = await webTypeCreateHandler.run(webOptions);
    expect(webTypesInfo?.contributions.html.tags[0]).toMatchObject(tag);
  });

  test('output expected web-type tags', async () => {
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init(testApiInfo);
    const webTypesInfo = await webTypeCreateHandler.run(webOptions);
    expect(webTypesInfo).toMatchInlineSnapshot(`
      {
        "\$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
        "contributions": {
          "html": {
            "description-markup": "markdown",
            "tags": [
              {
                "attributes": [
                  {
                    "description": "button inline text, will replace by slot
      按钮文本 会被slot覆盖",
                    "name": "text",
                    "value": {
                      "default": "",
                      "kind": "expression",
                      "type": "string | VNode",
                    },
                  },
                  {
                    "description": "disable or not 是否禁用",
                    "name": "disabled",
                    "value": {
                      "default": "false",
                      "kind": "expression",
                      "type": "boolean",
                    },
                  },
                  {
                    "description": "button type 按钮类型",
                    "name": "type",
                    "value": {
                      "default": "primary",
                      "kind": "expression",
                      "type": "string",
                    },
                  },
                ],
                "description": "Button component with wash-painting-ui style.
      水墨组件的按钮组件。",
                "doc-url": "https://wash-painting.com/button",
                "name": "w-button",
                "source": {
                  "symbol": "WButton",
                },
              },
              {
                "attributes": [
                  {
                    "description": "form是否行内显示",
                    "name": "inline",
                    "value": {
                      "default": "false",
                      "kind": "expression",
                      "type": "boolean",
                    },
                  },
                  {
                    "description": "form 是否默认发送",
                    "name": "submit",
                    "value": {
                      "default": "false",
                      "kind": "expression",
                      "type": "boolean",
                    },
                  },
                ],
                "description": "Form component with wash-painting-ui style.
      水墨组件的表单组件。",
                "doc-url": "https://wash-painting.com/form",
                "name": "w-form",
                "source": {
                  "symbol": "WMenu",
                },
              },
              {
                "attributes": [
                  {
                    "description": "form item label
      表单项的标题",
                    "name": "label",
                    "value": {
                      "default": undefined,
                      "kind": "expression",
                      "type": "string",
                    },
                  },
                  {
                    "description": "form item label prop
      表单内置label的原生prop属性",
                    "name": "prop",
                    "value": {
                      "default": undefined,
                      "kind": "expression",
                      "type": "string",
                    },
                  },
                ],
                "description": "FormItem component with wash-painting-ui style.
      水墨组件的表单item组件。",
                "doc-url": "https://wash-painting.com/form#item",
                "name": "w-form-item",
                "source": {
                  "symbol": "WFormItem",
                },
              },
            ],
            "types-syntax": "typescript",
          },
        },
        "name": "@janghood/api-extractor",
        "version": "0.0.1-alpha.0",
      }
    `);
  });

  test('output expected web-type document with webTypesInfo', async () => {
    const webTypeCreateHandler = webTypesCreator();
    webTypeCreateHandler.init([testApiInfo[0]]);
    const webTypesInfo = await webTypeCreateHandler.run({
      ...webOptions,
      webTypesInfo: {
        "framework": "vue",
      }
    });
    expect(webTypesInfo).toMatchObject(apiInfo);
  })
})

