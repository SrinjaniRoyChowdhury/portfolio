"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Noto_Sans_Bengali, Noto_Sans_Devanagari } from "next/font/google";
import SpecularButton from "@/components/SpecularButton";

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
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setVisible(false);
    onFinish?.();
  }, [onFinish]);

  useEffect(() => {
    if (finished.current) return;

    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 120);

      return () => clearTimeout(id);
    }

    const t = setTimeout(() => {
      finish();
    }, 1500);
    return () => clearTimeout(t);
  }, [index, greetings.length, finish]);

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

          <div className="absolute bottom-8 right-6 md:right-8">
            <SpecularButton
              size="md"
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
              onClick={finish}
            >
              Skip Intro
            </SpecularButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
