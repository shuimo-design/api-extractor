/**
 * @description parse file test
 * @author 阿怪
 * @date 2022/4/3 1:04 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect } from 'vitest';
import { parse } from "../src/parse";
import { fileScanner } from "../src/source/fileScanner";

test('parse .d.ts file to expect', () => {
  expect(parse(fileScanner())).toMatchInlineSnapshot(`
    [
      {
        "author": "阿怪",
        "date": "2022/4/2 11:26 AM",
        "description": "按钮组件API",
        "version": "v1.0.0",
      },
      {
        "default": "''",
        "description": "button inline text, will replace by slot
    按钮文本 会被slot覆盖",
        "type": "string ｜ VNode",
      },
      {
        "default": "false",
        "description": "disable or not 是否禁用",
        "type": "boolean",
      },
      {
        "default": "'primary'",
        "description": "button type 按钮类型",
        "enum": "primary|gray",
        "type": "string",
      },
    ]
  `);
})
