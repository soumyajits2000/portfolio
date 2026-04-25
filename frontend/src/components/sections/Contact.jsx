import React, { useState } from "react";
import { Mail, Github, Linkedin, FileText, MapPin } from "lucide-react";
import { toast } from "sonner";
import { profile } from "../../data/mock";
import { SectionTitle } from "./About";
import { api } from "../../lib/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSending(true);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Thank you. Your message has been received.");
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Please check your inputs.");
    } finally {
      setSending(false);
    }
  };

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="09 — Contact" title="Get in touch." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="font-serif text-[20px] leading-[1.6] text-[#2c2c2c] mb-8 text-pretty">
            I welcome correspondence on collaborations, postdoctoral interests, talks, and student mentorship in 2D nanoelectronics.
          </p>

          <ul className="space-y-4">
            <ContactRow icon={<Mail size={15} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow icon={<MapPin size={15} />} label="Office" value={profile.location} />
            <ContactRow icon={<Github size={15} />} label="GitHub" value="@soumyajits2000" href={profile.github} />
            <ContactRow icon={<Linkedin size={15} />} label="LinkedIn" value="in/soumyajitsamal" href={profile.linkedin} />
            <ContactRow icon={<FileText size={15} />} label="CV" value="Download (PDF)" href={profile.cvUrl} />
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 lg:pl-12 lg:border-l border-[#E5DFCE] space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Name" value={form.name} onChange={onChange("name")} />
            <Field label="Email" type="email" value={form.email} onChange={onChange("email")} />
          </div>
          <Field label="Subject" value={form.subject} onChange={onChange("subject")} />
          <Field label="Message" textarea value={form.message} onChange={onChange("message")} />

          <div className="flex items-center justify-between pt-2">
            <p className="text-[12px] text-[#5a5a5a]">
              Messages are securely received over our API.
            </p>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FBF9F4] px-6 py-3 hover:bg-[#7A2828] transition-colors text-[12px] tracking-[0.18em] uppercase font-medium disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const ContactRow = ({ icon, label, value, href }) => (
  <li className="flex items-start gap-4">
    <span className="mt-1 text-[#7A2828]">{icon}</span>
    <div>
      <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">{label}</p>
      {href ? (
        <a href={href} className="link-underline text-[#1A1A1A]">{value}</a>
      ) : (
        <p className="text-[#1A1A1A]">{value}</p>
      )}
    </div>
  </li>
);

const Field = ({ label, value, onChange, type = "text", textarea }) => (
  <label className="block">
    <span className="block text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a] mb-2">
      {label}
    </span>
    {textarea ? (
      <textarea
        rows={5}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-[#C9C2AE] focus:border-[#1A1A1A] outline-none py-2 text-[15px] resize-none transition-colors"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-[#C9C2AE] focus:border-[#1A1A1A] outline-none py-2 text-[15px] transition-colors"
      />
    )}
  </label>
);

export default Contact;
