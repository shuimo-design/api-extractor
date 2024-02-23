/**
 * @description vscode vetur creator to create tags and attributes of components
 * @author youus
 * @date 2024/2/22 23:27
 * @version v1.0.0
 *
 * Hello, humor
 */
import { JhAPI } from '../../../types/janghood-api-extractor';
import { jWarn } from '../../common/console';

interface VeturTags {
  [key: string]: {
    attributes: string[]
    description: string
  }
}

interface VeturAttributes {
  [key: string]: {
    default: string
    description: string
    type: string
  }
}

type AttributeType = {
  default: string
  description: string
  type: string
  options?: string[]
}

export const veturDataCreator = () => {
  const generateVeturTag = (api: JhAPI) => {
    if (!api) {
      return;
    }
    const { children, doc } = api;

    const attributes: string[] = []
    if (!children || children.length === 0) {
      jWarn('no doc error!');
    } else {
      // maybe someday we need merge doc ,so use for()
      for (const child of children) {
        if (child.children) {
          if (child.name.includes('Prop')) {
            for (const c of child.children) {
              attributes.push(c.name);
            }
            break;
          }
        }
      }
    }
    return {
      [doc?.name ?? '']: {
        attributes,
        description: `${doc?.docDescription}\n[docs](${doc?.docUrl})` ?? ''
      }
    }
  }

  const clearDefault = (str: string) => {
    //  if is empty string "''"
    if (str === '\'\'') {
      return '';
    }
    return str;
  };

  const BASE_TYPES = ['string', 'number', 'boolean', 'null', 'undefined'];

  const isBaseTypes = (type: string) => {
    return BASE_TYPES.some(baseType => type.includes(baseType));
  }

  const handleType = (type: string) => {
    if (!type.includes('|') || isBaseTypes(type)) {
      return type;
    }
    const types = type.split('|');
    const isString = (str: string) => {
      if (str.startsWith('\'') && str.endsWith('\'')) {
        return true;
      }
      return str.startsWith('"') && str.endsWith('"');
    };
    const typeList: string[] = [];
    let currentStrList: string[] = [];
    for (const t of types) {
      if (isString(t)) {
        currentStrList.push(t);
      } else {
        if (currentStrList.length > 0) {
          typeList.push(currentStrList.join('|'));
          currentStrList = [];
        } else {
          typeList.push(t);
        }
      }
    }
    if (currentStrList.length > 0) {
      return currentStrList;
    }
    return typeList;
  };

  const childToAttribute = (identifierAPI: JhAPI): AttributeType => {
    const { doc, name } = identifierAPI;
    const attribute = {} as AttributeType;
    if (doc) {
      const type = handleType(doc.type)
      attribute.type = doc.type;
      if (Array.isArray(type)) {
        attribute.type = 'string';
        attribute.options = type;
      }
      attribute.default = clearDefault(doc.default);

      if (doc.description) {
        attribute.description = doc.description;
      }
    }

    return attribute;
  };

  const generateVeturAttributes = (api: JhAPI) => {
    if (!api) {
      return;
    }
    const { children, doc } = api;

    const attributes: VeturAttributes = {}
    if (!children || children.length === 0) {
      jWarn('no doc error!');
    } else {
      // maybe someday we need merge doc ,so use for()
      for (const child of children) {
        if (child.children) {
          if (child.name.includes('Prop')) {
            for (const c of child.children) {
              attributes[`${doc?.name}/${c.name}`] = childToAttribute(c);
            }
            break;
          }
        }
      }
    }
    return attributes
  }

  return {
    generateVeturTag,
    generateVeturAttributes
  }
}
