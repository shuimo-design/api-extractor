/**
 * @description message消息组件类型
 * @author 阿怪
 * @date 2021/6/22 2:33 下午
 * @version v2.0.1
 *
 * @name m-message
 * @docDescription Message component with shuimo-ui style.
 *              水墨组件的消息组件。
 * @docUrl https://shuimo.janghood.com/message
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v2.0.0 重构message qunbotop
 * v2.0.1 优化类型结构 阿怪
 */

export type MessageProps = {
  /**
   * @description string
   */
  type:string,
  /**
   * @description The direction in which the component appears
   * @default top-right
   */
  direction?: MessageDirectionType,
};

export type MessageDirectionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
