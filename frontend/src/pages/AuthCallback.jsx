import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "../lib/api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent double-execution under React StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const m = hash.match(/session_id=([^&]+)/);
    if (!m) {
      navigate("/admin/login", { replace: true });
      return;
    }
    const sessionId = decodeURIComponent(m[1]);

    api
      .post("/auth/session", { session_id: sessionId })
      .then((res) => {
        // Strip the fragment so it can't be reused
        window.history.replaceState(null, "", window.location.pathname);
        if (res.data?.is_admin) {
          navigate("/admin/research", { replace: true, state: { user: res.data } });
        } else {
          // Logged in but not an admin
          navigate("/admin/login", {
            replace: true,
            state: { error: "not_admin" },
          });
        }
      })
      .catch(() => {
        setError("auth_failed");
        navigate("/admin/login", {
          replace: true,
          state: { error: "auth_failed" },
        });
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-[#3a3a3a]">
        <Loader2 size={18} className="animate-spin" />
        <span className="font-serif italic text-[16px]">
          {error ? "Redirecting\u2026" : "Signing you in\u2026"}
        </span>
      </div>
    </div>
  );
};

export default AuthCallback;
