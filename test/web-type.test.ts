/**
 * @description web-type test
 * @author 阿怪
 * @date 2022/4/5 1:04 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { test, expect } from "vitest";
import { apiExtractor } from "../src";
import { webTypesTagCreator } from "../src/documenter/web-types";

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
  ],
  "events": [],
  "slots": []
};
const apiInfo = {
  "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
  "framework": "vue",
  "name": "wash-painting-ui",
  "version": "0.1.11-beta.10",
  "contributions": {
    "html": {
      "types-syntax": "typescript",
      "description-markup": "markdown",
      "tags": [tag]
    }
  }
}


test('output web-type tags expect', async () => {
  const apiInfo = await apiExtractor({
    include: ['lib']
  });
  expect(webTypesTagCreator(apiInfo[0])).toMatchObject(tag);
})
