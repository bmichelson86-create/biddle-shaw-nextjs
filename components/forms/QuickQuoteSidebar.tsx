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

export default function QuickQuoteSidebar({
  defaultType = "",
  idPrefix = "quick-quote",
}: {
  defaultType?: string;
  idPrefix?: string;
}) {
  const router = useRouter();
  const [type, setType] = useState(defaultType);
  const [error, setError] = useState<string | null>(null);
  const selectId = `${idPrefix}-coverage`;
  const errorId = `${idPrefix}-coverage-error`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) {
      setError("Please select a coverage type.");
      return;
    }
    setError(null);
    router.push(`/quote?type=${type}`);
  };

  return (
    <aside style={{ backgroundColor: "#eaeaea", padding: "10px 10px 20px" }}>
      <h2
        className="font-display text-dark mt-2"
        style={{ fontSize: "40px", fontWeight: 300 }}
      >
        Get A Quote
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
        <div>
          <label htmlFor={selectId} className="sr-only">
            Coverage type
          </label>
          <select
            id={selectId}
            name="coverage"
            value={type}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            onChange={(e) => {
              setType(e.target.value);
              if (error) setError(null);
            }}
            className={`w-full font-body text-base bg-white text-dark px-3 py-2.5 border outline-none transition-colors focus:border-red ${
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
          className="w-full font-display uppercase tracking-wider text-white py-2.5 transition-colors"
          style={{ backgroundColor: "#A81010", borderRadius: 5 }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#8f0e0e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#A81010")
          }
        >
          Get Instant Quote
        </button>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-red text-sm font-body"
          >
            {error}
          </p>
        )}
      </form>
    </aside>
  );
}
