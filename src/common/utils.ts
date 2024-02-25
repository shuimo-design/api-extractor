/**
 * @Description utils
 * @Author youus
 * @Date 2024/2/25 23:31
 * @Version v1.0.0
 *
 * Hello, humor
 */

export const isString = (str: string) => {
  if (str.startsWith('\'') && str.endsWith('\'')) {
    return true;
  }
  return str.startsWith('"') && str.endsWith('"');
};

export const clearDefault = (str: string) => {
  //  if is empty string "''"
  if (str === '\'\'') {
    return '';
  }
  return str;
};

export const formatTypes = (type: string) => {
  const types = type.split('|');
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
  return [currentStrList, typeList];
}
