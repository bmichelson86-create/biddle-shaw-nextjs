"use client";

import { useState, type FormEvent } from "react";
import Reviews from "@/components/home/Reviews";

const INSURANCE_OPTIONS = [
  { value: "auto", label: "Auto (incl. Classic Car)" },
  { value: "home", label: "Home" },
  { value: "landlord-protection", label: "Landlord Protection" },
  { value: "condo", label: "Condo Insurance" },
  { value: "renters", label: "Renters" },
  { value: "umbrella", label: "Umbrella" },
  { value: "commercial-workers-comp", label: "Commercial & Workers Compensation" },
];

const ADDRESS_QUERY = "301 Junipero Serra Blvd Suite 204 San Francisco CA 94127";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  insuranceType: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.insuranceType) next.insuranceType = "Select a type";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h1
              className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ color: "#000000", fontWeight: 300 }}
            >
              Contact Us
            </h1>

            <div className="mt-8 space-y-6 font-body text-base text-text">
              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Office
                </p>
                <p className="leading-relaxed">
                  301 Junipero Serra Blvd., Suite 204
                  <br />
                  San Francisco, CA 94127
                </p>
              </div>

              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Phone
                </p>
                <p className="leading-relaxed">
                  <a href="tel:+14155867200" className="text-red hover:underline">
                    415-586-7200
                  </a>
                  <br />
                  <a href="tel:+14155862500" className="text-red hover:underline">
                    415-586-2500
                  </a>
                </p>
              </div>

              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Email
                </p>
                <p className="leading-relaxed">
                  <a href="mailto:info@biddleshaw.com" className="text-red hover:underline">
                    info@biddleshaw.com
                  </a>
                </p>
              </div>

              <div>
                <p className="font-display uppercase tracking-widest text-xs text-dark/70 mb-2">
                  Business Hours
                </p>
                <p className="leading-relaxed">Mon–Fri 8:30am – 5:30pm</p>
              </div>
            </div>

            <div className="mt-10 w-full overflow-hidden rounded-md border border-light">
              <iframe
                title="Biddle-Shaw office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <p className="form-title">Send Us a Message</p>
              <p className="message">
                We&apos;ll get back to you within one business day.
              </p>

              <div className="row">
                <label>
                  <input
                    className="input"
                    type="text"
                    placeholder=" "
                    value={form.firstName}
                    onChange={update("firstName")}
                    aria-invalid={!!errors.firstName}
                    required
                  />
                  <span>First Name</span>
                  {errors.firstName && <em className="err">{errors.firstName}</em>}
                </label>

                <label>
                  <input
                    className="input"
                    type="text"
                    placeholder=" "
                    value={form.lastName}
                    onChange={update("lastName")}
                    aria-invalid={!!errors.lastName}
                    required
                  />
                  <span>Last Name</span>
                  {errors.lastName && <em className="err">{errors.lastName}</em>}
                </label>
              </div>

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
                <span>Email</span>
                {errors.email && <em className="err">{errors.email}</em>}
              </label>

              <label>
                <input
                  className="input"
                  type="tel"
                  placeholder=" "
                  value={form.phone}
                  onChange={update("phone")}
                  aria-invalid={!!errors.phone}
                  required
                />
                <span>Phone</span>
                {errors.phone && <em className="err">{errors.phone}</em>}
              </label>

              <label className="select-label">
                <select
                  className="input select"
                  value={form.insuranceType}
                  onChange={update("insuranceType")}
                  aria-invalid={!!errors.insuranceType}
                  required
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
                {errors.insuranceType && <em className="err">{errors.insuranceType}</em>}
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

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Sending…" : "Send Message"}
              </button>

              {sent && (
                <p className="success" role="status">
                  Thanks — your message is on its way.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Reviews />
      </div>
    </section>
  );
}
