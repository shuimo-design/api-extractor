/**
 * @description web-types tags creator
 * @author 阿怪
 * @date 2022/4/5 1:12 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { Doc, IdentifierAPI, WebTypeOption, TransformedAPI } from "../../../types/types";
import path from "path";

export type WebTypesAttributes = {
  name: string,
  description?: string,
  'doc-url'?: string,
  value?: Doc
}

export type WebTypesTag = {
  name: string,
  source?: { symbol: string } | { file: string, offset: number },
  description?: string,
  'doc-url'?: string,
  attributes?: WebTypesAttributes[],
  events?: [],
  slots?: []
}

export const webTypesTagCreator = (option?: WebTypeOption) => {
  const run = (api: TransformedAPI): WebTypesTag | undefined => {
    // 这里输出的是单个tag的文档

    const { fileDoc, identifierAPIs } = api;
    if (!fileDoc) {
      return;
    }

    const attributes: WebTypesAttributes[] = [];
    const events: [] = [];
    const slots: [] = [];
    if (identifierAPIs.length === 0) {
      console.warn('no doc error!');
    }

    // maybe someday we need merge doc ,so use for()
    for (const identifierAPI of identifierAPIs) {
      if (identifierAPI.children) {

        if (identifierAPI.identifier.includes('Prop')) {
          for (const child of identifierAPI.children) {
            attributes.push(childToAttribute(child));
          }
        }

      }
    }
    const tag: WebTypesTag = {
      name: fileDoc.name,
      source: { symbol: fileDoc.sourceSymbol ?? getDir(api.file) },
      description: fileDoc.docDescription,
      'doc-url': fileDoc.docUrl,
      attributes
    }

    // delete fileDoc.sourceSymbol;

    if (events.length) {
      tag.events = events;
    }
    if (slots.length) {
      tag.slots = slots;
    }
    return tag;
  }

  const childToAttribute = (identifierAPI: IdentifierAPI): WebTypesAttributes => {
    const { doc, identifier } = identifierAPI;
    const attribute: WebTypesAttributes = {
      name: identifier
    };
    const value: Doc = {};
    if (doc) {
      value.type = doc.type;
      value.default = clearDefault(doc.default);
      value.kind = 'expression';
      if (doc.docUrl) {
        attribute['doc-url'] = doc.docUrl;
      }
      if (doc.description) {
        attribute.description = doc.description;
      }
    }
    attribute.value = value;

    return attribute;
  }

  const clearDefault = (str: string) => {
    //  if is empty string "''"
    if (str === '\'\'') {
      return '';
    }
    return str;
  }

  const getDir = (file: string) => {
    const dirList = path.dirname(file).split(path.sep);
    let dirName = '';
    if (option?.sourceSymbolTranslator) {
      dirName = option.sourceSymbolTranslator(dirList);
    } else {
      dirName = dirList[dirList.length - 1];
    }
    return dirName;
  }

  return {
    run
  }
}
