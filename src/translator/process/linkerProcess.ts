/**
 * @description processes the linkers...
 * @author 阿怪
 * @date 2023/6/12 16:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * A very rough algorithm, run first and then talk
 */
import { JhAPIs } from '../../../types/janghood-api-extractor';
import { Doc } from '@janghood/config';


export const linkerProcess = (apis: JhAPIs) => {

  const linker = new Map<string, Doc>();

  apis.forEach(api => {
    if (api.linker) {
      api.linker.forEach(l => {
        linker.set(l.name, l.doc);
      });
    }
  });

  apis.forEach(api => {
    api.children?.forEach(e => {
      if (e.link) {
        e.link.forEach(l => {
          if (e.doc && linker.has(l.key)) {
            e.doc.type = linker.get(l.key)!.type;
          }
        });
      }
    });
  });

  return apis;

};
