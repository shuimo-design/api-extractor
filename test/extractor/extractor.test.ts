/**
 * @description  extractor test
 * @author 阿怪
 * @date 2022/4/7 5:06 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect } from 'vitest';
import { extractor } from "../../src/extractor";

test('just run extractor test', async () => {
  const res = await extractor({
    include: ["example"],
    exclude: ['template']
  });
  expect(res).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "''",
                  "description": "button inline text, will replace by slot
    按钮文本 会被slot覆盖",
                  "type": "string | VNode",
                },
                "name": "text",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "disable or not 是否禁用",
                  "type": "boolean",
                },
                "name": "disabled",
              },
              {
                "doc": {
                  "default": "primary",
                  "description": "button type 按钮类型",
                  "enum": "primary|gray",
                  "type": "string",
                },
                "name": "type",
              },
            ],
            "name": "ButtonProps",
          },
          {
            "children": [
              {
                "doc": {
                  "description": "点击事件",
                  "type": "Function",
                },
                "name": "click",
              },
            ],
            "name": "ButtonEvents",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/2 11:26 AM",
          "description": "按钮组件API",
          "docDescription": "Button component with wash-painting-ui style.
    水墨组件的按钮组件。",
          "docUrl": "https://wash-painting.com/button",
          "name": "w-button",
          "version": "v1.0.0",
        },
        "name": "example/base/button/index.d.ts",
        "path": {
          "directory": "example/base/button",
          "file": "index.d.ts",
        },
      },
    ]
  `);
});
