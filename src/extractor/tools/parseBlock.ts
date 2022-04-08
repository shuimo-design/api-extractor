/**
 * @description parse Block
 * @author 阿怪
 * @date 2022/4/3 2:24 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocNode, DocExcerpt, DocBlock, DocBlockTag, DocSection, DocPlainText, DocParagraph } from "@microsoft/tsdoc";
import { DocAPIType } from "./parseComment";
import { isSoftBreak } from "./uitls";
import { jError } from "../../common/console";

export const parseBlock = (block: DocBlock | DocParagraph): DocAPIType[] => {

  const blockInfo = block.getChildNodes();
  if (canNotParseBlockChild(blockInfo)) {
    return [];
  }

  const key = (blockInfo[0] as DocBlockTag).tagName.replace(/^@/, "");
  const value = parseBlockChild(blockInfo[1]);
  return [{ key, value }];
}


const parseBlockChild = (section: DocNode) => {
  if (canNotParseBlockSection(section)) {
    return '';
  }
  let info = [];
  let softBreakCount = 0;
  // maybe have more than one paragraph
  for (const paragraph of section.getChildNodes()) {
    const plainTexts = paragraph.getChildNodes();
    for (const plainText of plainTexts) {
      if (isSoftBreak(plainText)) {
        softBreakCount++;
        if (softBreakCount === 2) {
          return info.join('\n');
        }
        continue;
      }
      if (canNotParsePlainText(plainText)) {
        return info.join('\n');
      }
      softBreakCount = 0
      const plainTextDocExcerpt = plainText.getChildNodes()[0] as DocExcerpt;
      info.push(plainTextDocExcerpt.content.toString().trim());
    }
  }
  return info.join('\n');
}


const canNotParseBlockChild = (blockInfo: readonly DocNode[]) => {
  if (blockInfo.length !== 2 ||
    !(blockInfo[0] instanceof DocBlockTag) ||
    !(blockInfo[1] instanceof DocSection)) {
    jError('can not parse this block, please open an issue on github.');
    return true;
  }
  return false;
}

const canNotParseBlockSection = (section: DocNode) => {
  if (!(section instanceof DocSection)) {
    jError('can not parse this block\'s section, please open an issue on github.');
    return true;
  }
  return false;
}

const canNotParsePlainText = (plainText: DocNode) => {
  if (!(plainText instanceof DocPlainText) ||
    plainText.getChildNodes().length !== 1 ||
    !(plainText.getChildNodes()[0] instanceof DocExcerpt)) {
    jError('can not parse this plain text, please open an issue on github.');
    return true;
  }
  return false;
}
