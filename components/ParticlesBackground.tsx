"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasElement = canvas;
    const context = ctx;

    let particles: Particle[] = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];
    let cssWidth = 0;
    let cssHeight = 0;

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * cssWidth;
        this.y = Math.random() * cssHeight;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.fillStyle = this.color;
        context.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = cssWidth;
        if (this.x > cssWidth) this.x = 0;
        if (this.y < 0) this.y = cssHeight;
        if (this.y > cssHeight) this.y = 0;

        this.draw();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleResize() {
      const parent = canvasElement.parentElement;
      const width = parent?.clientWidth || 0;
      const height = parent?.clientHeight || 0;
      if (width < 2 || height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = width;
      cssHeight = height;

      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    handleResize();

    const parent = canvasElement.parentElement;
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(handleResize) : null;
    if (parent) resizeObserver?.observe(parent);
    window.addEventListener("resize", handleResize);

    let animationId = 0;

    function animate() {
      context.clearRect(0, 0, cssWidth, cssHeight);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
