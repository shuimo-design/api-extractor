/**
 * @description web-types tags creator
 * @author 阿怪
 * @date 2022/4/5 1:12 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from 'path';
import type { WebTypeOption, WebTypesAttributes, WebTypesTag, Doc } from '@janghood/config';
import type { JhAPI } from '../../../types/janghood-api-extractor';
import { jWarn } from '../../common/console';
import { clearDefault, formatTypes } from '../../common/utils';

export declare type WebTypesTagCreatorRunner = (api: JhAPI) => WebTypesTag | undefined;

export const webTypesTagCreator = (option?: WebTypeOption) => {
  const run: WebTypesTagCreatorRunner = api => {
    // 这里输出的是单个tag的文档
    if (!api) {
      return;
    }

    const { path, children, doc } = api;
    if (!path) {
      return;
    }

    const props: WebTypesAttributes[] = [];
    const events: [] = [];
    const slots: [] = [];
    if (!children || children.length === 0) {
      jWarn('no doc error!');
    } else {
      // maybe someday we need merge doc ,so use for()
      for (const child of children) {
        if (child.children) {

          if (child.name.includes('Prop')) {
            for (const c of child.children) {
              props.push(childToAttribute(c));
            }
            break;
          }

        }
      }
    }


    const tag: WebTypesTag = {
      name: doc?.name ?? '',
      source: { symbol: doc?.sourceSymbol ?? getDir(api.name ?? '') },
      description: doc?.docDescription,
      'doc-url': doc?.docUrl,
      props
    };

    // delete fileDoc.sourceSymbol;

    if (events.length) {
      tag.events = events;
    }
    if (slots.length) {
      tag.slots = slots;
    }
    return tag;
  };

  const handleType = (type: string) => {
    if (!type.includes('|')) {
      return type;
    }
    const [currentStrList, typeList] = formatTypes(type)
    if (currentStrList.length > 0) {
      return currentStrList.join('|');
    }
    return typeList;
  };

  const childToAttribute = (identifierAPI: JhAPI): WebTypesAttributes => {
    const { doc, name } = identifierAPI;
    const attribute: WebTypesAttributes = {
      name
    };
    const value: Doc & { type?: string | string[] } = {};
    if (doc) {
      value.type = handleType(doc.type);
      value.default = clearDefault(doc.default);
      if (doc.docUrl) {
        attribute['doc-url'] = doc.docUrl;
      }
      if (doc.description) {
        attribute.description = doc.description;
      }
    }
    Object.assign(attribute, value);

    return attribute;
  };

  const getDir = (file: string) => {
    const dirList = path.dirname(file).split('/');
    let dirName = '';
    if (option?.sourceSymbolTranslator) {
      dirName = option.sourceSymbolTranslator(dirList);
    } else {
      dirName = dirList[dirList.length - 1];
    }
    return dirName;
  };

  return {
    run
  };
};
