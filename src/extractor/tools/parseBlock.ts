/**
 * @description parse Block
 * @author 阿怪
 * @date 2022/4/3 2:24 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import {
  DocBlock,
  DocBlockTag,
  DocErrorText,
  DocExcerpt,
  DocInlineTagBase,
  DocNode,
  DocParagraph,
  DocPlainText,
  DocSection, DocSoftBreak
} from '@microsoft/tsdoc';
import { DocAPIType } from './parseComment';
import { isSoftBreak } from './uitls';
import { jError, jWarn } from '../../common/console';
import { blockErrorHandler } from './blockErrorHandler';

export const parseBlock = (block: DocBlock | DocParagraph): DocAPIType[] => {

  const blockInfo = block.getChildNodes();
  if (firstTagMustBeDocBlockTag(blockInfo)) {
    return [];
  }
  const key = (blockInfo[0] as DocBlockTag).tagName.replace(/^@/, '');
  if (isEmptyAnnotate(blockInfo)) {
    return [{ key, value: '' }];
  }


  if (canNotParseBlockChild(blockInfo)) {
    return [];
  }


  // make validate better
  if (key === 'example') {
    jWarn('not support example right now');
    return [];
  }

  const value = parseBlockChild(blockInfo[1], key);
  return [{ key, value }];
};


const parseBlockChild = (section: DocNode, block?: string) => {
  if (canNotParseBlockSection(section)) {
    return '';
  }
  let info = [];
  let softBreakCount = 0;
  // maybe have more than one paragraph
  for (const paragraph of section.getChildNodes()) {
    let prevIsPrevCurlyBraces = false;
    const plainTexts = paragraph.getChildNodes();
    for (const plainText of plainTexts) {
      if (isSoftBreak(plainText)) {
        softBreakCount++;
        if (softBreakCount === 2) {
          return info.join('\n');
        }
        continue;
      }
      if (plainText instanceof DocInlineTagBase) {
        // support inline tag
        jWarn('not support inline tag right now');
        continue;
      }
      if (plainText instanceof DocErrorText) {
        const fixedErrorText = blockErrorHandler(plainText, block);
        // 如果是部分已知可修复的问题
        if (fixedErrorText) {
          if (fixedErrorText === '{') {
            prevIsPrevCurlyBraces = true;
          }

          info[info.length - 1] += fixedErrorText;
          continue;
        }
        jWarn(`in block ${block}:${plainText.errorMessage}`);
        continue;
      }


      if (canNotParsePlainText(plainText)) {
        return info.join('\n');
      }
      softBreakCount = 0;
      const plainTextDocExcerpt = plainText.getChildNodes()[0] as DocExcerpt;
      const str = plainTextDocExcerpt.content.toString().trim();
      if (prevIsPrevCurlyBraces) {
        info[info.length - 1] += str;
        prevIsPrevCurlyBraces = false;
      } else {
        info.push(str);
      }
    }
  }
  return info.join('\n');
};

const firstTagMustBeDocBlockTag = (blockInfo: readonly DocNode[]) => {
  if (!(blockInfo[0] instanceof DocBlockTag)) {
    jWarn('can not parse this block, please open an issue on github.');
    return true;
  }
  return false;
};

const canNotParseBlockChild = (blockInfo: readonly DocNode[]) => {
  if (blockInfo.length !== 2 ||
    !(blockInfo[1] instanceof DocSection)) {
    jWarn('can not parse this block, please open an issue on github.');
    return true;
  }
  return false;
};
const isEmptyAnnotate = (blockInfo: readonly DocNode[]) => {
  return blockInfo.length === 2 && blockInfo[1] instanceof DocSoftBreak;
};

const canNotParseBlockSection = (section: DocNode) => {
  if (!(section instanceof DocSection)) {
    jError('can not parse this block\'s section, please open an issue on github.');
    return true;
  }
  return false;
};

const canNotParsePlainText = (plainText: DocNode) => {
  if (!(plainText instanceof DocPlainText) ||
    plainText.getChildNodes().length !== 1 ||
    !(plainText.getChildNodes()[0] instanceof DocExcerpt)) {

    if (plainText instanceof DocErrorText) {
      jError(plainText.errorMessage);
      return true;
    }
    jError('can not parse this plain text, please open an issue on github.');
    return true;
  }
  return false;
};
