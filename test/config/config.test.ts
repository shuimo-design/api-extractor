/**
 * @description config test
 * @author 阿怪
 * @date 2022/4/6 4:32 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { test, expect } from 'vitest';
import { loadConfigFromFile } from "../../src/config/config";

test('load right config', async () => {
  const info = await loadConfigFromFile();
  expect(info?.config).toMatchInlineSnapshot(`
    {
      "apiExtractor": {
        "document": {
          "markdown": {
            "active": true,
            "output": "doc",
          },
          "webTypes": {
            "active": true,
            "sourceSymbolTranslator": [Function],
            "webTypesInfo": {
              "framework": "vue",
            },
          },
        },
        "include": [
          "example",
        ],
      },
    }
  `)
})
