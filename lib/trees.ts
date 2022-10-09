import { existsSync } from "fs";
import { resolve } from "path";
import { i18n } from "../next-i18next.config.js";
import { TreeItem } from "./tree";

const trees: {
  [key: string]: TreeItem;
} = {};

const fallbackLocales: string[] = [];

for (const locale of i18n.locales) {
  if (existsSync(resolve(process.cwd(), `_docs/${locale}`))) {
    trees[locale] = await new TreeItem("root").walk(`_docs/${locale}/`);

    trees[locale].sort();
  } else {
    fallbackLocales.push(locale);
  }
}

const getTree = (locale: string) =>
  trees[fallbackLocales.includes(locale) ? i18n.defaultLocale : locale];

export default getTree;
