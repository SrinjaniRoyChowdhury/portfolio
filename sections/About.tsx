"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "roysrinjani04@gmail.com";

const ease = [0.22, 1, 0.36, 1] as const;

const cardReveal = {
  hidden: { y: 20 },
  show: {
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-black text-white overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-14">
        <h2 className="text-heading">About Me</h2>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[15rem]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div
            variants={cardReveal}
            className="md:col-span-3 md:row-span-2"
          >
            <BentoCard className="h-full flex flex-col p-4 sm:p-5">
              <div className="relative flex min-h-[140px] flex-1 items-center justify-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(155,93,224,0.18),transparent_58%)]" />
                <CodeWindow />
              </div>
              <div className="relative mt-4">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  Hi, I&apos;m Srinjani
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-300">
                  Over the last few years I’ve grown as an AI engineer and full-stack developer, I
                  care about shipping things that work — clean interfaces,
                  solid APIs, and AI features that feel useful, not gimmicky.
                </p>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div variants={cardReveal} className="md:col-span-3">
            <BentoCard className="h-full min-h-[15rem] border-white/12 bg-[#26262c] p-4 sm:p-5">
              <div className="relative z-10 flex h-full max-w-[18rem] flex-col justify-center pr-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-purple-300/80">
                  Time zone
                </p>
                <h3 className="mt-1.5 text-lg sm:text-xl font-semibold tracking-tight">
                  Based in Kolkata, India
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  I work in IST (UTC+5:30), and I&apos;m open to collaborating
                  with teams across India and worldwide — remote or in person.
                </p>
                <LiveIstClock />
              </div>
              <WireGlobe />
            </BentoCard>
          </motion.div>

          <motion.div variants={cardReveal} className="md:col-span-3">
            <BentoCard className="h-full min-h-[15rem] overflow-hidden border-transparent bg-gradient-to-br from-[#5C3D9A] via-[#4A3A8C] to-[#343A72] p-5 sm:p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h3 className="max-w-[16rem] text-xl sm:text-2xl font-semibold leading-snug tracking-tight">
                  Have an idea? Let&apos;s talk.
                </h3>
                <CopyEmailButton />
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CodeWindow() {
  return (
    <div
      className="relative w-[88%] max-w-sm"
      style={{
        transform: "perspective(900px) rotateX(8deg) rotateY(-16deg)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#4E56C0]/25 via-[#9B5DE0]/20 to-[#D78FEE]/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#08080d] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10px] text-white/35">
            agent.ts
          </span>
        </div>
        <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-5 sm:text-[11px]">
          <code>
            <span className="block">
              <Kw>async function</Kw> <Fn>buildAgent</Fn>
              <Op>() {"{"}</Op>
            </span>
            <span className="block">
              {"  "}
              <Kw>const</Kw> rag = <Kw>await</Kw> <Fn>retrieve</Fn>
              <Op>(query);</Op>
            </span>
            <span className="block">
              {"  "}
              <Kw>return</Kw> <Fn>streamChat</Fn>
              <Op>({"{"}</Op>
            </span>
            <span className="block">
              {"    "}
              model: <Str>&quot;llama-3.1&quot;</Str>
              <Op>,</Op>
            </span>
            <span className="block">
              {"    "}
              context: rag
              <Op>,</Op>
            </span>
            <span className="block">
              {"  "}
              <Op>{"});"}</Op>
            </span>
            <span className="block">
              <Op>{"}"}</Op>
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-[#C4B5FD]">{children}</span>;
}

function Fn({ children }: { children: ReactNode }) {
  return <span className="text-[#7DD3FC]">{children}</span>;
}

function Str({ children }: { children: ReactNode }) {
  return <span className="text-[#86EFAC]">{children}</span>;
}

function Op({ children }: { children: ReactNode }) {
  return <span className="text-white/55">{children}</span>;
}

function formatIstTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function subscribeIstClock(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function LiveIstClock() {
  const time = useSyncExternalStore(
    subscribeIstClock,
    formatIstTime,
    () => "",
  );

  if (!time) return null;

  return (
    <p className="mt-3 text-sm font-medium text-[#D78FEE]">
      Local time · {time} IST
    </p>
  );
}

function WireGlobe() {
  const reduceMotion = useReducedMotion();
  const meridians = [22.5, 45, 67.5, 90, 112.5, 135, 157.5];
  const parallels = [-60, -40, -20, 20, 40, 60, 80];

  return (
    <div className="pointer-events-none absolute -right-10 top-1/2 size-40 -translate-y-1/2 sm:size-48 lg:-right-6">
      <div className="absolute inset-6 rounded-full bg-[#9B5DE0]/25 blur-3xl" />
      <div
        className="relative size-full"
        style={{ perspective: 700 }}
      >
        <div className="absolute inset-[12%] rounded-full border border-purple-200/25 shadow-[inset_-18px_-10px_40px_rgba(0,0,0,0.55),inset_12px_8px_24px_rgba(215,143,238,0.12)]" />
        <motion.div
          className="absolute inset-[12%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={reduceMotion ? undefined : { rotateY: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "linear" }
          }
        >
          {meridians.map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 rounded-full border border-purple-200/20"
              style={{ transform: `rotateY(${deg}deg)` }}
            />
          ))}
          {parallels.map((lat) => (
            <div
              key={lat}
              className="absolute inset-0 rounded-full border border-purple-300/15"
              style={{ transform: `rotateX(${lat}deg)` }}
            />
          ))}
        </motion.div>
        <span className="absolute left-[58%] top-[46%] size-2.5 rounded-full bg-[#D78FEE] shadow-[0_0_16px_rgba(215,143,238,0.9)]" />
      </div>
    </div>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      const input = document.createElement("textarea");
      input.value = CONTACT_EMAIL;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-label={copied ? "Email copied" : `Copy email address ${CONTACT_EMAIL}`}
      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/55"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Email Copied" : "Copy Email Address"}
    </button>
  );
}
