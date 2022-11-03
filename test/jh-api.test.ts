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
  const apis = await extractor({
    include: ['example/**/*.d.ts'],
    exclude: ['**/document/**/**']
  });

  expect(apisFilter(apis)).toMatchInlineSnapshot(`
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
                  "default": "{key:string, value:number}",
                  "required": "true",
                  "type": "{key:string,value:number",
                },
                "name": "object",
              },
            ],
            "name": "defaultWithCurlyBraces",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/11/3 02:54",
          "description": "",
          "version": "v1.0.0",
        },
        "name": "example/pure/defaultWithCurlyBraces.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "defaultWithCurlyBraces.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "() =>
    void",
                  "required": "true",
                  "type": "()=>void",
                },
                "name": "func",
              },
            ],
            "name": "defaultWithGreaterThan",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/11/3 01:34",
          "description": "default with greater than",
          "version": "v1.0.0",
        },
        "name": "example/pure/defaultWithGreaterThan.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "defaultWithGreaterThan.d.ts",
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
                "name": "toMatch",
              },
            ],
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
                "name": "toMatch",
              },
            ],
            "intersections": [
              "FunctionValue",
            ],
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
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "[]",
                  "description": "表格数据",
                  "required": "true",
                  "type": "any[]",
                },
                "name": "data",
              },
              {
                "doc": {
                  "default": "[]",
                  "description": "表格列",
                  "required": "true",
                  "type": "MParamLabel[]",
                },
                "name": "columns",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "表格高度",
                  "required": "false",
                  "type": "string",
                },
                "name": "height",
              },
              {
                "doc": {
                  "default": "{current: undefined, total: 0, onChange: undefined, align: 'end'}",
                  "description": "分页相关内容",
                  "required": "false",
                  "type": "Pagination",
                },
                "name": "pagination",
              },
            ],
            "intersections": [
              "MTablePlusProps",
            ],
            "name": "MInputFormProps",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/10/21 02:35",
          "description": "Input Form component with shuimo-ui style.
    水墨组件的输入表单组件。",
          "docUrl": "https://shuimo.janghood.com/pro/form#input-form",
          "name": "m-input-form",
          "sourceSymbol": "MInputForm",
          "version": "v1.0.0",
        },
        "name": "example/template/table /InputForm.d.ts",
        "path": {
          "directory": "example/template/table ",
          "file": "InputForm.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "''",
                  "description": "参数label显示",
                  "required": "true",
                  "type": "string",
                },
                "name": "label",
              },
              {
                "doc": {
                  "default": "true",
                  "description": "是否显示，false的话将会直接不渲染",
                  "required": "false",
                  "type": "boolean",
                },
                "name": "visible",
              },
              {
                "doc": {
                  "default": "text",
                  "description": "默认插槽类型",
                  "required": "false",
                  "type": "'text'|'input'",
                },
                "name": "type",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "是否是插槽",
                  "required": "false",
                  "type": "boolean",
                },
                "name": "isSlot",
              },
              {
                "doc": {
                  "default": "(value: any, row: any) =>
    void",
                  "description": "自定义内容渲染,支持VNode",
                  "required": "false",
                  "type": "(value:any,row:any)=>void",
                },
                "name": "customRender",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "参数",
                  "required": "false",
                  "type": "Record<string,any>",
                },
                "name": "props",
              },
            ],
            "name": "BaseParamLabel",
          },
          {
            "children": [
              {
                "doc": {
                  "default": "''",
                  "description": "参数key",
                  "required": "true",
                  "type": "string",
                },
                "name": "param",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "参数label显示",
                  "required": "true",
                  "type": "string",
                },
                "name": "label",
              },
              {
                "doc": {
                  "default": "true",
                  "description": "是否显示，false的话将会直接不渲染",
                  "required": "false",
                  "type": "boolean",
                },
                "name": "visible",
              },
              {
                "doc": {
                  "default": "text",
                  "description": "默认插槽类型",
                  "required": "false",
                  "type": "'text'|'input'",
                },
                "name": "type",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "是否是插槽",
                  "required": "false",
                  "type": "boolean",
                },
                "name": "isSlot",
              },
              {
                "doc": {
                  "default": "(value: any, row: any) =>
    void",
                  "description": "自定义内容渲染,支持VNode",
                  "required": "false",
                  "type": "(value:any,row:any)=>void",
                },
                "name": "customRender",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "参数",
                  "required": "false",
                  "type": "Record<string,any>",
                },
                "name": "props",
              },
            ],
            "intersections": [],
            "name": "MParamLabel",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/10/21 02:29",
          "description": "通用的参数类型",
          "version": "v1.0.0",
        },
        "name": "example/template/table /MParamLabel.d.ts",
        "path": {
          "directory": "example/template/table ",
          "file": "MParamLabel.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "[]",
                  "description": "表格数据",
                  "required": "true",
                  "type": "any[]",
                },
                "name": "data",
              },
              {
                "doc": {
                  "default": "[]",
                  "description": "表格列",
                  "required": "true",
                  "type": "MParamLabel[]",
                },
                "name": "columns",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "表格高度",
                  "required": "false",
                  "type": "string",
                },
                "name": "height",
              },
              {
                "doc": {
                  "default": "{current: undefined, total: 0, onChange: undefined, align: 'end'}",
                  "description": "分页相关内容",
                  "required": "false",
                  "type": "Pagination",
                },
                "name": "pagination",
              },
            ],
            "name": "MTablePlusProps",
          },
          {
            "children": [
              {
                "doc": {
                  "default": "undefined",
                  "description": "当前页",
                  "required": "false",
                  "type": "number",
                },
                "name": "current",
              },
              {
                "doc": {
                  "default": "10",
                  "description": "页大小，组件暂不支持",
                  "required": "false",
                  "type": "number",
                },
                "name": "pageSize",
              },
              {
                "doc": {
                  "default": "0",
                  "description": "总共条数",
                  "required": "true",
                  "type": "number",
                },
                "name": "total",
              },
              {
                "doc": {
                  "default": "'end'",
                  "description": "分页位置 'center' | 'left' | 'end'",
                  "required": "false",
                  "type": "string",
                },
                "name": "align",
              },
              {
                "doc": {
                  "default": "(pn: number) =>
    void",
                  "description": "分页切换回调",
                  "required": "false",
                  "type": "(pn:number)=>void",
                },
                "name": "onChange",
              },
            ],
            "name": "Pagination",
          },
        ],
        "doc": {
          "author": "youus",
          "date": "2022/10/21 22:22",
          "description": "Form Plus component with shuimo-ui style.
    水墨组件的高级表格组件",
          "docUrl": "https://shuimo.janghood.com/pro/table#pro-table",
          "name": "m-table-plus",
          "sourceSymbol": "MTablePlus",
          "version": "v1.0.0",
        },
        "name": "example/template/table /TablePlus.d.ts",
        "path": {
          "directory": "example/template/table ",
          "file": "TablePlus.d.ts",
        },
      },
    ]
  `);

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
                "name": "toMatch",
              },
            ],
            "intersections": [
              "FunctionValue",
            ],
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
                "name": "toMatch",
              },
            ],
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
