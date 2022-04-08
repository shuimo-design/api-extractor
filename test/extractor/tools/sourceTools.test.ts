/**
 * @description source file list getter test
 * @author 阿怪
 * @date 2022/4/5 6:29 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { test, expect, describe } from "vitest";
import { getSourceFilenameList, getSourceFilenameLists } from "../../../src/extractor/tools/sourceTools";

describe('getSourceFileList return right filenames', () => {
  test('with example dir', async () => {
    expect(await getSourceFilenameList('example'))
      .toMatchInlineSnapshot(`
        [
          "example/base/button/index.d.ts",
          "example/template/menu/form.d.ts",
          "example/template/menu/formItem.d.ts",
        ]
      `);
  });
  test('with example dir exclude menu', async () => {
    expect(await getSourceFilenameList('example', ['menu']))
      .toMatchInlineSnapshot(`
        [
          "example/base/button/index.d.ts",
        ]
      `);
  });

  // not support file yet
  test.skip('with file', async () => {
    expect(await getSourceFilenameList('example/index.d.ts'))
      .toMatchInlineSnapshot('[]');
  });
});

describe('getSourceFileLists return right filenames', () => {
  test('with base dir and menu dir', async () => {
    expect(await getSourceFilenameLists(['example/base', 'example/template/menu']))
      .toMatchInlineSnapshot(`
        [
          "example/base/button/index.d.ts",
          "example/template/menu/form.d.ts",
          "example/template/menu/formItem.d.ts",
        ]
      `);
  });

  test('with base dir and menu dir exclude menu', async () => {
    expect(await getSourceFilenameLists(['example/base', 'example/template/menu'], ['menu']))
      .toMatchInlineSnapshot(`
        [
          "example/base/button/index.d.ts",
        ]
      `);
  });
});


