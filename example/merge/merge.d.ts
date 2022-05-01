/**
 * @description merge props
 * @author 阿怪
 * @date 2022/4/19 00:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type ButtonProps = {
  /**
   * @description 按钮是否有边框
   * @type boolean
   * @default false
   */
  border?: boolean,
  /**
   * @description disable or not 是否禁用
   * @type boolean
   * @default false
   */
  disabled: boolean | string,
  /**
   * @description button type 按钮的类型
   * @default []
   */
  type: Array<any>,
} & ButtonTypeProps;

type ButtonTypeProps = {
  /**
   * @description 按钮类型
   * @type boolean
   * @default false
   */
  [K in ButtonType]?: boolean
}

export enum ButtonType {
  success = 'success',
  error = 'error',
}
