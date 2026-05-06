"use client";

import { useEffect, useRef } from "react";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const hintRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    const hint   = hintRef.current;
    if (!cursor || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top  = my + "px";
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // hover states
    const addHover = () => {
      document.querySelectorAll<HTMLElement>("a, .tag, .monogram, .status-badge, strong").forEach(el => {
        el.addEventListener("mouseenter", () => {
          ring.classList.add("hovering");
          if (el.tagName === "A") ring.classList.add("on-link");
        });
        el.addEventListener("mouseleave", () => ring.classList.remove("hovering", "on-link"));
      });
    };
    addHover();

    // ripple
    const onClick = (e: MouseEvent) => {
      const size = 120;
      const el = document.createElement("div");
      el.className = "ripple";
      el.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - size / 2}px;top:${e.clientY - size / 2}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    };
    document.addEventListener("click", onClick);

    // scroll hint
    const onScroll = () => {
      if (!hint) return;
      window.scrollY > 60 ? hint.classList.add("hidden") : hint.classList.remove("hidden");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor"      ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="scroll-hint" ref={hintRef}>
        <div className="scroll-line" />
        scroll
      </div>
      {children}
    </>
  );
}