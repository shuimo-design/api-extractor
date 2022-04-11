/**
 * @description config test
 * @author 阿怪
 * @date 2022/4/6 4:32 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { test, expect, describe } from 'vitest';
import { loadConfigFromFile, validateDocumentConfig } from "../../src/config/config";
import { defineJhConfig } from "../../src";

describe('test load config', () => {
  test('load right config by config object', async () => {
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
  });

  test('load right config by func', async () => {
    expect(defineJhConfig({
      apiExtractor: {
        document: {
          markdown: {
            active: false,
          }
        },
        include: ['example'],
      },
    })).toMatchInlineSnapshot(`
      {
        "apiExtractor": {
          "document": {
            "markdown": {
              "active": false,
            },
          },
          "include": [
            "example",
          ],
        },
      }
    `);
  })
});


describe('config validate test', () => {

  test('can not found janghood config will throw error', () => {
    expect(() => validateDocumentConfig({}, 'markdown'))
      .toThrowError('please check param is right.');
  });

  test('if document active is false', () => {
    expect(validateDocumentConfig({
      apiExtractor: {
        document: {
          markdown: {
            active: false
          }
        }
      }
    }, 'markdown')).toBe(false);
  });

  test('if document active is true', () => {
    expect(validateDocumentConfig({
      apiExtractor: {
        document: {
          markdown: {
            active: true
          }
        }
      }
    }, 'markdown')).toBe(true);
  });
})
