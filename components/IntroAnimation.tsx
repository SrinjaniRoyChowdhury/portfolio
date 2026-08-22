"use client";

import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Noto_Sans_Bengali, Noto_Sans_Devanagari } from "next/font/google";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["700"],
  variable: "--font-noto-bengali",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700"],
  variable: "--font-noto-devanagari",
});

export default function IntroAnimation({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  const greetings = useMemo(
    () => [
      "Hello",
      "नमस्ते",
      "Hola",
      "Bonjour",
      "Ciao",
      "Olá",
      "Здравствуйте",
      "Merhaba",
      "Γειά",
      "Hej",
      "Salam",
      "Hallo",
      "নমস্কার",
    ],
    [],
  );
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 120);

      return () => clearTimeout(id);
    }

    const t = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 1500);
    return () => clearTimeout(t);
  }, [index, greetings.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${notoBengali.variable} ${notoDevanagari.variable} fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden`}
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            style={{
              fontFamily:
                "var(--font-roboto), var(--font-noto-devanagari), var(--font-noto-bengali), sans-serif",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.08 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
