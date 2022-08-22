/**
 * @description
 * @author 阿怪
 * @date 2022/8/22 11:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type FunctionValue = {
  /**
   * @description input placeholder. 提示语
   * @type string
   * @default '请选择...'
   */
  placeholder?: string,
  /**
   * @description modelValue match function
   *              用于比较参数和modelValue是否相等的方法，常用于modelValue为对象的场景
   *              option: 列表数据
   *              value: modelValue
   * @type function
   * @default undefined
   */
  toMatch?: (option: any, value: any) => Boolean
}
