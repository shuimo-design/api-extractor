/**
 * @description parse comment
 * @author 阿怪
 * @date 2022/4/3 9:41 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DocBlock, DocComment, DocNode, DocParagraph, DocSection } from "@microsoft/tsdoc";
import { parseBlock } from "./parseBlock";
import { Doc } from "../../../types/module/common";
import { jWarn } from "../../common/console";

export declare type DocAPIType = {
  key: string,
  value: string
}

export const parseComment = (comment: DocComment) => {
  const commentApiList: DocAPIType[] = [];
  for (const child of comment.getChildNodes()) {
    const infos = parseCommentChild(child);
    if (infos.length > 0) {
      commentApiList.push(...infos);
    }
  }
  return keyValueListToObj(commentApiList);
}

const parseCommentChild = (node: DocNode): DocAPIType[] => {
  if (node instanceof DocBlock || node instanceof DocParagraph) {
    return parseBlock(node);
  }
  if (node instanceof DocSection) {
    return [];
  }
  jWarn(`${node.kind} is not supported`);
  return [];
}

const keyValueListToObj = (commentApiList: DocAPIType[]) => {
  const obj: Doc = {};
  commentApiList.forEach(item => {
    obj[item.key] = item.value;
  });
  return obj;
}


