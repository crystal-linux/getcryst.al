import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const TranslationInfo = () => {
  const { t } = useTranslation("meta");
  const { locale, defaultLocale } = useRouter();

  if (locale === defaultLocale) return null;

  return (
    <div className="mb-4 rounded-lg bg-ctp-surface0 p-4 text-sm" role="alert">
      <FontAwesomeIcon icon={faLanguage} size="xl" className="mr-2" />
      {t("documentation")}
    </div>
  );
};

export default TranslationInfo;
