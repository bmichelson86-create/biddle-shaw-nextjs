import { Fragment } from "react";
import Link from "next/link";
import styles from "./UtilityBar.module.css";

const PHONE = "415-586-7200";
const PHONE_HREF = "tel:+14155867200";
const HOURS = "Mon–Fri 8:30am – 5:30pm";
const EMAIL_AGENT_HREF = "/email-an-agent";
const SOCIAL: { label: string; href: string }[] = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function UtilityBar() {
  return (
    <div className="hidden md:block bg-darker text-white text-xs tracking-wide font-body">
      <div className="mx-auto max-w-7xl h-9 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={PHONE_HREF}
            className="hover:text-red transition-colors"
          >
            {PHONE}
          </a>
          <span>{HOURS}</span>
          <Link href={EMAIL_AGENT_HREF} className={styles.strokeBtn}>
            <span className={styles.actualText}>&nbsp;Email an Agent&nbsp;</span>
            <span aria-hidden className={styles.hoverText}>&nbsp;Email an Agent&nbsp;</span>
          </Link>
        </div>
        <ul className="flex items-center gap-5">
          {SOCIAL.map((s, i) => (
            <Fragment key={s.label}>
              <li>
                <a href={s.href} className="hover:text-red transition-colors">
                  {s.label}
                </a>
              </li>
              {i < SOCIAL.length - 1 && (
                <li aria-hidden className="text-light/30">
                  /
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
