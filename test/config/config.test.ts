/**
 * @description
 * @author 阿怪
 * @date 2022/4/6 4:32 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { test, expect } from 'vitest';
import { loadConfigFromFile } from "../../src/config/config";

test('load right config', async () => {
  expect(await loadConfigFromFile()).toMatchInlineSnapshot(`
    {
      "config": {
        "apiExtractor": {
          "document": {
            "sourceSymbolTranslator": [Function],
            "webTypesInfo": {
              "framework": "vue",
            },
          },
          "include": [
            "example",
          ],
        },
      },
      "dependencies": [
        "janghood.config.ts",
      ],
      "path": "/Users/higuaifan/Desktop/极客江湖/api-extractor/janghood.config.ts",
    }
  `)
})
