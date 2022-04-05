/**
 * @description source file list getter test
 * @author 阿怪
 * @date 2022/4/5 6:29 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { test, expect, describe } from "vitest";
import { getSourceFileList } from "../src/file/getSourceFileList";

describe('get right file list', () => {
  test('with doc', async () => {
    expect(await getSourceFileList('../wash-painting-ui/lib'))
      .toMatchInlineSnapshot(`
      [
        "../wash-painting-ui/lib/base/button/index.d.ts",
        "../wash-painting-ui/lib/base/datePicker/basic/table.d.ts",
      ]
    `);
  })

  // not support file yet
  test.skip('with file', async () => {
    expect(await getSourceFileList('lib/index.d.ts'))
      .toMatchInlineSnapshot('[]');
  })
})


