import {
  faDiscord,
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-ctp-mantle text-ctp-text">
    <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 py-6 md:flex-row md:px-8">
      <section className="basis-1/3">
        <h4 className="text-2xl font-bold">About</h4>
        <p>
          Crystal Linux is a brand new Arch Linux based distribution. Completely
          beginner friendly, easy to use, and powerful.
        </p>
      </section>
      <section className="basis-1/3">
        <h4 className="text-2xl font-bold">Community</h4>
        <ul>
          <li>
            <a href="https://forum.getcryst.al/">
              <FontAwesomeIcon
                icon={faMessage}
                className="mr-1"
                fixedWidth={true}
              />
              Forums
            </a>
          </li>
          <li>
            <a href="https://twitter.com/Crystal_Linux">
              <FontAwesomeIcon
                icon={faTwitter}
                className="mr-1"
                fixedWidth={true}
              />
              Twitter
            </a>
          </li>
          <li>
            <a href="https://fosstodon.org/@crystal_linux">
              <FontAwesomeIcon
                icon={faMastodon}
                className="mr-1"
                fixedWidth={true}
              />
              Mastodon
            </a>
          </li>
          <li>
            <a href="https://github.com/crystal-linux">
              <FontAwesomeIcon
                icon={faGithub}
                className="mr-1"
                fixedWidth={true}
              />
              Github
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
                Discord
              </a>
            </Link>
          </li>
        </ul>
      </section>
      <section className="basis-1/3">
        <h4 className="text-2xl font-bold">Other</h4>
        <ul>
          <li>
            <a href="https://github.com/crystal-linux/.github/blob/main/CONTRIBUTING.md">
              Contributing Guidelines
            </a>
          </li>
          <li>
            <a href="https://www.contributor-covenant.org/">
              The Contributor Covenant
            </a>
          </li>
          <li>
            <a href="https://developercertificate.org/">The DCO</a>
          </li>
        </ul>
      </section>
    </div>
  </footer>
);

export default Footer;
