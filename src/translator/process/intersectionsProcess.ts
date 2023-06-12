/**
 * @description processes the intersections of the given type children array.
 * @author 阿怪
 * @date 2022/4/19 22:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { JhAPI, JhAPIs } from '../../../types/janghood-api-extractor';


export const intersectionsProcess = (apis: JhAPIs) => {
  // not support same name file right now
  const apiMaps = new Map<string, JhAPI>();
  const needProcessApis: JhAPIs = [];

  const setMaps = (jhApi: JhAPI) => {
    apiMaps.set(jhApi.name, jhApi);
    if (jhApi.children) {
      jhApi.children.forEach(setMaps);
    }
    if (jhApi.intersections) {
      let { intersections } = jhApi;
      intersections = intersections.filter(e => apiIntersectionsFilter(e, jhApi));
      jhApi.intersections = intersections;
      if (intersections.length !== 0) {
        needProcessApis.push(jhApi);
      }
    }
  };


  const apiIntersectionsFilter = (e: string, jhApi: JhAPI) => {

    if (apiMaps.has(e)) {
      const children = apiMaps.get(e)!.children! ?? [];
      if (jhApi.children) {

        jhApi.children.push(...children);
      } else {
        jhApi.children = [...children];
      }
      return false;
    }
    return true;
  };

  apis.forEach(setMaps);


  needProcessApis.forEach(jhApi => {
    jhApi.intersections = jhApi.intersections!.filter(e => apiIntersectionsFilter(e, jhApi));
  });

  return apis;
};



