import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import Footer from "../components/sections/Footer";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const errorState = location.state?.error;

  useEffect(() => {
    // If user already has a valid admin session, send them straight to admin
    if (window.location.hash?.includes("session_id=")) {
      // AppRouter will route to AuthCallback in this case; do nothing.
      setChecking(false);
      return;
    }
    let cancelled = false;
    api
      .get("/auth/me")
      .then((r) => {
        if (cancelled) return;
        if (r.data?.is_admin) {
          navigate("/admin/research", { replace: true, state: { user: r.data } });
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/admin/research";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(
      redirectUrl
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Slim header */}
      <header className="border-b border-[#E5DFCE]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#3a3a3a] hover:text-[#7A2828] transition-colors"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
          <p className="font-serif text-lg tracking-tight">
            Admin <span className="text-[#7A2828]">·</span> Sign in
          </p>
          <span className="w-[120px]" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[440px] py-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-[#1A1A1A]" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium">
              Restricted Area
            </span>
          </div>

          <h1 className="font-serif text-[40px] md:text-[48px] leading-[1.05] tracking-tight">
            Sign in to manage
            <span className="italic text-[#7A2828]"> your research </span>
            archive.
          </h1>

          <p className="mt-5 text-[15px] leading-[1.7] text-[#3a3a3a]">
            Authentication is handled by Google. Only the whitelisted admin
            account can access the dashboard.
          </p>

          {errorState === "not_admin" && (
            <div className="mt-8 border border-[#7A2828]/30 bg-[#7A2828]/5 p-4 flex items-start gap-3">
              <ShieldAlert size={16} className="text-[#7A2828] mt-0.5 shrink-0" />
              <div className="text-[13px] leading-relaxed text-[#3a3a3a]">
                <strong className="text-[#7A2828]">Access denied.</strong> The
                Google account you signed in with is not on the admin allowlist.
                Sign out of Google and try again with the correct account.
              </div>
            </div>
          )}
          {errorState === "auth_failed" && (
            <div className="mt-8 border border-[#7A2828]/30 bg-[#7A2828]/5 p-4 text-[13px] text-[#3a3a3a]">
              We couldn’t verify your sign‑in. Please try again.
            </div>
          )}

          {checking ? (
            <div className="mt-12 inline-flex items-center gap-2 text-[#5a5a5a]">
              <Loader2 size={16} className="animate-spin" /> Checking session…
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="mt-12 w-full inline-flex items-center justify-center gap-3 bg-[#1A1A1A] text-[#FBF9F4] px-6 py-4 hover:bg-[#7A2828] transition-colors text-[12px] tracking-[0.18em] uppercase font-medium"
            >
              <Lock size={14} /> Sign in with Google
            </button>
          )}

          <p className="mt-8 font-mono text-[11px] text-[#5a5a5a] leading-relaxed">
            Whitelisted accounts only. Unauthorised attempts are not logged on
            the public site — they’re simply rejected.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
