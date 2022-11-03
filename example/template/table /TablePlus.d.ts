/**
 * @description pro table api type
 * @author youus
 * @date 2022/10/21 22:22
 * @version v1.0.0
 *
 * @name m-table-plus
 * @description Form Plus component with shuimo-ui style.
 *              水墨组件的高级表格组件
 * @docUrl https://shuimo.janghood.com/pro/table#pro-table
 * @sourceSymbol MTablePlus
 *
 * Hello, humor
 */

import { MParamLabel } from "./MParamLabel";

export declare type MTablePlusProps = {
  /**
   * @description 表格数据
   * @type any
   * @default []
   */
  data: any[]
  /**
   * @description 表格列
   *
   * @type MParamLabel[]
   * @default []
   */
  columns: MParamLabel[]
  /**
   * @description 表格高度
   * @type string
   * @default ''
   */
  height?: string
  /**
   * @description 分页相关内容
   * @type Pagination
   * @default { current: undefined, total: 0, onChange: undefined, align: 'end' }
   */
  pagination?: Pagination
}

export declare type Pagination = {
  /**
   * @description 当前页
   * @type number
   * @default undefined
   */
  current?: number
  /**
   * @description 页大小，组件暂不支持
   * @type number
   * @default 10
   */
  pageSize?: number
  /**
   * @description 总共条数
   * @type number
   * @default 0
   */
  total: number
  /**
   * @description 分页位置 'center' | 'left' | 'end'
   * @type string
   * @default 'end'
   */
  align?: string
  /**
   * @description 分页切换回调
   * @type function
   * @default (pn: number) => void
   */
  onChange?: (pn: number) => void
}
