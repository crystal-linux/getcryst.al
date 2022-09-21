import { i18n } from "../next-i18next.config.js";
import { TreeItem } from "./tree";

const trees: {
  [key: string]: TreeItem;
} = {};

for (const locale of i18n.locales) {
  trees[locale] = await new TreeItem("root").walk(`_docs/${locale}/`);

  trees[locale].sort();
}

export default trees;
