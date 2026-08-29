"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import astra from "@/public/assests/Astra.png";
import { CONTACT_EMAIL, parseContactPayload } from "@/lib/contact";

const ease = [0.22, 1, 0.36, 1] as const;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const parsed = parseContactPayload(form);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error || "Unable to send message right now.");
        return;
      }

      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
      setError("Unable to send message right now.");
    }
  }

  const mailtoFallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    form.subject || "Portfolio message",
  )}&body=${encodeURIComponent(
    `From: ${form.name || "Visitor"}${form.email ? ` (${form.email})` : ""}\n\n${form.message}`,
  )}`;

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <ParticlesBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base text-[#ebaee9] sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
          >
            Have a role, a project, or just a hello in mind? Send a message and
            I&apos;ll get back to you.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease }}
          >
            <div
              className="pointer-events-none absolute inset-8 rounded-full bg-[#9B5DE0]/20 blur-3xl"
              aria-hidden
            />
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -22, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src={astra}
                alt="Astra, a guitar-playing astronaut"
                className="relative h-[min(46vh,340px)] w-auto select-none object-contain sm:h-[min(50vh,400px)] lg:h-[min(58vh,480px)]"
                priority={false}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:p-7">
              {status === "sent" ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <span className="rounded-full bg-[#9B5DE0]/20 p-3 text-[#D78FEE]">
                    <Check className="size-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-300">
                    Thanks for reaching out. I&apos;ll read your note and get
                    back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-[#D78FEE] hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="contact-name"
                      label="Name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(value) => updateField("name", value)}
                      maxLength={80}
                      required
                    />
                    <Field
                      id="contact-email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(value) => updateField("email", value)}
                      maxLength={120}
                      required
                    />
                  </div>

                  <Field
                    id="contact-subject"
                    label="Subject"
                    value={form.subject}
                    onChange={(value) => updateField("subject", value)}
                    maxLength={120}
                    placeholder="What’s this about?"
                  />

                  <Field
                    id="contact-message"
                    label="Message"
                    value={form.message}
                    onChange={(value) => updateField("message", value)}
                    maxLength={2000}
                    required
                    multiline
                    placeholder="Tell me a little about the role, project, or idea."
                  />

                  <div
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(event) =>
                        updateField("website", event.target.value)
                      }
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-rose-300" role="alert">
                      {error}{" "}
                      <a
                        href={mailtoFallback}
                        className="underline decoration-rose-300/50 underline-offset-2 hover:text-white"
                      >
                        Email me instead
                      </a>
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9B5DE0] to-[#4E56C0] px-6 py-3 text-base font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 mt-16 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-white/50 sm:flex-row sm:items-center sm:px-6 sm:text-left lg:px-8">
          <p className="shrink-0">
            © {new Date().getFullYear()} Srinjani Roy Chowdhury
          </p>
          <p className="min-w-0 sm:text-right">
            Crafted with code, curiosity &amp; coffee
          </p>
        </div>
      </footer>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  required,
  multiline,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
}) {
  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#9B5DE0]/60 focus:ring-2 focus:ring-[#9B5DE0]/20";

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-gray-300">
        {label}
        {required ? <span className="text-[#D78FEE]"> *</span> : null}
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={6}
          value={value}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} min-h-[8.5rem] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}
