"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import PixelTransition from "@/components/PixelTransition";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import SpecularButton from "@/components/SpecularButton";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import pixelpic from "@/public/assests/pixelpic.png";
import mypic from "@/public/assests/mypic.png";

const socials = [
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/srinjani/",
  },
  {
    Icon: FaGithub,
    label: "Github",
    href: "https://github.com/SrinjaniRoyChowdhury",
  },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },

  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 5px rgba(155, 93, 224, 0.45)) drop-shadow(0 0 12px rgba(215, 143, 238, 0.35))",
  },

  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const leftItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ ready = false }: { ready?: boolean }) {
  const roles = useMemo(
    () => ["AI Engineer", "Full Stack Developer", "Software Developer"],
    [],
  );

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (!ready) return;

    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );

    return () => clearTimeout(timeout);
  }, [ready, subIndex, index, deleting, roles]);

  return (
    <section
      id="hero"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />

      {/* Left glow */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 
        w-[70vw] sm:w-[z-500vw] md:w-[40vw] 
        h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] 
        rounded-full
        bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE]
        opacity-30 sm-opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse"
        ></div>

        {/* Right glow */}
        <div
          className="absolute -bottom-0 -right-0 
        w-[70vw] sm:w-[z-500vw] md:w-[40vw] 
        h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] 
        rounded-full
        bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE]
        opacity-30 sm-opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-500"
        ></div>

        {/* Home content */}
        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center pt-28 pb-28">
          <motion.div
            className="flex flex-col justify-center text-center lg:text-left relative lg:translate-y-4"
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div
              className="w-full lg:pr-24 mx-auto max-w-[43rem]"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.div
                className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
                variants={leftItem}
              >
                <span>{roles[index].substring(0, subIndex)}</span>
                <span
                  className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                  style={{ height: "1em" }}
                ></span>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text
              bg-gradient-to-r from-[#D78FEE] via-[#9B5DE0] to-[#4E56C0] drop-shadow-lg"
                variants={leftItem}
              >
                Hello I'm
                <br />
                <span className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:whitespace-nowrap">
                  Srinjani Roy Chowdhury
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-base sm:text-lg md:text-xl md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
                variants={leftItem}
              >
                I turn ideas into practical solutions, building modern
                applications, reliable backends, and thoughtful AI features that
                solve real problems and make a difference.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-10 flex-wrap items-center justify-center lg-justify-start gap-6"
              variants={leftItem}
            >
              <div className="flex items-center gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full font-medium text-lg text-white
                  bg-gradient-to-r from-[#9B5DE0] to-[#4E56C0]
                  shadow-lg shadow-purple-500/20
                  hover:scale-105 hover:shadow-purple-500/30
                  transition-all duration-300"
                >
                  View My Work
                </a>

                <SpecularButton
                  size="lg"
                  radius={18}
                  tint="#ffffff"
                  tintOpacity={0}
                  blur={0}
                  textColor="#f5f5f5"
                  lineColor="#ffffff"
                  baseColor="#525252"
                  intensity={1}
                  shineSize={10}
                  shineFade={40}
                  thickness={1}
                  speed={0.35}
                  followMouse
                  proximity={250}
                  autoAnimate={false}
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  View Resume
                </SpecularButton>
              </div>
            </motion.div>

            <motion.div
              className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
              variants={leftItem}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  href={href}
                  key={label}
                  target="_blank"
                  aria-label={label}
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={
              ready
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 40, scale: 0.98 }
            }
            transition={{ delay: ready ? 0.2 : 0, duration: 0.8 }}
            className="relative hidden lg:flex h-full items-center justify-end -translate-y-4"
          >
            <PixelTransition
              firstContent={
                <Image
                  src={pixelpic}
                  alt="Pixel portrait of Srinjani"
                  fill
                  priority
                  sizes="(min-width: 1024px) min(32vw, 440px), 0px"
                  className="object-cover select-none [image-rendering:pixelated]"
                />
              }
              secondContent={
                <Image
                  src={mypic}
                  alt="Srinjani Roy Chowdhury"
                  fill
                  sizes="(min-width: 1024px) min(32vw, 440px), 0px"
                  className="object-cover select-none"
                />
              }
              gridSize={10}
              pixelColor="#9B5DE0"
              animationStepDuration={0.4}
              aspectRatio="110.87%"
              className="w-[min(32vw,440px)] cursor-pointer border-0 bg-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
