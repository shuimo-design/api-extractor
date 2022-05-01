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


test('jh-api', async () => {
  const apis = await extractor({
    include:['example/**/*.d.ts'],
    exclude:['**/document/**/**']
  });
  apis.forEach(api=>{
    if(api.children&&api.children.length>0){
      api.children = api.children.filter(item=>item.name!=='')
    }
  })
  expect(apis).toMatchInlineSnapshot(`
    [
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
        "path": {
          "directory": "example/merge",
          "file": "merge.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "required": "true",
                  "type": "string|VNode[]|WithValue[]",
                },
                "name": "key",
              },
            ],
            "name": "WithValue",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/25 00:37",
          "description": "params with value",
          "version": "v1.0.0",
        },
        "name": "example/pure/withValue.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "withValue.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "''",
                  "description": "button inline text, will replace by slot
    按钮文本 会被slot覆盖",
                  "required": "true",
                  "type": "string",
                },
                "name": "text",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "disable or not 是否禁用",
                  "required": "true",
                  "type": "boolean",
                },
                "name": "disabled",
              },
              {
                "doc": {
                  "default": "primary",
                  "description": "button type 按钮类型",
                  "enum": "primary|gray",
                  "required": "true",
                  "type": "string",
                },
                "name": "type",
              },
            ],
            "name": "ButtonProps",
          },
          {
            "children": [
              {
                "doc": {
                  "description": "点击事件",
                  "required": "true",
                  "type": "()=>void",
                },
                "name": "click",
              },
            ],
            "name": "ButtonEvents",
          },
        ],
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
          "directory": "example/base/button",
          "file": "index.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "false",
                  "description": "form是否行内显示",
                  "required": "true",
                  "type": "boolean",
                },
                "name": "inline",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "form 是否默认发送",
                  "required": "true",
                  "type": "boolean",
                },
                "name": "submit",
              },
            ],
            "name": "FormProps",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/5 9:42 AM",
          "description": "form api type",
          "docDescription": "Form component with wash-painting-ui style.
    水墨组件的表单组件。",
          "docUrl": "https://wash-painting.com/form",
          "name": "w-form",
          "version": "v1.0.0",
        },
        "name": "example/template/menu/form.d.ts",
        "path": {
          "directory": "example/template/menu",
          "file": "form.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "description": "form item label
    表单项的标题",
                  "required": "true",
                  "type": "string",
                },
                "name": "label",
              },
              {
                "doc": {
                  "description": "form item label prop
    表单内置label的原生prop属性",
                  "required": "true",
                  "type": "string",
                },
                "name": "prop",
              },
            ],
            "name": "FormItemProps",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/5 9:43 AM",
          "description": "form item api type",
          "docDescription": "FormItem component with wash-painting-ui style.
    水墨组件的表单item组件。",
          "docUrl": "https://wash-painting.com/form#item",
          "name": "w-form-item",
          "sourceSymbol": "WFormItem",
          "version": "v1.0.0",
        },
        "name": "example/template/menu/formItem.d.ts",
        "path": {
          "directory": "example/template/menu",
          "file": "formItem.d.ts",
        },
      },
    ]
  `);

});
