"use client";

import { ReactNode, useEffect, useRef } from "react";

type Point = { x: number; y: number };

function sizeCanvas(canvas: HTMLCanvasElement, host: HTMLElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = host.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function fadeCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  hold: number,
) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = `rgba(0, 0, 0, ${hold})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function stamp(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "rgba(128, 128, 128, 1)");
  gradient.addColorStop(0.12, "rgba(128, 128, 128, 1)");
  gradient.addColorStop(0.28, "rgba(128, 128, 128, 0.7)");
  gradient.addColorStop(0.55, "rgba(128, 128, 128, 0.2)");
  gradient.addColorStop(1, "rgba(128, 128, 128, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export default function DesatTrail({
  children,
  className,
  fadeIndex,
  isolate = true,
  intensity = "normal",
}: {
  children?: ReactNode;
  className?: string;
  fadeIndex?: number;
  isolate?: boolean;
  intensity?: "normal" | "strong";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brush = useRef<Point | null>(null);
  const lastBrush = useRef<Point | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const radius = intensity === "strong" ? 118 : 78;
    const hold = intensity === "strong" ? 0.994 : 0.986;

    const paintPoint = (client: Point) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = host.getBoundingClientRect();
      stamp(ctx, client.x - rect.left, client.y - rect.top, radius);
    };

    sizeCanvas(canvas, host);
    let frame = 0;

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) fadeCanvas(canvas, ctx, hold);

      const point = brush.current;
      if (point) {
        const prev = lastBrush.current;
        if (prev) {
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const dist = Math.hypot(dx, dy);
          const steps = Math.max(1, Math.ceil(dist / 10));
          for (let i = 1; i <= steps; i++) {
            paintPoint({
              x: prev.x + (dx * i) / steps,
              y: prev.y + (dy * i) / steps,
            });
          }
        } else {
          paintPoint(point);
        }
        lastBrush.current = point;
      }

      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      brush.current = { x: event.clientX, y: event.clientY };
    };

    const onLeave = () => {
      brush.current = null;
      lastBrush.current = null;
    };

    const onResize = () => sizeCanvas(canvas, host);

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={hostRef}
      data-fade-item={fadeIndex != null ? "" : undefined}
      data-fade-index={fadeIndex}
      className={`${isolate ? "home-desat-scope" : ""} ${className ?? ""}`.trim()}
    >
      {children}
      <canvas ref={canvasRef} className="home-desat-trail" aria-hidden="true" />
    </div>
  );
}
