/**
 * @description link api
 * @author 阿怪
 * @date 2022/11/3 11:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { JhAPI, JhAPIs } from "../../types/janghood-api-extractor";


export const linkJHAPIs = (jhAPIs: JhAPIs) => {

  const childrenMap = new Map<string, JhAPI>();
  const needLinkApis: JhAPIs = [];

  jhAPIs.forEach(jhApi => {
    if (!jhApi.children) {return;}

    jhApi.children.forEach(child => {
      childrenMap.set(child.name, child);
      if (child.intersections) {
        needLinkApis.push(child);
      }
    })
  })

  needLinkApis.forEach(jhApi => {
    if (jhApi.intersections && jhApi.intersections.length > 0) {
      jhApi.intersections.forEach(intersection => {
        const child = Object.assign({}, childrenMap.get(intersection));
        child.intersections = [intersection];
        if (child && child.children) {
          if (jhApi.children) {
            jhApi.children.push(...child.children);
          } else {
            jhApi.children = [...child.children];
          }
        }
      })
    }
  });

  return jhAPIs;

}
