/**
 * @description createFile test
 * @author 阿怪
 * @date 2022/4/6 9:32 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, vi } from 'vitest';
import { createFile } from "../../src/common/createFile";

vi.mock('fs', () => {
  return {
    default: {
      writeFile: vi.fn((fileName: string, source: string, option: string) => {
        console.log(fileName, source, option);
      })
    },
  }
});

test('create file', () => {
  createFile('dist/base/button/index.d.ts', 'source');
});

vi.unmock('fs');
