/**
 * @description markdown form creator
 * @author 阿怪
 * @date 2022/4/9 9:05 PM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { JhAPI } from "../../../types/janghood-api-extractor";

const propMDTableTitle = '|title|type|default|required|description|';
const propMDTableSplit = '|---|---|---|---|---|';

export const markdownFormCreator = (document: JhAPI) => {

  const { children: forms } = document;
  // make it strong
  if (forms && forms.length > 0) {

    return forms.map(form => {
      const { children: props } = form;
      if (props && props.length > 0) {
        return {
          table: [propMDTableTitle, propMDTableSplit, ...props.map(prop => toFormItem(prop))].join('\n'),
          name: form.name
        }
      }
    });
  }
  return [];
}

const toFormItem = (prop: JhAPI): string => {
  const { name, doc } = prop;
  const formItem: MarkdownFormItem = {
    title: name||'',
    type: doc?.type.replaceAll('|', 'or') ?? '',
    default: doc?.default ?? '',
    required: Boolean(doc?.required) ?? false,
    remark: doc?.description ?? '',
  }


  return `|${Object.values(formItem).join('|')}|`;
}

export type MarkdownFormItem = {
  title: string,
  type: string,
  default: string,
  required: boolean,
  remark: string
}
