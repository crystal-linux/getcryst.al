import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Edit: FC = () => {
  const { t } = useTranslation("meta");
  const { locale, query } = useRouter();

  return (
    <div className="mb-4 rounded-lg bg-ctp-mantle p-4 text-sm" role="alert">
      <FontAwesomeIcon icon={faEdit} className="mr-2" />
      <a
        href={`https://github.com/crystal-linux/docs/blob/main/${[
          locale,
          ...(query.slug as string[]),
        ].join("/")}.mdx`}
        target="_blank"
        rel="noreferrer"
      >
        {t("edit_documentation")}
      </a>
    </div>
  );
};

export default Edit;
