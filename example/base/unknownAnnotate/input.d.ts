/**
 * @description input api type
 * @author 阿怪
 * @date 2022/4/6 10:50 PM
 * @version v1.0.0
 *
 * @name m-input
 * @docDescription Input component with shuimo-ui style.
 *              水墨组件的输入组件。
 * @docUrl https://shuimo.janghood.com/input
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
//@ts-ignore
import { HTMLElementEvent } from '@shuimo-design/types';

export declare type InputProps = {
  /**
   * @component
   */
  value?: string | number
}

export declare type InputEvents = {
  onInput?: (e: HTMLElementEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
}
