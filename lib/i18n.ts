import type { I18n } from "@lingui/core";
import { en, de } from "make-plural/plurals";

//anounce which locales we are going to use and connect them to approprite plural rules
export function initTranslation(i18n: I18n) {
  i18n.loadLocaleData({
    en: { plurals: en },
    de: { plurals: de },
    pseudo: { plurals: en },
  });
}

export async function loadTranslation(locale: string, isProduction = true) {
  if (isProduction) {
    return (await import(`../translations/locales/${locale}/messages`)).messages;
  } else {
    return (
      await import(
        `@lingui/loader!../translations/locales/${locale}/messages.po`
      )
    ).messages;
  }
}
