import Link from "next/link";

export const metadata = {
  title: "Compare Quotes | Biddle-Shaw Insurance Services",
  description:
    "Compare insurance quotes through our secure live quoting portal — auto, home, and more, powered by AgentInsure.",
};

const QUOTE_IFRAME_SRC =
  "https://www.agentinsure.com/compare/auto-insurance-home-insurance/bshawins/quote.aspx";

export default function QuotePage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-white border-b border-light">
        <ol
          className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center gap-2 font-body text-sm"
          style={{ color: "#4e4e4b" }}
        >
          <li>
            <Link
              href="/"
              className="transition-colors hover:underline"
              style={{ color: "#A81010" }}
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-mid">
            ›
          </li>
          <li aria-current="page" className="text-dark">
            Compare Quotes
          </li>
        </ol>
      </nav>

      <section className="bg-white w-full py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1
            className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ color: "#000000", fontWeight: 300 }}
          >
            Compare Quotes
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base md:text-lg leading-relaxed text-text">
            We follow the highest industry standards to safeguard the
            confidentiality of your personal information and secure the
            transmission of your data.
          </p>
        </div>

        <div className="mt-10 md:mt-14 w-full">
          <iframe
            id="cpIframe"
            title="Secure Live Insurance Quoting"
            src={QUOTE_IFRAME_SRC}
            width="100%"
            height="1600"
            style={{ border: 0, display: "block", width: "100%" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
