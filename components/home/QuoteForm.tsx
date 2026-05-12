"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const COVERAGE_OPTIONS: { value: string; label: string }[] = [
  { value: "auto", label: "Auto (incl. Classic Car)" },
  { value: "home", label: "Home" },
  { value: "landlord-protection", label: "Landlord Protection" },
  { value: "condo", label: "Condo Insurance" },
  { value: "renters", label: "Renters" },
  { value: "umbrella", label: "Umbrella" },
  { value: "commercial-workers-comp", label: "Commercial & Workers Compensation" },
];

export default function QuoteForm() {
  const router = useRouter();
  const [type, setType] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) {
      setError("Please select a coverage type to continue.");
      return;
    }
    setError(null);
    router.push(`/quote?type=${type}`);
  };

  return (
    <section className="bg-white w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight text-dark">
          Looking to <span className="text-red">SAVE</span> on your{" "}
          <span className="text-red">INSURANCE POLICIES</span>?
        </h2>
        <p className="mt-3 font-display uppercase text-xl md:text-2xl text-dark">
          Get a <span className="text-red">QUOTE NOW!</span>
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 flex flex-col md:flex-row md:items-stretch gap-3 md:gap-4"
        >
          <div className="flex-1">
            <label htmlFor="coverage" className="sr-only">
              Coverage type
            </label>
            <select
              id="coverage"
              name="coverage"
              value={type}
              aria-invalid={!!error}
              aria-describedby={error ? "coverage-error" : undefined}
              onChange={(e) => {
                setType(e.target.value);
                if (error) setError(null);
              }}
              className={`w-full font-body text-base bg-white text-dark px-4 py-3 border outline-none transition-colors focus:border-red ${
                error ? "border-red" : "border-mid/40"
              }`}
              style={{ borderRadius: 5 }}
            >
              <option value="">Select coverage type</option>
              {COVERAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="font-display uppercase tracking-wider text-white px-8 py-3 transition-colors"
            style={{
              backgroundColor: "#A81010",
              borderRadius: 5,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#8f0e0e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#A81010")
            }
          >
            Get Instant California Insurance Quotes
          </button>
        </form>

        {error && (
          <p
            id="coverage-error"
            role="alert"
            className="mt-3 text-red text-sm font-body"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
