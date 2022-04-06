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
      "bin": {
        "jhAPI": "dist/bin/jhAPI.js",
      },
      "dependencies": {
        "@microsoft/tsdoc": "^0.13.2",
        "@microsoft/tsdoc-config": "^0.15.2",
        "tsutils": "^3.21.0",
        "typescript": "^4.6.3",
      },
      "description": "A simple api extractor for code doc.",
      "devDependencies": {
        "@rollup/plugin-json": "^4.1.0",
        "@rollup/plugin-typescript": "^8.3.1",
        "@types/node": "^12.20.24",
        "esbuild": "^0.14.32",
        "rollup": "^2.70.1",
        "ts-node": "^10.7.0",
        "tslib": "^2.3.1",
        "vitest": "^0.8.2",
      },
      "files": [
        "dist",
        "types",
        "tsdoc.json",
      ],
      "license": "ISC",
      "main": "dist/index.js",
      "name": "@janghood/api-extractor",
      "scripts": {
        "build": "npm run rm-dist && rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript && npm run build-bin",
        "build-bin": "rollup --config src/bin/rollup.config.ts --configPlugin @rollup/plugin-typescript",
        "jhAPI": "node dist/bin/jhAPI",
        "rm-dist": "rm -rf dist",
        "start": "ts-node src/run.ts",
        "test": "vitest",
        "test jhAPI": "npm run build && npm run jhAPI",
        "test-update": "vitest -u",
      },
      "types": "types/types.d.ts",
      "version": "1.0.0",
    }
  `);
})
