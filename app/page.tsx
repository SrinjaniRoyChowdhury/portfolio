"use client";

import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroAnimation onFinish={() => setIntroDone(true)} />
      {introDone && <Navbar />}
      <div className="relative gradient text-white">
        <Hero ready={introDone} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
