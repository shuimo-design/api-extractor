/**
 * @description tokenExtractor test
 * @author 阿怪
 * @date 2022/4/19 00:14
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect, beforeAll } from 'vitest';
import { tokenExtractor } from "../../../src/extractor/tools/tokenExtractor";
import { fileScanner, SourceFileInfo } from "../../../src/extractor/tools/fileScanner";

const fileSourceList: SourceFileInfo[] = [];
beforeAll(async () => {
  fileSourceList.push(...await fileScanner({
    include: ['example/merge/**.d.ts']
  }));
})

test('if props have merge type', async () => {
  const { extract } = await tokenExtractor();
  const res = await extract(fileSourceList[0]);
  expect(res).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "default": "false",
                "description": "按钮是否有边框",
                "required": "false",
                "type": "boolean",
              },
              "name": "border",
            },
            {
              "doc": {
                "default": "false",
                "description": "disable or not 是否禁用",
                "required": "true",
                "type": "boolean|string",
              },
              "name": "disabled",
            },
            {
              "doc": {
                "default": "[]",
                "description": "button type 按钮的类型",
                "required": "true",
                "type": "Array<any>",
              },
              "name": "type",
            },
            {
              "doc": {
                "default": "false",
                "description": "按钮类型",
                "required": "true",
                "type": "boolean",
              },
              "name": "K in ButtonType",
            },
          ],
          "intersections": [],
          "name": "ButtonProps",
        },
        {
          "children": [
            {
              "doc": {
                "default": "false",
                "description": "按钮类型",
                "required": "true",
                "type": "boolean",
              },
              "name": "K in ButtonType",
            },
          ],
          "name": "ButtonTypeProps",
        },
      ],
      "doc": {
        "author": "阿怪",
        "date": "2022/4/19 00:08",
        "description": "merge props",
        "version": "v1.0.0",
      },
      "name": "example/merge/merge.d.ts",
    }
  `);
})

test('support customer annotate', async ()=>{
  const unknownAnnotateFile = await fileScanner({
    include: ['example/base/unknownAnnotate/input.d.ts']
  });
  const { extract } = await tokenExtractor();
  const res = await extract(unknownAnnotateFile[0]);
  expect(res).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "string|number",
              },
              "name": "value",
            },
          ],
          "name": "InputProps",
        },
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "(e:HTMLElementEvent<HTMLInputElement>)=>voidonFocus?:(e:FocusEvent)=>voidonBlur?:(e:FocusEvent)=>void",
              },
              "name": "onInput",
            },
          ],
          "name": "InputEvents",
        },
      ],
      "doc": {
        "author": "阿怪",
        "date": "2022/4/6 10:50 PM",
        "description": "input api type",
        "docDescription": "Input component with shuimo-ui style.
    水墨组件的输入组件。",
        "docUrl": "https://shuimo.janghood.com/input",
        "name": "m-input",
        "version": "v1.0.0",
      },
      "name": "example/base/unknownAnnotate/input.d.ts",
    }
  `);
})
