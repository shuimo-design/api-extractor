/**
 * @description markdown document creator
 * @author 阿怪
 * @date 2022/4/8 2:47 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { JanghoodConfig, JhAPIs } from "../../../types/janghood-api-extractor";
import { mdTableCreator } from "./mdTableCreator";
import path from "path";
import { jError } from "../../common/console";
import { createFile } from "../../common/createFile";
import { validateDocumentConfig } from "../../config/config";

const replaceDictionary = (dict: string, output: string, replaceStr: string) => {
  return `${output}${path.sep}${dict.replace(replaceStr, '')}`;
}

export const markdownCreator = () => {

  let apis: JhAPIs;

  const init = (apiList: JhAPIs) => {
    apis = apiList;
  }

  const run = (config: JanghoodConfig) => {
    if (!validateDocumentConfig(config, 'markdown')) {
      return []
    }
    return apis.map(api => {
      if (!api.path?.directory) {
        jError('no path directory');
        return;
      }
      if (!config.apiExtractor) {
        jError('no apiExtractor');
        return;
      }
      const { document } = config.apiExtractor;
      if (!document || !document.markdown || !document.markdown.output) {
        jError('no markdown option');
        return;
      }
      const path = {
        file: api.path.file,
        directory: replaceDictionary(api.path.directory, document.markdown.output, document.markdown.replace!)
      }

      return {
        doc: api.doc,
        path,
        name: api.name,
        tables: mdTableCreator(api)
      }
    });
  }

  return {
    init,
    run
  }
}

export default async function (apis: JhAPIs, option: JanghoodConfig) {
  const m = markdownCreator();
  m.init(apis);
  const results = m.run(option);
  results.forEach(result => {
    if (result) {
      const source = result.tables.map(t => t && t.table).join('\n\n');
      if (!source) {
        return;
      }

      createFile(
        `${result.path.directory}/${result.path.file.replace('.d.ts', '.md')}`,
        source);
    }
  })
}
