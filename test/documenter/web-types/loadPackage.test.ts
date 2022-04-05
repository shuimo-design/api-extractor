/**
 * @description load package test
 * @author 阿怪
 * @date 2022/4/5 11:43 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, expect } from 'vitest';
import { loadPackage } from "../../../src/documenter/web-types/loadPackage";

test('load package return expected info',async () => {
  expect(await loadPackage()).toMatchInlineSnapshot(`
    {
      "author": "",
      "dependencies": {
        "@microsoft/tsdoc": "^0.13.2",
        "@microsoft/tsdoc-config": "^0.15.2",
        "tsutils": "^3.21.0",
        "typescript": "^4.6.3",
      },
      "description": "A simple api extractor for code doc.",
      "devDependencies": {
        "@rollup/plugin-typescript": "^8.3.1",
        "@types/node": "^12.20.24",
        "rollup": "^2.70.1",
        "ts-node": "^10.7.0",
        "tslib": "^2.3.1",
        "vitest": "^0.8.2",
      },
      "license": "ISC",
      "main": "dist/index.js",
      "name": "@janghood/api-extractor",
      "scripts": {
        "start": "ts-node src/run.ts",
        "test": "vitest",
        "test-update": "vitest -u",
      },
      "version": "1.0.0",
    }
  `);
})
