/**
 * @description
 * @author 阿怪
 * @date 2022/11/3 01:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocErrorText } from "@microsoft/tsdoc";


export const blockErrorHandler = (plainTex: DocErrorText, block?: string) => {

  if (block === 'default') {

    // 在 @default中写'>'
    if (plainTex.messageId === 'tsdoc-escape-greater-than') {
      return '>';
    }

    // 在 @default中写'{'
    if (plainTex.messageId === 'tsdoc-malformed-inline-tag' && plainTex.errorMessage === 'Expecting a TSDoc tag starting with "{@"') {
      return '{';
    }

    // 在 @default中写'}'
    if (plainTex.messageId === 'tsdoc-escape-right-brace' && plainTex.errorMessage === 'The "}" character should be escaped using a backslash to avoid confusion with a TSDoc inline tag') {
      return '}';
    }

  }

}
