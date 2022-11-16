import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Error: NextPageWithLayout<{ statusCode?: number }> = ({ statusCode }) => (
  <p className="my-24 text-ctp-text flex items-center gap-2">
    <FontAwesomeIcon icon={faXmark} />
    {statusCode
      ? `Ett fel ${statusCode} inträffade på servern`
      : "Ett fel inträffade på klienten"}
  </p>
);

export const getServerSideProps: GetServerSideProps = async ({ locale, res }) => {
  const statusCode = res ? res.statusCode : undefined
  return {
    props: {
      statusCode,
      ...(await serverSideTranslations(locale!, [
        "common",
        "footer",
        "navbar",
      ])),
    },
  };
};


Error.getLayout = function getLayout(page: ReactElement) {
  return <main className="flex flex-col items-center">{page}</main>;
};

export default Error;
