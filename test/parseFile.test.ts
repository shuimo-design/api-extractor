/**
 * @description parse file test
 * @author 阿怪
 * @date 2022/4/3 1:04 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect } from 'vitest';
import FileScanner from "../src/file/FileScanner";
import FileParser from "../src/parse/file/FileParser";

test('parse .d.ts file to expect', async () => {

  const fp = new FileParser();
  await fp.init();

  const sourceList = await new FileScanner({ include: ["example"], }).run();
  expect(await fp.run(sourceList[0]))
    .toMatchInlineSnapshot(`
      {
        "fileDoc": {
          "author": "阿怪",
          "date": "2022/4/2 11:26 AM",
          "description": "按钮组件API",
          "docDescription": "Button component with wash-painting-ui style.
      水墨组件的按钮组件。",
          "docUrl": "https://wash-painting.com/button",
          "name": "w-button",
          "version": "v1.0.0",
        },
        "identifierAPIs": [
          {
            "children": [
              {
                "doc": {
                  "default": "''",
                  "description": "button inline text, will replace by slot
      按钮文本 会被slot覆盖",
                  "type": "string | VNode",
                },
                "identifier": "text",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "disable or not 是否禁用",
                  "type": "boolean",
                },
                "identifier": "disabled",
              },
              {
                "doc": {
                  "default": "primary",
                  "description": "button type 按钮类型",
                  "enum": "primary|gray",
                  "type": "string",
                },
                "identifier": "type",
              },
            ],
            "identifier": "ButtonProps",
          },
          {
            "children": [
              {
                "doc": {
                  "description": "点击事件",
                  "type": "Function",
                },
                "identifier": "click",
              },
            ],
            "identifier": "ButtonEvents",
          },
        ],
      }
    `);
  expect(await fp.run(sourceList[1]))
    .toMatchInlineSnapshot(`
      {
        "fileDoc": {
          "Version": "v1.0.0",
          "docDescription": "Form component with wash-painting-ui style.
      水墨组件的表单组件。",
          "docUrl": "https://wash-painting.com/form",
          "name": "w-form",
        },
        "identifierAPIs": [
          {
            "children": [
              {
                "doc": {
                  "default": "false",
                  "description": "form是否行内显示",
                  "type": "boolean",
                },
                "identifier": "inline",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "form 是否默认发送",
                  "type": "boolean",
                },
                "identifier": "submit",
              },
            ],
            "identifier": "FormProps",
          },
        ],
      }
    `);
});
