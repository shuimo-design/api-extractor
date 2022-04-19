/**
 * @description intersectionProcess test
 * @author 阿怪
 * @date 2022/4/19 22:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect, beforeAll } from 'vitest';
import { JhAPIs } from "../../../types/janghood-api-extractor";
import { run } from "../tokenCreateTool";
import { translator } from "../../../src/translator";
import { Tokens } from "../../../src/extractor/tools/tokenExtractor";
import { intersectionsProcess } from "../../../src/translator/process/intersectionsProcess";


const jhApis: JhAPIs = [];

beforeAll(async () => {
  const res = await run('example/merge');
  const result = translator(res as Tokens, 'merge');
  if (result && result.children) {
    jhApis.push(...result.children);
  }
})

test('expect intersectionProcess success', () => {
  expect(intersectionsProcess(jhApis)).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "doc": {
              "required": "false",
              "type": "boolean",
            },
            "name": "border",
          },
          {
            "doc": {
              "required": "true",
              "type": "boolean|string",
            },
            "name": "disabled",
          },
          {
            "doc": {
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
              "required": "true",
              "type": "boolean",
            },
            "name": "K in ButtonType",
          },
        ],
        "name": "ButtonTypeProps",
      },
    ]
  `);
});
