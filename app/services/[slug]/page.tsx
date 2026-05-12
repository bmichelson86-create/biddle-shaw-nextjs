import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuickQuoteSidebar from "@/components/forms/QuickQuoteSidebar";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import { buildFaqJsonLd } from "@/lib/faqSchema";

type ServiceContent = {
  title: string;
  paragraphs: string[];
  heroImage?: string;
  faqs?: FaqItem[];
};

const SERVICES: Record<string, ServiceContent> = {
  auto: {
    title: "Auto Insurance",
    paragraphs: [
      "Whether you're commuting across the Bay, road-tripping up the coast, or storing a weekend classic in the garage, our auto policies are built to fit how you actually drive. We compare carriers across California to find the right balance of liability, collision, comprehensive, and uninsured-motorist coverage at a price that makes sense.",
      "Classic and collector vehicles are covered under the same conversation — agreed-value policies, limited-mileage discounts, and specialty carriers who understand that a 1967 fastback isn't a daily driver. Tell us what's in the garage and we'll find the program that protects it properly.",
      "Already have a policy? Send us your declarations page. We'll do a side-by-side comparison and tell you honestly whether switching makes sense or your current coverage is already a good fit.",
    ],
    faqs: [
      {
        question: "Does Biddle-Shaw cover classic and collector cars?",
        answer:
          "Yes. Biddle-Shaw writes agreed-value policies for classic and collector vehicles in California, ensuring your car is covered for its full insured value — not depreciated market value — in the event of a total loss.",
      },
      {
        question: "What auto coverage is required in California?",
        answer:
          "California requires minimum liability coverage of 15/30/5 — $15,000 per person, $30,000 per accident for bodily injury, and $5,000 for property damage. Biddle-Shaw recommends higher limits and uninsured motorist coverage given California road conditions.",
      },
      {
        question: "Can I bundle my auto policy with home insurance?",
        answer:
          "Yes. Bundling auto and home insurance through Biddle-Shaw in San Francisco typically reduces your overall premium. As an independent broker we shop multiple carriers to find the best combined rate for your situation.",
      },
      {
        question: "What is uninsured motorist coverage and do I need it?",
        answer:
          "Uninsured motorist coverage pays for your injuries and damages when the at-fault driver has no insurance. California has one of the highest rates of uninsured drivers in the country, making this coverage essential for most drivers.",
      },
    ],
  },
  home: {
    title: "Home Insurance",
    paragraphs: [
      "California homeownership comes with a unique set of risks — wildfire exposure, earthquake considerations, and a property market where rebuild costs rarely match purchase price. Our home policies are written to those realities, with dwelling limits that reflect actual replacement cost, not a generic estimate.",
      "We walk you through the optional coverages that matter most in our region: extended replacement cost, ordinance-or-law, water backup, and scheduled personal property for the items a base policy under-insures. Where standalone wildfire or earthquake coverage is appropriate, we coordinate it alongside your homeowners policy so the gaps are closed.",
      "If you're buying, refinancing, or just renewing, we'll review the policy in plain English, flag any thin spots, and quote alternatives across our carrier panel.",
    ],
    faqs: [
      {
        question: "Does home insurance in California cover wildfires?",
        answer:
          "Standard home insurance policies in California cover wildfire damage, but coverage availability and limits vary significantly by location and carrier. Biddle-Shaw works with multiple carriers to find wildfire coverage for San Francisco Bay Area homeowners, including higher-risk ZIP codes.",
      },
      {
        question: "What is extended replacement cost coverage?",
        answer:
          "Extended replacement cost coverage pays to rebuild your home even if construction costs exceed your policy limit — typically by 25-50%. This is critical in California where post-disaster rebuild costs frequently outpace standard coverage limits.",
      },
      {
        question: "Does home insurance cover earthquakes in California?",
        answer:
          "Standard home insurance does not cover earthquake damage in California. A separate earthquake policy or California Earthquake Authority (CEA) policy is required. Biddle-Shaw can help you evaluate your risk and find appropriate earthquake coverage.",
      },
      {
        question: "What does ordinance-or-law coverage do?",
        answer:
          "Ordinance-or-law coverage pays the additional cost of rebuilding your home to current building codes after a covered loss. In San Francisco, where many homes are older, this coverage is often essential and frequently overlooked.",
      },
    ],
  },
  "landlord-protection": {
    title: "Landlord Protection",
    paragraphs: [
      "Owning rental property — single-family, duplex, or a small portfolio — exposes you to risks a homeowners policy won't cover. A landlord protection policy (often called a DP-3) is built for that, with dwelling and other-structures coverage written on a replacement-cost basis and liability scaled for tenant-occupied properties.",
      "We layer in the pieces that matter for landlords: loss of rents while a covered claim is being repaired, premises liability with limits high enough to actually do something, and optional vandalism and ordinance-or-law endorsements. For multi-property owners, we'll structure coverage so it's coherent across the portfolio rather than a patchwork of one-off policies.",
      "Talk to us before your next acquisition or renewal — we'll quote across carriers who specialize in this segment and give you a clear-eyed read on what the policy actually does.",
    ],
    faqs: [
      {
        question: "What does landlord protection insurance cover in California?",
        answer:
          "Landlord protection insurance in California covers the dwelling structure, other structures on the property, premises liability, and loss of rental income while a covered claim is being repaired. It is specifically designed for tenant-occupied properties, not owner-occupied homes.",
      },
      {
        question: "Does landlord insurance cover tenant damage?",
        answer:
          "Landlord insurance covers sudden and accidental damage but typically excludes gradual tenant neglect. Biddle-Shaw recommends requiring tenants to carry renters insurance and including vandalism coverage in your landlord policy for more complete protection.",
      },
      {
        question: "What is loss of rents coverage?",
        answer:
          "Loss of rents coverage reimburses you for lost rental income when a covered claim — such as fire or water damage — makes your property temporarily uninhabitable. Biddle-Shaw includes this in standard landlord policies for San Francisco rental property owners.",
      },
      {
        question: "Do I need a separate policy for each rental property?",
        answer:
          "Each rental property typically requires its own landlord policy. However, Biddle-Shaw can help portfolio landlords in California structure coverage efficiently across multiple properties to minimize gaps and reduce overall premium costs.",
      },
    ],
  },
  condo: {
    title: "Condo Insurance",
    heroImage: "/images/condo-feat.webp",
    paragraphs: [
      "Owning a condo in California means your HOA's master policy only covers part of the picture. An HO-6 condo policy fills the rest — your unit's interior, personal property, and personal liability — and protects you against the surprises a master policy leaves behind. We write coverage that maps to the way your association's master is structured (bare-walls, single-entity, or all-in), so you're not paying for overlap or, worse, missing a critical gap.",
      "We customize the pieces condo owners actually need: dwelling coverage for improvements and betterments (anything you've upgraded inside the unit), loss-assessment coverage for special assessments the HOA levies after a covered loss, and additional-living-expenses coverage if your unit becomes uninhabitable while it's being repaired. Earthquake and water-backup endorsements are available where they make sense for your building and your equity position.",
      "Sending us a copy of your HOA's master declarations alongside your current condo policy lets us do a real coverage review — not a quote based on guesses. We'll tell you where you're underinsured, where you're double-paying, and what a properly sized policy actually costs across our California carrier panel.",
    ],
    faqs: [
      {
        question: "What does condo insurance cover that my HOA does not?",
        answer:
          "Condo insurance covers your personal property, interior improvements, personal liability, and loss assessment charges — filling the gaps left by your HOA master policy. In San Francisco, where HOA master policies vary widely, an HO-6 policy is essential for complete protection.",
      },
      {
        question: "What is loss assessment coverage for condos?",
        answer:
          "Loss assessment coverage pays your share of a special assessment charged by your HOA after a major covered loss — such as earthquake damage to common areas. California condo owners can face assessments of tens of thousands of dollars without this protection.",
      },
      {
        question: "Does condo insurance cover improvements I made to my unit?",
        answer:
          "Yes. If you have renovated your kitchen, upgraded flooring, or made other improvements, your HO-6 condo policy can cover those upgrades. Biddle-Shaw reviews your unit's improvements to ensure your coverage limit reflects the actual value of your interior.",
      },
      {
        question: "How much condo insurance do I need in San Francisco?",
        answer:
          "The right amount depends on your unit's square footage, improvement value, personal property, and your HOA master policy type. Biddle-Shaw reviews all four factors for San Francisco condo owners to recommend accurate coverage limits with no gaps.",
      },
    ],
  },
  renters: {
    title: "Renters Insurance",
    paragraphs: [
      "Renters insurance is the most cost-effective policy most people will ever buy: a few dollars a month that covers your belongings, your liability, and your living expenses if your unit becomes uninhabitable. In a California rental market where one apartment fire or burst pipe can wipe out a household's savings, going without it is a real risk.",
      "We write policies that match how you actually live — coverage limits sized to your belongings (not an arbitrary default), liability at a level that protects you if a guest is injured, and additional-living-expenses coverage so a displacement doesn't turn into a financial crisis.",
      "If your landlord requires proof of insurance, we can issue a certificate the same day. Most renters policies bind in under fifteen minutes.",
    ],
    faqs: [
      {
        question: "What does renters insurance cover in California?",
        answer:
          "Renters insurance in California covers your personal property against theft, fire, and water damage, plus personal liability if someone is injured in your rental. It also covers temporary living expenses if your unit becomes uninhabitable due to a covered loss.",
      },
      {
        question: "Is renters insurance required in San Francisco?",
        answer:
          "Renters insurance is not legally required in California, but many San Francisco landlords now require it as a lease condition. Biddle-Shaw recommends all renters carry at least $30,000 in personal property coverage and $100,000 in liability.",
      },
      {
        question: "How much does renters insurance cost?",
        answer:
          "Renters insurance in California typically costs between $15 and $30 per month depending on coverage limits and location. It is one of the most affordable insurance products available and provides significant financial protection for a relatively small premium.",
      },
      {
        question: "Does renters insurance cover theft outside my apartment?",
        answer:
          "Yes. Most renters insurance policies cover personal property theft anywhere in the world — including items stolen from your car, a hotel room, or while traveling. Biddle-Shaw reviews off-premises theft limits to ensure your coverage is adequate.",
      },
    ],
  },
  umbrella: {
    title: "Umbrella Insurance",
    paragraphs: [
      "Umbrella insurance sits on top of your auto, home, and other underlying liability policies, kicking in when a claim exceeds those base limits. For a relatively modest premium, you can add a million dollars or more of liability protection — the kind of coverage that matters in a serious at-fault auto accident or a major property-related lawsuit.",
      "We help clients right-size umbrella limits based on assets, income, and exposure (rental properties, teen drivers, pools, frequent guests). The goal isn't to oversell coverage; it's to make sure that one bad event doesn't put your savings, retirement, or home at risk.",
      "Already have an umbrella? Bring it in. We'll confirm the underlying limits actually qualify for it (a common gap) and quote it against our carrier panel.",
    ],
    faqs: [
      {
        question: "What does umbrella insurance cover?",
        answer:
          "Umbrella insurance provides an extra layer of liability coverage — typically $1 million or more — above the limits of your auto, home, or other underlying policies. It covers bodily injury, property damage, and certain personal liability claims that exceed your base policy limits.",
      },
      {
        question: "Who needs umbrella insurance in California?",
        answer:
          "Anyone with significant assets, a high income, or elevated liability exposure should consider umbrella insurance in California. San Francisco homeowners, landlords, and business owners are particularly vulnerable to large liability judgments that can exceed standard policy limits.",
      },
      {
        question: "How much does umbrella insurance cost?",
        answer:
          "A $1 million umbrella policy typically costs $150 to $300 per year in California — making it one of the most cost-effective ways to protect your assets. Biddle-Shaw shops multiple carriers to find the best umbrella rate for your specific risk profile.",
      },
      {
        question: "Does umbrella insurance cover my rental properties?",
        answer:
          "Yes. Umbrella insurance can extend liability coverage over your rental properties in addition to your primary residence and vehicles. California landlords with multiple properties particularly benefit from the broad coverage an umbrella policy provides.",
      },
    ],
  },
  "commercial-workers-comp": {
    title: "Commercial & Workers Compensation",
    paragraphs: [
      "Small businesses, contractors, and professional services across the Bay Area trust us for coverage that scales with the operation. We write commercial general liability, business owners policies (BOP), commercial auto, professional liability, and the specialty endorsements specific industries need — all from a panel of carriers who actually want California risks.",
      "Workers compensation is California-mandated for nearly every business with employees, and the wrong classification or under-reported payroll can turn into a six-figure audit surprise. We work with carriers and a payroll-aware approach so the policy is priced correctly from the start, and we stay engaged through audits, mod changes, and claims.",
      "If you're starting a business, adding employees, or your current broker has gone quiet on you, let's talk. We'll review your current program, identify exposures, and quote what makes sense.",
    ],
    faqs: [
      {
        question: "What commercial insurance does a California small business need?",
        answer:
          "Most California small businesses need at minimum a Business Owners Policy (BOP) combining general liability and commercial property, plus workers compensation if they have employees. Biddle-Shaw evaluates your specific industry and operations in San Francisco to recommend the right coverage mix.",
      },
      {
        question: "Is workers compensation required in California?",
        answer:
          "Yes. California requires workers compensation insurance for any business with one or more employees. Failure to carry workers comp in California can result in fines up to $100,000 and criminal penalties. Biddle-Shaw helps San Francisco businesses secure compliant coverage.",
      },
      {
        question: "What is a Business Owners Policy (BOP)?",
        answer:
          "A Business Owners Policy combines general liability and commercial property insurance into a single, cost-effective policy designed for small to mid-sized businesses. Biddle-Shaw customizes BOPs for San Francisco businesses across industries including retail, professional services, and contractors.",
      },
      {
        question: "Does commercial auto insurance differ from personal auto?",
        answer:
          "Yes. Personal auto policies exclude vehicles used primarily for business purposes. Commercial auto insurance covers vehicles used for business operations, higher liability limits appropriate for commercial use, and employees driving on company business in California.",
      },
    ],
  },
};

const SLUG_TO_NAV_LABEL: Record<string, string> = {
  auto: "Auto Insurance",
  home: "Home Insurance",
  "landlord-protection": "Landlord Protection",
  condo: "Condo Insurance",
  renters: "Renters Insurance",
  umbrella: "Umbrella Insurance",
  "commercial-workers-comp": "Commercial & Workers Compensation",
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return {
    title: `${service.title} | Biddle-Shaw Insurance Services`,
    description: service.paragraphs[0]?.slice(0, 155),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  const breadcrumbLabel = SLUG_TO_NAV_LABEL[slug] ?? service.title;

  return (
    <>
      <div className="relative w-full" style={{ height: 340 }}>
        <Image
          src={service.heroImage ?? "/images/hero-1.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-light"
      >
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
          <li>
            <Link
              href="/services"
              className="transition-colors hover:underline"
              style={{ color: "#A81010" }}
            >
              Insurance Services
            </Link>
          </li>
          <li aria-hidden className="text-mid">
            ›
          </li>
          <li aria-current="page" className="text-dark">
            {breadcrumbLabel}
          </li>
        </ol>
      </nav>

      <section className="bg-white w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="md:col-span-2">
            <h1
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ color: "#000000", fontWeight: 300 }}
            >
              {service.title}
            </h1>

            <div className="mt-8 space-y-5 font-body text-text text-base leading-relaxed">
              {service.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <QuickQuoteSidebar idPrefix={`service-${slug}`} defaultType={slug} />
          </div>
        </div>

        {service.faqs && service.faqs.length > 0 && (
          <div className="mx-auto max-w-7xl px-6">
            <FaqAccordion items={service.faqs} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(buildFaqJsonLd(service.faqs)),
              }}
            />
          </div>
        )}
      </section>
    </>
  );
}
