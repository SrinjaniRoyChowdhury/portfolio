"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Certificates", href: "#certificates", id: "certificates" },
  { name: "Contact", href: "#contact", id: "contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);

    function sectionAtViewport() {
      const probe = window.innerHeight * 0.28;
      let current = "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - probe <= 0) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (atBottom) return "contact";
      if (window.scrollY < 40) return "hero";
      return current;
    }

    function update() {
      setScrolled(window.scrollY > 20);
      setActiveId(sectionAtViewport());
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function goToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const id = href.replace("#", "") || "hero";
    const el = document.getElementById(id);

    setMobileMenuOpen(false);
    setActiveId(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-16 flex items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2.5" onClick={(event) => goToSection(event, "#hero")}>
          <Image
            src="/assests/logo.png"
            alt="Srinjani logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
            priority
          />
          <span className="text-2xl font-bold tracking-tight">
            Srinjani<span className="text-white">.dev</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => goToSection(event, link.href)}
              aria-current={activeId === link.id ? "page" : undefined}
              className={cn(
                "relative py-2 text-base font-semibold transition-colors",
                activeId === link.id
                  ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#D78FEE]"
                  : "text-white/65 hover:text-white",
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => goToSection(event, link.href)}
              aria-current={activeId === link.id ? "page" : undefined}
              className={cn(
                "rounded-lg py-2 text-lg font-medium transition-colors",
                activeId === link.id
                  ? "text-white"
                  : "text-white/65 hover:text-white",
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
