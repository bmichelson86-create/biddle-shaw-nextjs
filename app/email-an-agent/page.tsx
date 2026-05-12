"use client";

import { useState, type FormEvent } from "react";

const INSURANCE_OPTIONS = [
  { value: "auto", label: "Auto (incl. Classic Car)" },
  { value: "home", label: "Home" },
  { value: "landlord-protection", label: "Landlord Protection" },
  { value: "condo", label: "Condo Insurance" },
  { value: "renters", label: "Renters" },
  { value: "umbrella", label: "Umbrella" },
  { value: "commercial-workers-comp", label: "Commercial & Workers Compensation" },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
};

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  insuranceType: "",
  message: "",
};

export default function EmailAnAgentPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
    setForm(INITIAL);
  };

  return (
    <section className="bg-white w-full py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1
          className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: "#000000", fontWeight: 300 }}
        >
          Email an Agent
        </h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="font-body text-base leading-relaxed text-text">
              Prefer to reach out directly? Send us a message and one of our agents
              will get back to you promptly.
            </p>

            <div className="mt-8 space-y-6 font-body text-base text-text">
              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Phone
                </p>
                <p className="leading-relaxed">
                  <a href="tel:+14155867200" className="text-red hover:underline">
                    415-586-7200
                  </a>
                </p>
              </div>

              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Address
                </p>
                <p className="leading-relaxed">
                  301 Junipero Serra Blvd., Suite 204
                  <br />
                  San Francisco, CA 94127
                </p>
              </div>

              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Hours
                </p>
                <p className="leading-relaxed">Mon–Fri 8:30am – 5:30pm</p>
              </div>
            </div>
          </div>

          <div>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <p className="form-title">Send Us a Message</p>

              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=" "
                  value={form.fullName}
                  onChange={update("fullName")}
                  aria-invalid={!!errors.fullName}
                  required
                />
                <span>Full Name</span>
                {errors.fullName && <em className="err">{errors.fullName}</em>}
              </label>

              <label>
                <input
                  className="input"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={!!errors.email}
                  required
                />
                <span>Email Address</span>
                {errors.email && <em className="err">{errors.email}</em>}
              </label>

              <label>
                <input
                  className="input"
                  type="tel"
                  placeholder=" "
                  value={form.phone}
                  onChange={update("phone")}
                />
                <span>Phone Number</span>
              </label>

              <label className="select-label">
                <select
                  className="input select"
                  value={form.insuranceType}
                  onChange={update("insuranceType")}
                >
                  <option value="" disabled>
                    Select Insurance Type
                  </option>
                  {INSURANCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <textarea
                  className="input textarea"
                  placeholder=" "
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  required
                />
                <span>Message</span>
                {errors.message && <em className="err">{errors.message}</em>}
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="font-display uppercase tracking-wider text-white bg-[#a81010] hover:bg-[#8f0e0e] transition-colors px-6 py-3 disabled:opacity-60"
                style={{ borderRadius: 5 }}
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>

              {sent && (
                <p className="success" role="status">
                  Thank you! An agent will be in touch shortly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
