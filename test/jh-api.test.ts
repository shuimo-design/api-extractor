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
                "link": [
                  {
                    "key": "Array",
                  },
                ],
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
            "linker": [],
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
            "linker": [],
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
            "linker": [],
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
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "description": "type",
                  "required": "true",
                  "type": "string",
                },
                "name": "type",
              },
              {
                "doc": {
                  "description": "name",
                  "required": "true",
                  "type": "string",
                },
                "name": "name",
              },
            ],
            "linker": [],
            "name": "semicolonType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2023/6/15 15:30",
          "description": "",
          "version": "v1.0.0",
        },
        "name": "example/pure/semicolonType.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "semicolonType.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "description": "string",
                  "required": "true",
                  "type": "string",
                },
                "name": "type",
              },
              {
                "doc": {
                  "default": "top-right",
                  "description": "The direction in which the component appears",
                  "required": "false",
                  "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                },
                "link": [
                  {
                    "key": "MessageDirectionType",
                  },
                ],
                "name": "direction",
              },
            ],
            "linker": [],
            "name": "MessageProps",
          },
          {
            "linker": [
              {
                "doc": {
                  "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                },
                "name": "MessageDirectionType",
              },
            ],
            "name": "MessageDirectionType",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2021/6/22 2:33 下午",
          "description": "message消息组件类型",
          "docDescription": "Message component with shuimo-ui style.
    水墨组件的消息组件。",
          "docUrl": "https://shuimo.janghood.com/message",
          "name": "m-message",
          "version": "v2.0.1",
        },
        "name": "example/pure/unionType.d.ts",
        "path": {
          "directory": "example/pure",
          "file": "unionType.d.ts",
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
            "linker": [],
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
            "linker": [],
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
                  "default": "'info'",
                  "description": "Type of message",
                  "required": "false",
                  "type": "'success'|'warning'|'info'|'error'",
                },
                "link": [
                  {
                    "key": "MessageType",
                  },
                ],
                "name": "type",
              },
              {
                "doc": {
                  "default": "3000",
                  "description": "The time of duration",
                  "required": "false",
                  "type": "number",
                },
                "name": "duration",
              },
              {
                "doc": {
                  "default": "这是一条消息",
                  "description": "The message content",
                  "required": "true",
                  "type": "string",
                },
                "name": "content",
              },
              {
                "doc": {
                  "default": "top-right",
                  "description": "The direction in which the component appears",
                  "required": "false",
                  "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                },
                "link": [
                  {
                    "key": "MessageDirectionType",
                  },
                ],
                "name": "direction",
              },
              {
                "doc": {
                  "default": "true",
                  "description": "Whether the component is allowed to be dragged",
                  "required": "false",
                  "type": "boolean",
                },
                "name": "dragAllow",
              },
              {
                "doc": {
                  "default": "{triggerBoundary:2}",
                  "description": "Whether the component is allowed to be dragged",
                  "required": "false",
                  "type": "DragConfigType",
                },
                "link": [
                  {
                    "key": "DragConfigType",
                  },
                ],
                "name": "dragConfig",
              },
            ],
            "linker": [],
            "name": "MessageProps",
          },
          {
            "children": [
              {
                "doc": {
                  "default": "top-right",
                  "description": "The direction in which the component appears",
                  "required": "false",
                  "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                },
                "link": [
                  {
                    "key": "MessageDirectionType",
                  },
                ],
                "name": "direction",
              },
            ],
            "linker": [],
            "name": "MessageListProps",
          },
          {
            "linker": [
              {
                "doc": {
                  "type": "'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'",
                },
                "name": "MessageDirectionType",
              },
            ],
            "name": "MessageDirectionType",
          },
          {
            "linker": [
              {
                "doc": {
                  "type": "'success'|'warning'|'info'|'error'",
                },
                "name": "MessageType",
              },
            ],
            "name": "MessageType",
          },
          {
            "children": [
              {
                "doc": {
                  "required": "true",
                  "type": "'success'|'warning'|'info'|'error'",
                },
                "link": [
                  {
                    "key": "IMessageEnum",
                  },
                  {
                    "key": "T",
                  },
                  {
                    "key": "K",
                  },
                  {
                    "key": "MessageType",
                  },
                  {
                    "key": "options",
                  },
                  {
                    "key": "MessageConfig",
                  },
                  {
                    "key": "duration",
                  },
                  {
                    "key": "Promise",
                  },
                  {
                    "key": "T",
                  },
                ],
                "name": "MessageProps",
              },
            ],
            "intersections": [],
            "linker": [],
            "name": "MessageConfig",
          },
          {
            "children": [
              {
                "doc": {
                  "required": "true",
                  "type": "MessageConfig):Promise<T>|void",
                },
                "link": [
                  {
                    "key": "MessageConfig",
                  },
                  {
                    "key": "Promise",
                  },
                  {
                    "key": "T",
                  },
                ],
                "name": "config",
              },
            ],
            "intersections": [
              "IMessageEnum",
            ],
            "linker": [],
            "name": "IMessage<T>",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2021/6/22 2:33 下午",
          "description": "message消息组件类型",
          "docDescription": "Message component with shuimo-ui style.
    水墨组件的消息组件。",
          "docUrl": "https://shuimo.janghood.com/message",
          "name": "m-message",
          "version": "v2.0.1",
        },
        "name": "example/base/message/message.d.ts",
        "path": {
          "directory": "example/base/message",
          "file": "message.d.ts",
        },
      },
      {
        "children": [
          {
            "children": [
              {
                "doc": {
                  "required": "false",
                  "type": "string|number",
                },
                "name": "value",
              },
            ],
            "linker": [],
            "name": "InputProps",
          },
          {
            "children": [
              {
                "doc": {
                  "required": "false",
                  "type": "(e:HTMLElementEvent<HTMLInputElement>)=>voidonFocus?:(e:FocusEvent)=>voidonBlur?:(e:FocusEvent)=>void",
                },
                "link": [
                  {
                    "key": "e",
                  },
                  {
                    "key": "HTMLElementEvent",
                  },
                  {
                    "key": "HTMLInputElement",
                  },
                  {
                    "key": "onFocus",
                  },
                  {
                    "key": "e",
                  },
                  {
                    "key": "FocusEvent",
                  },
                  {
                    "key": "onBlur",
                  },
                  {
                    "key": "e",
                  },
                  {
                    "key": "FocusEvent",
                  },
                ],
                "name": "onInput",
              },
            ],
            "linker": [],
            "name": "InputEvents",
          },
        ],
        "doc": {
          "author": "阿怪",
          "date": "2022/4/6 10:50 PM",
          "description": "input api type",
          "docDescription": "Input component with shuimo-ui style.
    水墨组件的输入组件。",
          "docUrl": "https://shuimo.janghood.com/input",
          "name": "m-input",
          "version": "v1.0.0",
        },
        "name": "example/base/unknownAnnotate/input.d.ts",
        "path": {
          "directory": "example/base/unknownAnnotate",
          "file": "input.d.ts",
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
            "linker": [],
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
            "linker": [],
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
                "link": [
                  {
                    "key": "MParamLabel",
                  },
                ],
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
                "link": [
                  {
                    "key": "Pagination",
                  },
                ],
                "name": "pagination",
              },
            ],
            "intersections": [
              "MTablePlusProps",
            ],
            "linker": [],
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
                "link": [
                  {
                    "key": "value",
                  },
                  {
                    "key": "row",
                  },
                ],
                "name": "customRender",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "参数",
                  "required": "false",
                  "type": "Record<string,any>",
                },
                "link": [
                  {
                    "key": "Record",
                  },
                ],
                "name": "props",
              },
            ],
            "linker": [],
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
                "link": [
                  {
                    "key": "value",
                  },
                  {
                    "key": "row",
                  },
                ],
                "name": "customRender",
              },
              {
                "doc": {
                  "default": "''",
                  "description": "参数",
                  "required": "false",
                  "type": "Record<string,any>",
                },
                "link": [
                  {
                    "key": "Record",
                  },
                ],
                "name": "props",
              },
            ],
            "intersections": [],
            "linker": [],
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
                "link": [
                  {
                    "key": "MParamLabel",
                  },
                ],
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
                "link": [
                  {
                    "key": "Pagination",
                  },
                ],
                "name": "pagination",
              },
            ],
            "linker": [],
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
                "link": [
                  {
                    "key": "pn",
                  },
                ],
                "name": "onChange",
              },
            ],
            "linker": [],
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
