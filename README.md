# @janghood/api-extractor

A simple api extractor for code. based on [tsdoc](https://tsdoc.org/).

[![codecov](https://codecov.io/gh/janghood/api-extractor/branch/master/graph/badge.svg?token=NU71GX2KFM)](https://codecov.io/gh/janghood/api-extractor)

## config

```typescript
// janghood.config.ts
const firstUpperCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1, str.length)}`;

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `M${lastDir}`;
}

export default defineJhConfig({
  apiExtractor: {
    include: ["example/**/*.d.ts"],
    document: {
      webTypes: {
        active: true,
        webTypesInfo: {
          "framework": "vue",
        },
        sourceSymbolTranslator
      },
      markdown: {
        output: 'doc',
        active: true
      }
    }
  }
});

```

## demo

```typescript
// index.d.ts
/**
 * @description 按钮组件API
 * @author 阿怪
 * @date 2022/4/2 11:26 AM
 * @version v1.0.0
 *
 * @name w-button
 * @docDescription Button component with wash-painting-ui style.
 *              水墨组件的按钮组件。
 * @docUrl https://wash-painting.com/button
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
export declare type ButtonProps = {
  /**
   * @description button inline text, will replace by slot
   *              按钮文本 会被slot覆盖
   * @default ''
   */
  text: string,
  /**
   * @description disable or not 是否禁用
   * @default false
   */
  disabled: boolean,
  /**
   * @description button type 按钮类型
   * @default primary
   * @enum primary|gray
   */
  type: string
}

```

## warn

After version `0.0.1-alpha.8` we support some new feature like these following code:

```ts
/**
 * @type { file:string, directory:string }
 * @default {}
 * @default (id:number) => void
 */
```

but you should be carefully when you use them,
because according to tsdoc inline tags definition, these are illegal.

## TODO

- [ ] support tool functions

```typescript
const firstUpperCase = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
}

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `M${lastDir}`;
}
```

- [ ] webTypes add default icon

