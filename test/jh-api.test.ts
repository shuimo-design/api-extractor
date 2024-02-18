/**
 * @description
 * @author 阿怪
 * @date 2022/4/8 11:33 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { expect, test } from 'vitest';
import { extractor } from "../src/extractor";
import { JhAPIs } from "../types/janghood-api-extractor";


const apisFilter = (apis: JhAPIs) => {
  apis.forEach(api => {
    if (api.children && api.children.length > 0) {
      api.children = api.children.filter(item => item.name !== '')
    }
  })

  return apis;
}

test('jh-api', async () => {
  let apis = await extractor({
    include: ['example/**/*.d.ts'],
    exclude: ['**/document/**/**']
  });

  apis = apis.sort((a,b)=>a.name.localeCompare(b.name));

  expect(apisFilter(apis)).toMatchSnapshot();

});

test('expect link type is return right', async () => {
  const apis = await extractor({
    include:['example/pure/link/linkType.d.ts', 'example/pure/functionValue.d.ts']
  });
  expect(apisFilter(apis)).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "'请选择...'",
                  "description": "input placeholder. 提示语",
                  "required": "false",
                  "type": "string",
                },
                "name": "placeholder",
              },
              {
                "doc": {
                  "default": "undefined",
                  "description": "modelValue match function
    用于比较参数和modelValue是否相等的方法，常用于modelValue为对象的场景
    option: 列表数据
    value: modelValue",
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
            "intersections": [
              "FunctionValue",
            ],
            "linker": [],
            "name": "LinkType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/11/3 12:41",
          "description": "link type",
          "version": "v1.0.0",
        },
        "name": "example/pure/link/linkType.d.ts",
        "path": {
          "directory": "example/pure/link",
          "file": "linkType.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "'请选择...'",
                  "description": "input placeholder. 提示语",
                  "required": "false",
                  "type": "string",
                },
                "name": "placeholder",
              },
              {
                "doc": {
                  "default": "undefined",
                  "description": "modelValue match function
    用于比较参数和modelValue是否相等的方法，常用于modelValue为对象的场景
    option: 列表数据
    value: modelValue",
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
        "doc": {
          "author": "阿怪",
          "date": "2022/8/22 11:05",
          "description": "",
          "version": "v1.0.0",
        },
        "name": "example/pure/functionValue.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "functionValue.d.ts",
        },
      },
    ]
  `);
})
