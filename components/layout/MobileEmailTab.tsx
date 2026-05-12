import Link from "next/link";
import { Mail } from "lucide-react";

export default function MobileEmailTab() {
  return (
    <Link
      href="/email-an-agent"
      aria-label="Email an Agent"
      className="md:hidden flex items-center font-display"
      style={{
        position: "fixed",
        bottom: 20,
        right: 16,
        zIndex: 45,
        backgroundColor: "#a81010",
        color: "#ffffff",
        textTransform: "uppercase",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "2px",
        padding: "12px 18px",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        textDecoration: "none",
      }}
    >
      <Mail size={14} aria-hidden style={{ marginRight: 6 }} />
      Email an Agent
    </Link>
  );
}
