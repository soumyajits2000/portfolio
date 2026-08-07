import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import Footer from "../components/sections/Footer";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GSI_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [errorState, setErrorState] = useState(location.state?.error || null);
  const buttonRef = useRef(null);

  const handleCredentialResponse = useCallback(
    async (credentialResponse) => {
      setSigningIn(true);
      setErrorState(null);
      try {
        const res = await api.post("/auth/google", {
          credential: credentialResponse.credential,
        });
        if (res.data?.is_admin) {
          navigate("/admin/research", { replace: true, state: { user: res.data } });
        } else {
          setSigningIn(false);
          setErrorState("not_admin");
        }
      } catch (err) {
        setSigningIn(false);
        setErrorState("auth_failed");
      }
    },
    [navigate]
  );

  // If there's already a valid admin session, skip straight to the dashboard.
  useEffect(() => {
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

  // Load Google Identity Services and render its official sign-in button.
  useEffect(() => {
    if (checking || !GOOGLE_CLIENT_ID || !buttonRef.current) return;

    const renderButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "signin_with",
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      renderButton();
      return;
    }

    let script = document.querySelector(`script[src="${GSI_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = GSI_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", renderButton, { once: true });
    return () => script.removeEventListener("load", renderButton);
  }, [checking, handleCredentialResponse]);

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

          {!GOOGLE_CLIENT_ID ? (
            <div className="mt-8 border border-[#7A2828]/30 bg-[#7A2828]/5 p-4 text-[13px] leading-relaxed text-[#3a3a3a]">
              <strong className="text-[#7A2828]">Sign-in isn't configured yet.</strong>{" "}
              Set <code className="font-mono">REACT_APP_GOOGLE_CLIENT_ID</code> in{" "}
              <code className="font-mono">frontend/.env</code> — see the README's
              deployment section.
            </div>
          ) : checking ? (
            <div className="mt-12 inline-flex items-center gap-2 text-[#5a5a5a]">
              <Loader2 size={16} className="animate-spin" /> Checking session…
            </div>
          ) : (
            <div className="mt-12">
              <div ref={buttonRef} />
              {signingIn && (
                <div className="mt-4 inline-flex items-center gap-2 text-[#5a5a5a]">
                  <Loader2 size={16} className="animate-spin" /> Signing you in…
                </div>
              )}
            </div>
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
