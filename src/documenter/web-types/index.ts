/**
 * @description web-types document creator
 * @author 阿怪
 * @date 2022/4/5 12:45 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TransformedAPI, WebTypeOption } from "../../../types/types";
import { WebTypesTag, webTypesTagCreator } from "./webTypesTagCreator";
import { loadPackage } from "./loadPackage";
import { createFile } from "../../file/createFile";

export const webTypesDocumentCreator = async (apis: TransformedAPI[], option?: WebTypeOption) => {
  // need load package.json
  const packageJson = await loadPackage(option?.packageUrl);

  const webTypesInfo = {
    "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    name: packageJson.name,
    version: packageJson.version,
    contributions: {
      html: {
        "types-syntax": "typescript",
        "description-markup": "markdown",
        tags: [] as WebTypesTag[]
      }
    },
    ...option?.webTypesInfo
  }

  const webTypesCreator = webTypesTagCreator(option);
  webTypesInfo.contributions.html.tags = apis.map(api => webTypesCreator.run(api));

  return webTypesInfo;
}

export default async function (apis: TransformedAPI[], option?: WebTypeOption) {
  const info = await webTypesDocumentCreator(apis, option);
  createFile('web-types.json', JSON.stringify(info, null, 2));
}
