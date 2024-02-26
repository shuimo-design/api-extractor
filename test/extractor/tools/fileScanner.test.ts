/**
 * @description fileScanner test
 * @author 阿怪
 * @date 2022/4/7 4:07 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from "vitest";
import { fileScanner } from "../../../src/extractor/tools/fileScanner";
import { SyntaxKind } from "typescript";

describe('fileScanner expect return right file source', () => {
  test('scan example/base/button', async () => {
    const fileSourceList = await fileScanner({ include: ['example/base/button/**.d.ts'] });
    expect(fileSourceList.length).toBe(1);
    expect(fileSourceList[0].source.kind === SyntaxKind.SourceFile).toBe(true);
  });

  test('scan example and except merge document', async () => {
    const fileSourceList = await fileScanner({ include: ['example/**/*.d.ts'],exclude:['**/merge/**/*.d.ts'] });
    expect(fileSourceList.length).toBe(16);
  });
})
