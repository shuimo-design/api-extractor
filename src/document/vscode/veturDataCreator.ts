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

  const childToAttribute = (identifierAPI: JhAPI): AttributeType => {
    const { doc, name } = identifierAPI;
    const attribute = {} as AttributeType;
    if (doc) {
      attribute.type = doc.type;
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
