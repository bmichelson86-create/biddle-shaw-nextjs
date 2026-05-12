import Link from "next/link";
import ClientPortalSignIn from "@/components/forms/ClientPortalSignIn";

export const metadata = {
  title: "Customer Service | Biddle-Shaw Insurance Services",
  description:
    "View policies, print ID cards, request changes, make payments, and pull certificates through our customer service center.",
};

type Action = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const IconIdCard = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-9 h-9"
  >
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <circle cx="8.5" cy="12" r="2.5" />
    <path d="M14 10h5M14 13h5M14 16h3" />
  </svg>
);

const IconEdit = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-9 h-9"
  >
    <path d="M4 20h4l10.5-10.5a2.121 2.121 0 0 0-3-3L5 17v3z" />
    <path d="M14.5 6.5l3 3" />
  </svg>
);

const IconCard = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-9 h-9"
  >
    <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
    <path d="M2.5 10h19M6 15h4" />
  </svg>
);

const IconCertificate = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-9 h-9"
  >
    <path d="M5 3h11l3 3v15H5V3z" />
    <path d="M9 11h6M9 14h6M9 17h4" />
    <circle cx="17" cy="19" r="2" />
  </svg>
);

const ACTIONS: Action[] = [
  { title: "Get ID Cards", href: "/contact?topic=id-cards", icon: IconIdCard },
  { title: "Request For Change", href: "/contact?topic=policy-change", icon: IconEdit },
  { title: "Make Payments", href: "/contact?topic=payments", icon: IconCard },
  { title: "Get Certificates", href: "/contact?topic=certificates", icon: IconCertificate },
];

export default function CustomerServicePage() {
  return (
    <section className="bg-white w-full py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1
          className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: "#000000", fontWeight: 300 }}
        >
          Customer Service
        </h1>
        <p className="mt-5 max-w-3xl font-body text-base md:text-lg leading-relaxed text-text">
          Please use our customer service center to view your insurance
          policies, print insurance ID cards, update your contact information,
          download documents, and more. Prefer to talk to a person? Call us at{" "}
          <a href="tel:+14155867200" className="text-red hover:underline">
            415-586-7200
          </a>
          .
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4">
            <div
              className="font-display uppercase tracking-widest text-xs text-white px-4 py-3"
              style={{ backgroundColor: "#222222" }}
            >
              My Account
            </div>
            <ul className="flex flex-col">
              {ACTIONS.map((action) => (
                <li key={action.title}>
                  <Link
                    href={action.href}
                    className="service-card flex items-center gap-4 px-5 py-5 border-t border-mid/40 first:border-t-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span className="service-card__icon shrink-0 text-white">
                      {action.icon}
                    </span>
                    <span className="service-card__title flex-1 font-display uppercase tracking-wider text-base md:text-lg text-white">
                      {action.title}
                    </span>
                    <span aria-hidden className="service-card__copy text-white/80 text-xl leading-none">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="lg:col-span-8">
            <ClientPortalSignIn />
          </div>
        </div>
      </div>
    </section>
  );
}
