"use client";

import type { FormEvent } from "react";

export default function ClientPortalSignIn() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to real auth handler.
  };

  return (
    <form className="client-portal-form" onSubmit={handleSubmit}>
      <p className="form-title">Sign In to Client Center</p>
      <p className="message">Access your policies, ID cards, and documents.</p>

      <label>
        <input className="input" type="email" placeholder="" required />
        <span>Email Address</span>
      </label>

      <label>
        <input className="input" type="password" placeholder="" required />
        <span>Password</span>
      </label>

      <button type="submit" className="submit-btn">SIGN IN</button>

      <p className="forgot-link">Forgot your password?</p>

      <p className="divider">or</p>

      <button type="button" className="google-btn">
        <svg aria-hidden viewBox="0 0 24 24" width={18} height={18}>
          <path
            fill="#EA4335"
            d="M12 10.2v3.96h5.52c-.24 1.44-1.68 4.2-5.52 4.2-3.36 0-6.12-2.76-6.12-6.36 0-3.6 2.76-6.36 6.12-6.36 1.92 0 3.24.84 3.96 1.56l2.7-2.64C17.04 2.88 14.76 1.8 12 1.8 6.96 1.8 2.88 5.88 2.88 12s4.08 10.2 9.12 10.2c5.28 0 8.76-3.72 8.76-8.94 0-.6-.06-1.08-.18-1.56H12z"
          />
          <path
            fill="#FBBC05"
            d="M3.84 7.32l3.24 2.4c.84-1.68 2.4-2.88 4.92-2.88 1.92 0 3.24.84 3.96 1.56l2.7-2.64C17.04 2.88 14.76 1.8 12 1.8 7.92 1.8 4.44 4.08 3.84 7.32z"
          />
          <path
            fill="#34A853"
            d="M12 22.2c2.7 0 4.98-.9 6.66-2.46l-3.24-2.52c-.9.6-2.04.96-3.42.96-2.64 0-4.86-1.74-5.64-4.14L3.18 16.5c1.62 3.42 5.04 5.7 8.82 5.7z"
          />
          <path
            fill="#4285F4"
            d="M20.76 11.7c0-.6-.06-1.08-.18-1.56H12v3.96h5.52c-.24 1.2-1.02 2.34-2.1 3.12l3.24 2.52c1.92-1.8 3.06-4.44 3.06-8.04z"
          />
        </svg>
        Sign in with Google
      </button>

      <p className="helper-text">Use the email address you gave your agent</p>
    </form>
  );
}
