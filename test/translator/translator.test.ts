/**
 * @description translator test
 * @author 阿怪
 * @date 2022/4/19 00:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { expect, test } from 'vitest';
import { run } from './tokenCreateTool';
import { translator } from '../../src/translator';
import { Tokens } from '../../src/extractor/tools/tokenExtractor';

test('expect translator return right JhAPI', async () => {

  const res = await run('example/merge/**.d.ts');

  expect(translator(res as Tokens, 'merge')).toMatchInlineSnapshot(`
    {
      "children": [
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
                "type": "Array<any>",
              },
              "link": [
                {
                  "key": "Array",
                },
              ],
              "name": "type",
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
          "linker": [],
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
          "linker": [],
          "name": "ButtonTypeProps",
        },
      ],
      "doc": undefined,
      "name": "merge",
    }
  `);


});

test('expect type with value is return right', async () => {
  const res = await run('example/pure/withValue.d.ts');
  expect(translator(res as Tokens, 'withValue')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "true",
                "type": "string|VNode[]|WithValue[]",
              },
              "link": [
                {
                  "key": "VNode",
                },
                {
                  "key": "WithValue",
                },
              ],
              "name": "key",
            },
          ],
          "linker": [],
          "name": "WithValue",
        },
      ],
      "doc": undefined,
      "name": "withValue",
    }
  `);
});

test('expect function type param is return right', async () => {
  const res = await run('example/pure/functionValue.d.ts');
  expect(translator(res as Tokens, 'functionValue')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "false",
                "type": "string",
              },
              "name": "placeholder",
            },
            {
              "doc": {
                "required": "false",
                "type": "(option:any,value:any)=>Boolean",
              },
              "link": [
                {
                  "key": "option",
                },
                {
                  "key": "value",
                },
                {
                  "key": "Boolean",
                },
              ],
              "name": "toMatch",
            },
          ],
          "linker": [],
          "name": "FunctionValue",
        },
      ],
      "doc": undefined,
      "name": "functionValue",
    }
  `);
});

test('expect default with greater than is return right', async () => {
  const res = await run('example/pure/defaultWithGreaterThan.d.ts');
  expect(translator(res as Tokens, 'defaultWithGreaterThan')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "true",
                "type": "()=>void",
              },
              "name": "func",
            },
          ],
          "linker": [],
          "name": "defaultWithGreaterThan",
        },
      ],
      "doc": undefined,
      "name": "defaultWithGreaterThan",
    }
  `);
});

test('expect default with greater than is return right', async () => {
  const res = await run('example/pure/defaultWithCurlyBraces.d.ts');
  expect(translator(res as Tokens, 'defaultWithCurlyBraces')).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "doc": {
                "required": "true",
                "type": "{key:string,value:number",
              },
              "link": [
                {
                  "key": "key",
                },
                {
                  "key": "value",
                },
              ],
              "name": "object",
            },
          ],
          "linker": [],
          "name": "defaultWithCurlyBraces",
        },
      ],
      "doc": undefined,
      "name": "defaultWithCurlyBraces",
    }
  `);
});

test('unionType', async () => {
  const file = await run('example/pure/unionType.d.ts');
  const res = translator(file as Tokens, 'unionType');
  expect(res!.children![0].children![1].doc!.type).toBe('\'top-right\'|\'top-left\'|\'bottom-right\'|\'bottom-left\'|\'top-center\'');
});
