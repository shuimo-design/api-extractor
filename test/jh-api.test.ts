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
    include:['../wash-painting-ui/lib'],
    exclude:['document']
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
                  "default": "''",
                  "description": "button inline text, will replace by slot
    按钮文本 会被slot覆盖",
                  "type": "string | VNode[]",
                },
                "name": "text",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "disable or not 是否禁用",
                  "type": "boolean",
                },
                "name": "disabled",
              },
              {
                "doc": {
                  "default": "primary",
                  "description": "button type 按钮类型",
                  "enum": "primary|gray",
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
                "children": [
                  {
                    "name": "ButtonProps",
                  },
                ],
                "name": "IComponentOption",
              },
            ],
            "name": "OptionType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/2 12:58 AM",
          "description": "button api type",
          "docDescription": "Button component with wash-painting-ui style.
    水墨组件的按钮组件。",
          "docUrl": "https://wash-painting.com/button",
          "name": "w-button",
          "version": "v1.0.0",
        },
        "name": "../wash-painting-ui/lib/base/button/index.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/base/button",
          "file": "index.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "row",
              },
              {
                "name": "column",
              },
              {
                "name": "type",
              },
              {
                "name": "inRange",
              },
              {
                "name": "start",
              },
              {
                "name": "end",
              },
              {
                "name": "text",
              },
              {
                "name": "selected",
              },
              {
                "name": "disabled",
              },
            ],
            "name": "CellType",
          },
        ],
        "doc": undefined,
        "name": "../wash-painting-ui/lib/base/datePicker/basic/table.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/base/datePicker/basic",
          "file": "table.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "default": "text",
                  "description": "input type. 输入框类型",
                  "enum": "text|textarea",
                  "type": "string",
                },
                "name": "type",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "input placeholder. 提示语",
                  "type": "string",
                },
                "name": "placeholder",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "input value. 输入框绑定值",
                  "type": "string|number",
                },
                "name": "modelValue",
              },
            ],
            "name": "InputProps",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "name": "InputProps",
                  },
                ],
                "name": "IComponentOption",
              },
            ],
            "name": "OptionType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/6 10:50 PM",
          "description": "input  api type",
          "docDescription": "Input component with wash-painting-ui style.
    水墨组件的输入组件。",
          "docUrl": "https://wash-painting.com/input",
          "name": "w-input",
          "version": "v1.0.0",
        },
        "name": "../wash-painting-ui/lib/base/input/index.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/base/input",
          "file": "index.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "modelValue",
              },
              {
                "children": [
                  {
                    "name": "Array",
                  },
                ],
                "name": "options",
              },
              {
                "name": "keyParam",
              },
              {
                "name": "titleParam",
              },
              {
                "name": "canChange",
              },
              {
                "name": "disabled",
              },
              {
                "name": "placeholder",
              },
            ],
            "name": "SelectProps",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "name": "SelectProps",
                  },
                ],
                "name": "IComponentOption",
              },
            ],
            "name": "OptionType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/7 12:34 AM",
          "description": "select api type",
          "docDescription": "Select component with wash-painting-ui style.
    水墨组件的下拉选择组件。",
          "docUrl": "https://wash-painting.com/select",
          "name": "w-select",
          "version": "v1.0.0",
        },
        "name": "../wash-painting-ui/lib/base/select/index.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/base/select",
          "file": "index.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "Props",
              },
            ],
            "name": "IComponentOption",
          },
        ],
        "doc": {
          "Version": "v1.0.0",
        },
        "name": "../wash-painting-ui/lib/dependents/_types/index.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/dependents/_types",
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
                  "type": "boolean",
                },
                "name": "inline",
              },
              {
                "doc": {
                  "default": "false",
                  "description": "form 是否默认发送",
                  "type": "boolean",
                },
                "name": "submit",
              },
            ],
            "name": "FormProps",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "name": "FormProps",
                  },
                ],
                "name": "IComponentOption",
              },
            ],
            "name": "OptionType",
          },
        ],
        "doc": {
          "Version": "v1.0.0",
          "docDescription": "Form component with wash-painting-ui style.
    水墨组件的表单组件。",
          "docUrl": "https://wash-painting.com/form",
          "name": "w-form",
        },
        "name": "../wash-painting-ui/lib/template/form/form.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/template/form",
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
                  "type": "string",
                },
                "name": "label",
              },
              {
                "doc": {
                  "description": "form item label prop
    表单内置label的原生prop属性",
                  "type": "string",
                },
                "name": "prop",
              },
            ],
            "name": "FormItemProps",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "name": "FormItemProps",
                  },
                ],
                "name": "IComponentOption",
              },
            ],
            "name": "OptionType",
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
        "name": "../wash-painting-ui/lib/template/form/formItem.d.ts",
        "path": {
          "directory": "../wash-painting-ui/lib/template/form",
          "file": "formItem.d.ts",
        },
      },
    ]
  `);

});
