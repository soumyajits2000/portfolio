import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  X,
  Pencil,
  ExternalLink,
  Loader2,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";
import Footer from "../components/sections/Footer";

const emptyForm = {
  title: "",
  role: "",
  advisor: "",
  institution: "",
  period: "",
  summary: "",
  tags: "",
  links: [],
};

const itemToForm = (item) => ({
  title: item.title || "",
  role: item.role || "",
  advisor: item.advisor || "",
  institution: item.institution || "",
  period: item.period || "",
  summary: item.summary || "",
  tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
  links: Array.isArray(item.links) ? item.links.map((l) => ({ ...l })) : [],
});

const formToPayload = (f) => ({
  title: f.title.trim(),
  role: f.role.trim() || null,
  advisor: f.advisor.trim() || null,
  institution: f.institution.trim() || null,
  period: f.period.trim() || null,
  summary: f.summary.trim(),
  tags: f.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean),
  links: f.links
    .map((l) => ({ label: l.label.trim(), url: l.url.trim() }))
    .filter((l) => l.label && l.url),
});

const isSeed = (id) => typeof id === "string" && id.startsWith("seed-");

const AdminResearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [me, setMe] = useState(location.state?.user || null);
  const [authChecked, setAuthChecked] = useState(!!location.state?.user);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showNew, setShowNew] = useState(false);

  // Auth gate \u2014 if no user passed via navigation state, verify with backend.
  useEffect(() => {
    if (location.state?.user) return;
    let cancelled = false;
    api
      .get("/auth/me")
      .then((r) => {
        if (cancelled) return;
        if (r.data?.is_admin) {
          setMe(r.data);
          setAuthChecked(true);
        } else {
          navigate("/admin/login", { replace: true, state: { error: "not_admin" } });
        }
      })
      .catch(() => {
        if (!cancelled) navigate("/admin/login", { replace: true });
      });
    return () => {
      cancelled = true;
    };
  }, [navigate, location.state]);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get("/research");
      setItems(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      toast.error("Could not load research items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked) load();
  }, [authChecked]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore
    }
    navigate("/admin/login", { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#3a3a3a]">
        <div className="inline-flex items-center gap-3">
          <Loader2 size={18} className="animate-spin" />
          <span className="font-serif italic text-[16px]">
            Verifying your session…
          </span>
        </div>
      </div>
    );
  }

  const persistFromSeed = async (item) => {
    // Promote a seed item to a real DB row by POSTing it, then return new id.
    const res = await api.post("/research", formToPayload(itemToForm(item)));
    return res.data;
  };

  const handleCreate = async (form) => {
    const payload = formToPayload(form);
    if (!payload.title || !payload.summary) {
      toast.error("Title and summary are required.");
      return false;
    }
    try {
      await api.post("/research", payload);
      toast.success("Research item added.");
      setShowNew(false);
      await load();
      return true;
    } catch (e) {
      toast.error(e?.response?.data?.detail?.[0]?.msg || "Failed to create.");
      return false;
    }
  };

  const handleUpdate = async (id, form) => {
    const payload = formToPayload(form);
    if (!payload.title || !payload.summary) {
      toast.error("Title and summary are required.");
      return false;
    }
    try {
      let realId = id;
      if (isSeed(id)) {
        // Promote: POST a new copy with the edited values, then refresh.
        await api.post("/research", payload);
        toast.success("Saved as new entry (was seeded).");
      } else {
        await api.patch(`/research/${realId}`, payload);
        toast.success("Saved.");
      }
      setEditingId(null);
      await load();
      return true;
    } catch (e) {
      toast.error(e?.response?.data?.detail?.[0]?.msg || "Failed to save.");
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (isSeed(id)) {
      toast.error(
        "Seeded items can't be deleted. Add a new entry to override the list."
      );
      return;
    }
    if (!window.confirm("Delete this research item? This cannot be undone."))
      return;
    try {
      await api.delete(`/research/${id}`);
      toast.success("Deleted.");
      await load();
    } catch (e) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen text-[#1A1A1A]">
      {/* Slim admin header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#E5DFCE]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#3a3a3a] hover:text-[#7A2828] transition-colors"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
          <p className="font-serif text-lg tracking-tight hidden sm:block">
            Admin <span className="text-[#7A2828]">·</span> Research
          </p>
          <div className="flex items-center gap-3">
            {me && (
              <span className="hidden md:inline-flex items-center gap-2 text-[12px] text-[#3a3a3a]">
                {me.picture && (
                  <img
                    src={me.picture}
                    alt=""
                    className="w-6 h-6 rounded-full ring-1 ring-[#D9D4C7]"
                  />
                )}
                <span className="font-mono text-[11px]">{me.email}</span>
              </span>
            )}
            <button
              onClick={load}
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-[#3a3a3a] hover:text-[#1A1A1A]"
              aria-label="Refresh"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-[#7A2828] hover:text-[#1A1A1A]"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 py-12">
        {/* Page heading */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#7A2828] font-medium mb-3">
              Manage Research Experience
            </p>
            <h1 className="font-serif text-[36px] md:text-[48px] leading-[1.05] tracking-tight">
              Add, edit & link your projects.
            </h1>
            <p className="mt-3 text-[14px] text-[#5a5a5a] max-w-2xl">
              Items marked <span className="font-mono text-[#7A2828]">seed</span>{" "}
              are read-only fallback content shipped with the site. Editing one
              creates a fresh database entry; deleting requires creating a real
              entry first.
            </p>
          </div>
          <button
            onClick={() => {
              setShowNew(true);
              setEditingId(null);
            }}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FBF9F4] px-5 py-3 hover:bg-[#7A2828] transition-colors text-[12px] tracking-[0.18em] uppercase font-medium"
          >
            <Plus size={14} /> New entry
          </button>
        </div>

        {/* Add new form */}
        {showNew && (
          <ItemForm
            mode="create"
            initial={emptyForm}
            onCancel={() => setShowNew(false)}
            onSubmit={handleCreate}
          />
        )}

        {/* List */}
        {loading ? (
          <div className="py-20 flex items-center justify-center text-[#5a5a5a]">
            <Loader2 size={18} className="animate-spin mr-2" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <p className="py-20 text-center text-[#5a5a5a] font-serif italic">
            No items yet. Click “New entry” to add one.
          </p>
        ) : (
          <ul className="divide-y divide-[#E5DFCE] border-t border-b border-[#E5DFCE]">
            {items.map((it, idx) => (
              <li key={it.id}>
                {editingId === it.id ? (
                  <div className="py-6">
                    <ItemForm
                      mode="edit"
                      initial={itemToForm(it)}
                      seed={isSeed(it.id)}
                      onCancel={() => setEditingId(null)}
                      onSubmit={(form) => handleUpdate(it.id, form)}
                    />
                  </div>
                ) : (
                  <RowSummary
                    item={it}
                    index={idx}
                    onEdit={() => {
                      setEditingId(it.id);
                      setShowNew(false);
                    }}
                    onDelete={() => handleDelete(it.id)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

// ---------- Row summary (collapsed view) ----------
const RowSummary = ({ item, index, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-6 group">
      <div className="col-span-12 md:col-span-2">
        <p className="font-mono text-[11px] text-[#7A2828]">
          {String(index + 1).padStart(2, "0")} · {item.period || "—"}
        </p>
        {isSeed(item.id) && (
          <span className="inline-block mt-1 text-[10px] tracking-[0.18em] uppercase font-mono px-1.5 py-0.5 border border-[#D9D4C7] text-[#5a5a5a]">
            seed
          </span>
        )}
      </div>
      <div className="col-span-12 md:col-span-7">
        <h3 className="font-serif text-[19px] leading-snug tracking-tight">
          {item.title}
        </h3>
        {item.role && (
          <p className="font-serif italic text-[13px] text-[#3a3a3a] mt-0.5">
            {item.role}
            {item.institution ? ` · ${item.institution}` : ""}
          </p>
        )}
        {Array.isArray(item.links) && item.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {item.links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[12px] text-[#1A1A1A] hover:text-[#7A2828]"
              >
                {l.label}
                <ExternalLink size={11} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-3 flex items-start md:justify-end gap-2">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase border border-[#1A1A1A] px-3 py-2 hover:bg-[#1A1A1A] hover:text-[#FBF9F4] transition-colors"
        >
          <Pencil size={12} /> Edit
        </button>
        <button
          onClick={onDelete}
          className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase border px-3 py-2 transition-colors ${
            isSeed(item.id)
              ? "border-[#D9D4C7] text-[#9a9a9a] cursor-not-allowed"
              : "border-[#7A2828] text-[#7A2828] hover:bg-[#7A2828] hover:text-[#FBF9F4]"
          }`}
          disabled={isSeed(item.id)}
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
};

// ---------- Edit/Create form ----------
const ItemForm = ({ mode, initial, seed, onCancel, onSubmit }) => {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const updateLink = (idx, key) => (e) => {
    const next = form.links.map((l, i) =>
      i === idx ? { ...l, [key]: e.target.value } : l
    );
    setForm({ ...form, links: next });
  };
  const addLink = () =>
    setForm({ ...form, links: [...form.links, { label: "", url: "" }] });
  const removeLink = (idx) =>
    setForm({ ...form, links: form.links.filter((_, i) => i !== idx) });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const ok = await onSubmit(form);
    setBusy(false);
    if (ok && mode === "create") setForm(emptyForm);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-[#F5F1E6]/60 border border-[#E5DFCE] p-6 md:p-8 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#7A2828] font-medium">
          {mode === "create" ? "New entry" : seed ? "Edit (seed → DB)" : "Edit entry"}
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="text-[#5a5a5a] hover:text-[#1A1A1A]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {seed && (
        <p className="text-[12px] text-[#5a5a5a] italic mb-5">
          Saving will create a brand-new database entry (the original seed item
          will still appear until your DB has full content).
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Field label="Title *" value={form.title} onChange={change("title")} />
        <Field label="Role" value={form.role} onChange={change("role")} />
        <Field label="Advisor" value={form.advisor} onChange={change("advisor")} />
        <Field
          label="Institution"
          value={form.institution}
          onChange={change("institution")}
        />
        <Field label="Period" value={form.period} onChange={change("period")} />
        <Field
          label="Tags (comma-separated)"
          value={form.tags}
          onChange={change("tags")}
        />
      </div>

      <Field
        label="Summary *"
        value={form.summary}
        onChange={change("summary")}
        textarea
      />

      {/* Links editor */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium">
            Links
          </p>
          <button
            type="button"
            onClick={addLink}
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[#7A2828] hover:text-[#1A1A1A]"
          >
            <Plus size={12} /> Add link
          </button>
        </div>

        {form.links.length === 0 ? (
          <p className="text-[13px] text-[#5a5a5a] italic">
            No links yet. Add a paper, code repo, slides, or project page.
          </p>
        ) : (
          <ul className="space-y-3">
            {form.links.map((l, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-3 items-end"
              >
                <div className="col-span-12 md:col-span-3">
                  <Field
                    label={`Label ${i + 1}`}
                    value={l.label}
                    onChange={updateLink(i, "label")}
                    placeholder="Paper"
                    compact
                  />
                </div>
                <div className="col-span-11 md:col-span-8">
                  <Field
                    label="URL"
                    value={l.url}
                    onChange={updateLink(i, "url")}
                    placeholder="https://…"
                    compact
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="text-[#7A2828] hover:text-[#1A1A1A] p-2"
                    aria-label="Remove link"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-7 mt-6 border-t border-[#E5DFCE]">
        <button
          type="button"
          onClick={onCancel}
          className="text-[12px] tracking-[0.18em] uppercase text-[#5a5a5a] hover:text-[#1A1A1A] px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FBF9F4] px-5 py-3 hover:bg-[#7A2828] transition-colors text-[12px] tracking-[0.18em] uppercase font-medium disabled:opacity-50"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {mode === "create" ? "Create entry" : seed ? "Save as new" : "Save changes"}
        </button>
      </div>
    </form>
  );
};

const Field = ({ label, value, onChange, textarea, placeholder, compact }) => (
  <label className="block">
    <span className="block text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a] mb-2">
      {label}
    </span>
    {textarea ? (
      <textarea
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border border-[#C9C2AE] focus:border-[#1A1A1A] outline-none px-3 py-2 text-[15px] resize-vertical transition-colors"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border border-[#C9C2AE] focus:border-[#1A1A1A] outline-none px-3 ${
          compact ? "py-1.5 text-[14px]" : "py-2 text-[15px]"
        } transition-colors`}
      />
    )}
  </label>
);

export default AdminResearch;
