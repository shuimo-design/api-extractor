/**
 * @description markdown test
 * @author 阿怪
 * @date 2022/4/8 3:03 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect, beforeAll, describe } from 'vitest';
import { markdownCreator } from "../../src/document/markdown";
import { getJhApi } from "../../src";
import { JhAPIs } from "../../types/janghood-api-extractor";
import { mdTableCreator } from "../../src/document/markdown/mdTableCreator";

let testApiInfo: JhAPIs = [];
const option = {
  apiExtractor: {
    include: ['example'],
    document: {
      markdown: {
        output: 'doc',
        active: true
      }
    }
  }
}
beforeAll(async () => {
  testApiInfo = await getJhApi(option);
});

describe('mdTableCreator return right', () => {
  test('return right table list', () => {
    const api = testApiInfo[0];
    expect(mdTableCreator(api)).toMatchInlineSnapshot(`
      [
        {
          "name": "ButtonProps",
          "table": "|title|type|default|required|description|
      |---|---|---|---|---|
      |text|string | VNode|''|-|button inline text, will replace by slot<br/>按钮文本 会被slot覆盖|
      |disabled|boolean|false|-|disable or not 是否禁用|
      |type|string|primary|-|button type 按钮类型|",
        },
      ]
    `);
  })

})

test('test return right markdown info', () => {
  const markdownHandler = markdownCreator();
  markdownHandler.init([testApiInfo[0]]);
  const markdownInfo = markdownHandler.run(option);
  expect(markdownInfo).toMatchInlineSnapshot(`
    [
      {
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
          "directory": "doc//base/button",
          "file": "index.d.ts",
        },
        "tables": [
          {
            "name": "ButtonProps",
            "table": "|title|type|default|required|description|
    |---|---|---|---|---|
    |text|string | VNode|''|-|button inline text, will replace by slot<br/>按钮文本 会被slot覆盖|
    |disabled|boolean|false|-|disable or not 是否禁用|
    |type|string|primary|-|button type 按钮类型|",
          },
        ],
      },
    ]
  `);
})
