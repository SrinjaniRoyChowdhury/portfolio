"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvaRef.current;

    if (!canvas) return;

    const canvasElement = canvas;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    const context = ctx;

    let particles: Particle[] = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvasElement.width;
        this.y = Math.random() * canvasElement.height;
        this.radius = Math.random() * 2 + 1;
        this.color =
          colors[Math.floor(Math.random() * colors.length)];
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

        if (this.x < 0) this.x = canvasElement.width;
        if (this.x > canvasElement.width) this.x = 0;
        if (this.y < 0) this.y = canvasElement.height;
        if (this.y > canvasElement.height) this.y = 0;

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
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      if (width === canvasElement.width && height === canvasElement.height) {
        return;
      }
      canvasElement.width = width;
      canvasElement.height = height;
      createParticles();
    }

    handleResize();
    const parent = canvasElement.parentElement;
    const resizeObserver =
      parent && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;
    resizeObserver?.observe(parent);
    window.addEventListener("resize", handleResize);

    let animationId: number;

    function animate() {
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
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
    <canvas
      ref={canvaRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}