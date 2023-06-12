/**
 * @description janghood api extractor types
 * @author 阿怪
 * @date 2022/4/7 8:02 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { Doc } from '@janghood/config';

/**
 * @description output api type
 */
export declare type JhAPI = {
  /**
   * @description api belongs to which file information.
   * @type JhAPIPath
   */
  path?: JhAPIPath,
  /**
   * @description api name, maybe prop attribute's name.
   * @type string
   */
  name: string,
  /**
   * @description some api belongs to this.
   * @type API[]{@link JhAPI}
   */
  children?: JhAPIs,
  /**
   * @description api doc attribute
   */
  doc?: Doc,
  /**
   * @description intersection type list
   * @type string[]
   */
  intersections?: string[],
  /**
   * @description some id needs to link other types
   */
  link?: LinkType[],
  /**
   * @description some types, like union types
   */
  linker?: LinkerType[]
}

type LinkType = {
  key: string;
}
type LinkerType = {
  name: string;
  doc: Doc;
}

/**
 * @description file information
 */
type JhAPIPath = {
  /**
   * @description file name
   */
  file: string,
  /**
   * @description file directory
   */
  directory: string
}

export declare type JhAPIs = JhAPI[];

