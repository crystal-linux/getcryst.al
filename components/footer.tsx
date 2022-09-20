import {
  faDiscord,
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDonate,
  faMessage as faSolidMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="border-t border-ctp-mantle text-ctp-text">
      <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 py-6 md:flex-row md:px-8">
        <section className="basis-1/3">
          <h4 className="text-2xl font-bold">{t("generics.about")}</h4>
          <p>{t("subtitle")}</p>
        </section>
        <section className="basis-1/3">
          <h4 className="text-2xl font-bold">{t("generics.community")}</h4>
          <ul>
            <li>
              <a href="https://forum.getcryst.al/">
                <FontAwesomeIcon
                  icon={faSolidMessage}
                  className="mr-1"
                  fixedWidth={true}
                />
                {t("locations.forums")}
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Crystal_Linux">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="mr-1"
                  fixedWidth={true}
                />
                {t("locations.twitter")}
              </a>
            </li>
            <li>
              <a href="https://fosstodon.org/@crystal_linux">
                <FontAwesomeIcon
                  icon={faMastodon}
                  className="mr-1"
                  fixedWidth={true}
                />
                {t("locations.mastodon")}
              </a>
            </li>
            <li>
              <a href="https://github.com/crystal-linux">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="mr-1"
                  fixedWidth={true}
                />
                {t("locations.github")}
              </a>
            </li>
            <li>
              <Link href="/discord">
                <a>
                  <FontAwesomeIcon
                    icon={faDiscord}
                    className="mr-1"
                    fixedWidth={true}
                  />
                  {t("locations.discord")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://matrix.to/#/#crystal:tar.black">
                <a>
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="mr-1"
                    fixedWidth={true}
                  />
                  {t("locations.matrix")}
                </a>
              </Link>
            </li>
          </ul>
        </section>
        <section className="basis-1/3">
          <h4 className="text-2xl font-bold">{t("generics.other")}</h4>
          <ul>
            <li>
              <Link href="https://opencollective.com/crystal-linux">
                <a>
                  <FontAwesomeIcon
                    icon={faDonate}
                    className="mr-1"
                    fixedWidth={true}
                  />
                  {t("locations.open_collective")}
                </a>
              </Link>
            </li>
            <li>
              <a href="https://github.com/crystal-linux/.github/blob/main/CONTRIBUTING.md">
                {t("locations.contributing_guidelines")}
              </a>
            </li>
            <li>
              <a href="https://www.contributor-covenant.org/">
                {t("locations.contributor_covenant")}
              </a>
            </li>
            <li>
              <a href="https://developercertificate.org/">
                {t("locations.dco")}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
