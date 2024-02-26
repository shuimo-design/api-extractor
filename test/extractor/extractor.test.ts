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
    include: ["example/**/*.d.ts"],
    exclude: ['**/template/**/*.d.ts', '**/merge/**/*.d.ts', '**/pure/**/*.d.ts'],
  });
  expect(res[0]).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "default": "''",
                "description": "button inline text, will replace by slot
    按钮文本 会被slot覆盖",
                "required": "false",
                "type": "string",
              },
              "name": "text",
            },
            {
              "doc": {
                "default": "false",
                "description": "link or not 是否是链接",
                "required": "false",
                "type": "boolean",
              },
              "name": "link",
            },
            {
              "doc": {
                "default": "false",
                "description": "disable or not 是否禁用",
                "required": "false",
                "type": "boolean",
              },
              "name": "disabled",
            },
            {
              "doc": {
                "default": "default",
                "description": "button type 按钮类型",
                "enum": "default|primary|error|confirm|warning",
                "required": "false",
                "type": "'default'|'primary'|'error'|'confirm'|'warning'",
              },
              "name": "type",
            },
          ],
          "linker": [],
          "name": "ButtonProps",
        },
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "(e:MouseEvent)=>void",
              },
              "link": [
                {
                  "key": "e",
                },
                {
                  "key": "MouseEvent",
                },
              ],
              "name": "onClick",
            },
          ],
          "linker": [],
          "name": "ButtonEvents",
        },
      ],
      "doc": {
        "author": "阿怪",
        "date": "2022/4/2 12:58 AM",
        "description": "button api type",
        "docDescription": "Button component with shuimo-ui style.
    水墨组件的按钮组件。",
        "docUrl": "https://shuimo.design/button",
        "name": "m-button",
        "version": "v1.0.0",
      },
      "name": "example/base/button/index.d.ts",
      "path": {
        "directory": "example/base/button",
        "file": "index.d.ts",
      },
    }
  `);
});
