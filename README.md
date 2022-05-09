# @janghood/doc-extractor

A simple api extractor for code. based on [tsdoc](https://tsdoc.org/).

[![codecov](https://codecov.io/gh/janghood/api-extractor/branch/master/graph/badge.svg?token=NU71GX2KFM)](https://codecov.io/gh/janghood/api-extractor)

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

according to inline tags definition, the following code is not valid:

```ts
/**
 * @type { file:string, directory:string }
 * @default {}
 * @default (id:number) => void
 */
```
