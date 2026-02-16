"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const noise = (x: number, y: number, t: number): number => {
      return (
        Math.sin(x * 0.01 + t * 0.4) *
          Math.cos(y * 0.012 + t * 0.3) *
          0.5 +
        Math.sin(x * 0.008 - t * 0.2 + y * 0.006) * 0.3 +
        Math.cos(y * 0.015 + t * 0.5 + x * 0.004) * 0.2
      );
    };

    const animate = () => {
      time += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === Subtle dot grid ===
      ctx.fillStyle = "rgba(6, 182, 212, 0.04)";
      const gridSize = 50;
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          const dist = Math.hypot(mouseRef.current.x - x, mouseRef.current.y - y);
          const proximity = Math.max(0, 1 - dist / 300);
          const size = 0.8 + proximity * 2.5;
          const alpha = 0.03 + proximity * 0.15;
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === Aurora bands (more visible) ===
      const bands = 5;
      for (let b = 0; b < bands; b++) {
        ctx.beginPath();
        const baseY = canvas.height * (0.15 + b * 0.18);
        const phaseOffset = b * 1.2;

        ctx.moveTo(-10, baseY);
        for (let x = -10; x <= canvas.width + 10; x += 3) {
          const n = noise(x + phaseOffset * 100, baseY, time + phaseOffset);
          const y = baseY + n * 150 + Math.sin(x * 0.002 + time * 1.5 + b) * 50;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width + 10, canvas.height + 10);
        ctx.lineTo(-10, canvas.height + 10);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, baseY - 150, 0, baseY + 250);
        const hue1 = 180 + b * 10 + Math.sin(time * 0.8 + b) * 15;
        const hue2 = 195 + b * 8 + Math.cos(time * 0.6 + b) * 12;
        gradient.addColorStop(0, `hsla(${hue1}, 80%, 50%, 0)`);
        gradient.addColorStop(0.2, `hsla(${hue1}, 75%, 50%, ${0.04 + b * 0.008})`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 45%, ${0.06 + b * 0.005})`);
        gradient.addColorStop(0.8, `hsla(${hue2}, 65%, 40%, ${0.03 + b * 0.005})`);
        gradient.addColorStop(1, `hsla(${hue2}, 80%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // === Floating orbs (bigger, brighter) ===
      const orbs = [
        { cx: 0.15, cy: 0.25, r: 350, speed: 0.5, hue: 185, alpha: 0.1 },
        { cx: 0.75, cy: 0.55, r: 300, speed: 0.4, hue: 195, alpha: 0.08 },
        { cx: 0.45, cy: 0.1, r: 250, speed: 0.6, hue: 175, alpha: 0.07 },
        { cx: 0.85, cy: 0.2, r: 200, speed: 0.7, hue: 205, alpha: 0.06 },
        { cx: 0.3, cy: 0.75, r: 280, speed: 0.45, hue: 190, alpha: 0.08 },
      ];

      orbs.forEach((orb) => {
        const ox =
          canvas.width * orb.cx +
          Math.sin(time * orb.speed) * 120 +
          Math.cos(time * orb.speed * 0.6) * 60;
        const oy =
          canvas.height * orb.cy +
          Math.cos(time * orb.speed * 0.7) * 90 +
          Math.sin(time * orb.speed * 0.4) * 50;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        const hueShift = Math.sin(time * 0.5) * 15;
        grad.addColorStop(0, `hsla(${orb.hue + hueShift}, 80%, 55%, ${orb.alpha})`);
        grad.addColorStop(0.4, `hsla(${orb.hue + hueShift}, 70%, 45%, ${orb.alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 60%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // === Mouse glow (follows cursor) ===
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        mouseGrad.addColorStop(0, "rgba(6, 182, 212, 0.06)");
        mouseGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
        mouseGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      // === Occasional shooting stars ===
      const starChance = Math.sin(time * 3) * 0.5 + 0.5;
      if (starChance > 0.995) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.5;
        const length = 80 + Math.random() * 120;
        const angle = Math.PI * 0.15 + Math.random() * 0.2;

        const starGrad = ctx.createLinearGradient(
          sx, sy,
          sx + Math.cos(angle) * length,
          sy + Math.sin(angle) * length
        );
        starGrad.addColorStop(0, "rgba(6, 182, 212, 0.4)");
        starGrad.addColorStop(0.3, "rgba(6, 182, 212, 0.15)");
        starGrad.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(angle) * length, sy + Math.sin(angle) * length);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
