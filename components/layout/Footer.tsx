import Link from "next/link";

const SERVICES = [
  { label: "Auto (incl. Classic Car)", href: "/services/auto" },
  { label: "Home", href: "/services/home" },
  { label: "Landlord Protection", href: "/services/landlord-protection" },
  { label: "Condo Insurance", href: "/services/condo" },
  { label: "Renters", href: "/services/renters" },
  { label: "Umbrella", href: "/services/umbrella" },
  { label: "Commercial & Workers Compensation", href: "/services/commercial-workers-comp" },
];

const COMPANY = [
  { label: "Customer Service", href: "/customer-service" },
  { label: "Contact Us", href: "/contact" },
];

const PHONES = [
  { display: "415-586-7200", href: "tel:+14155867200" },
  { display: "415-586-2500", href: "tel:+14155862500" },
];
const EMAIL = "info@biddleshaw.com";
const ADDRESS = [
  "301 Junipero Serra Blvd., Suite 204",
  "San Francisco, CA 94127",
];

export default function Footer() {
  return (
    <footer className="bg-darker text-light/70 border-t border-mid font-body">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-display uppercase text-light text-xs tracking-widest mb-4">
            Biddle-Shaw
          </h3>
          <p className="text-sm leading-relaxed">
            Independent insurance brokerage serving families and businesses with
            tailored coverage.
          </p>
        </div>

        <div>
          <h3 className="font-display uppercase text-light text-xs tracking-widest mb-4">
            Insurance Services
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 hover:text-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display uppercase text-light text-xs tracking-widest mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            {COMPANY.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 hover:text-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display uppercase text-light text-xs tracking-widest mb-4">
            Contact
          </h3>
          <address className="not-italic text-sm space-y-2">
            <div className="text-light/50">
              {ADDRESS.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            {PHONES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="block py-2 hover:text-red transition-colors"
              >
                {p.display}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="block py-2 hover:text-red transition-colors"
            >
              {EMAIL}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-mid/50">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-light/50">
          <p>
            © 2026 Biddle-Shaw Insurance Services, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
