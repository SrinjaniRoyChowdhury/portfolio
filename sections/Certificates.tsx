"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { defaultCertificates } from "@/lib/content-defaults";

const ease = [0.22, 1, 0.36, 1] as const;

function CertificateCard({ item }: { item: LogoItem }) {
  if (!("src" in item)) return null;

  const inner = (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-lg">
      <img
        src={item.src}
        alt={item.alt ?? item.title ?? ""}
        title={item.title}
        className="block h-[var(--logoloop-logoHeight)] w-auto object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );

  if (!item.href) return inner;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={item.title ?? item.alt ?? "Certificate"}
      className="inline-flex rounded-xl transition-opacity duration-200 hover:opacity-90"
    >
      {inner}
    </a>
  );
}

/** Certificates list: lib/content-defaults.ts */
export default function Certificates() {
  const certificates = defaultCertificates;
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "left",
  );

  const logos: LogoItem[] = certificates.map((item) => ({
    src: item.src,
    alt: item.title,
    title: item.title,
    href: item.src,
  }));

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("left");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("right");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="certificates"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 text-center sm:px-6 md:pt-20 lg:px-8">
        <motion.h2
          className="text-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          Certificates
        </motion.h2>

        <motion.p
          className="mt-3 text-base text-[#ebaee9] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
        >
          Courses, hackathons, and programs I&apos;ve completed
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 mt-10 w-full"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease }}
      >
        <LogoLoop
          logos={logos}
          speed={50}
          direction={scrollDirection}
          logoHeight={176}
          gap={20}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Certificates"
          renderItem={(item) => <CertificateCard item={item} />}
        />
      </motion.div>

      <div className="h-14 md:h-16" />
    </section>
  );
}
