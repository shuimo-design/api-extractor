/**
 * @description a tool to create tokens
 * @author 阿怪
 * @date 2022/4/19 00:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Token, tokenExtractor } from "../../src/extractor/tools/tokenExtractor";
import { fileScanner, SourceFileInfo } from "../../src/extractor/tools/fileScanner";
import type { Node } from "typescript";

export const run = async (dir: string) => {
  const fileSourceList: SourceFileInfo[] = await fileScanner({
    include: [dir],
  })
  const { getTokensByFile } = await tokenExtractor();
  const dirtyTokens = await getTokensByFile(fileSourceList[0]);
  return dirtyTokens.filter(t => t.kind !== 4 && t.kind !== 5).map(t => slimToken(t));
}


const slimToken = (token: Token) => {
  return {
    kind:token.kind,
    key:token.key,
    parent: slimParent(token.parent)
  }
}

const slimParent = (parent: Node): any => {
  return {
    pos: parent.pos,
    end: parent.end,
    parent: parent.parent ? slimParent(parent.parent) : undefined
  }
}

