/**
 * @description console
 * @author 阿怪
 * @date 2022/4/7 9:43 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const jError = (msg: string) => {
  throw new Error(msg);
}

export const jWarn = (msg: string) => {
  console.warn(msg);
}
