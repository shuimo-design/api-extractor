/**
 * @description web-types document creator
 * @author 阿怪
 * @date 2022/4/5 12:45 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { Doc, IdentifierAPI, TransformedAPI } from "../../../types/types";

export type WebTypesAttributes = {
  name: string,
  description?: string,
  'doc-url'?: string,
  value?: Doc
}

export const webTypesTagCreator = (api: TransformedAPI) => {
  // 这里输出的是单个tag的文档

  const { fileDoc, identifierAPIs } = api;

  const attributes: WebTypesAttributes[] = [];
  const events: [] = [];
  const slots: WebTypesAttributes[] = [];
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


  return {
    name: fileDoc.name,
    source: { symbol: 'WButton' }, // todo need fill whit file name
    description: fileDoc.docDescription,
    'doc-url': fileDoc.docUrl,
    attributes,
    events,
    slots
  };
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
