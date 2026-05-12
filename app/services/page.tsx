import FancyServicesNav from "@/components/services/FancyServicesNav";

export const metadata = {
  title: "Insurance Services | Biddle-Shaw Insurance Services",
  description:
    "Auto, home, landlord, renters, umbrella, and commercial coverage written across California by an independent brokerage. Click any service to see what's covered.",
};

export default function InsuranceServicesPage() {
  return (
    <>
      <section className="bg-white w-full pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-display uppercase tracking-widest text-xs md:text-sm text-red">
            Coverage Lines
          </p>
          <h1
            className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ color: "#000000", fontWeight: 300 }}
          >
            Insurance Services
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base md:text-lg leading-relaxed text-text">
            Seven coverage lines, written across a panel of California carriers.
            Tap any service to see what's covered, then request a quote — we'll
            shop the market on your behalf and recommend the policy that
            actually fits.
          </p>
        </div>
      </section>

      <FancyServicesNav />
    </>
  );
}
