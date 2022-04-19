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
   * @type string
   * @default ''
   */
  text: string,
  /**
   * @description disable or not 是否禁用
   * @type boolean
   * @default false
   */
  disabled: boolean,
  /**
   * @description button type 按钮类型
   * @type string
   * @default primary
   * @enum primary|gray
   */
  type: string
}

export declare type ButtonEvents = {
  /**
   * @description 点击事件
   * @type Function
   */
  click: () => void
}
