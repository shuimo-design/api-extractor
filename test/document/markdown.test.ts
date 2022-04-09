/**
 * @description markdown test
 * @author 阿怪
 * @date 2022/4/8 3:03 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect, beforeAll } from 'vitest';
import { markdownCreator } from "../../src/document/markdown";
import { getJhApi } from "../../src";
import { JhAPIs } from "../../types/janghood-api-extractor";

let testApiInfo: JhAPIs = [];
beforeAll(async () => {
  testApiInfo = await getJhApi({
    apiExtractor: {
      include: ['example'],
      document: {
        markdown: { active: true }
      }
    }
  });
});


test('test return right markdown info', () => {
  const markdownHandler = markdownCreator();
  markdownHandler.init(testApiInfo);
  const markdownInfo = markdownHandler.run();

  expect(markdownInfo).toMatchInlineSnapshot(`
    [
      [
        {
          "name": "ButtonProps",
          "table": "|title|type|default|required|description|
    |---|---|---|---|---|
    |text|string or VNode|''|false|button inline text, will replace by slot
    按钮文本 会被slot覆盖|
    |disabled|boolean|false|false|disable or not 是否禁用|
    |type|string|primary|false|button type 按钮类型|",
        },
        {
          "name": "ButtonEvents",
          "table": "|title|type|default|required|description|
    |---|---|---|---|---|
    |click|Function||false|点击事件|",
        },
      ],
      [
        {
          "name": "FormProps",
          "table": "|title|type|default|required|description|
    |---|---|---|---|---|
    |inline|boolean|false|false|form是否行内显示|
    |submit|boolean|false|false|form 是否默认发送|",
        },
      ],
      [
        {
          "name": "FormItemProps",
          "table": "|title|type|default|required|description|
    |---|---|---|---|---|
    |label|string||false|form item label
    表单项的标题|
    |prop|string||false|form item label prop
    表单内置label的原生prop属性|",
        },
      ],
    ]
  `);
})
