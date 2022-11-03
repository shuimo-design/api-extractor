/**
 * @description 通用的参数类型
 * @author 阿怪
 * @date 2022/10/21 02:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

declare type BaseParamLabel = {
  /**
   * @description 参数label显示
   * @type string
   * @default ''
   */
  label: string,
  /**
   * @description 是否显示，false的话将会直接不渲染
   * @type boolean
   * @default true
   */
  visible?: boolean,
  /**
   * @description 默认插槽类型
   * @type 'text' | 'input'
   * @default text
   */
  type?: 'text' | 'input',
  /**
   * @description 是否是插槽
   * @type boolean
   * @default false
   */
  isSlot?: boolean,
  /**
   * @description 自定义内容渲染,支持VNode
   * @type function
   * @default (value: any, row: any) => void
   */
  customRender?: (value: any, row: any) => void,
  /**
   * @description 参数
   * @type string
   * @default ''
   */
  props?: Record<string, any>
}

export declare type MParamLabel = {
  /**
   * @description 参数key
   * @type string
   * @default ''
   */
  param: string,
} & BaseParamLabel

