"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Illustration() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [monoText, setMonoText] = useState("ss");

  useEffect(() => {
    const wrap = wrapRef.current;

    // parallax
    const onMove = (e: MouseEvent) => {
      if (!wrap) return;
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      wrap.style.transform = `translate(${dx * 12}px, ${dy * 10}px)`;
    };
    document.addEventListener("mousemove", onMove);

    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  const handleMonoEnter = () => {
    const variants = ["s", "a", "b", "i", "n", "s", "h", "r", "e", "s", "t", "h","a"];
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      setMonoText(variants[idx]);
      if (idx >= variants.length - 1) clearInterval(iv);
    }, 180);
  };

  return (
    <aside className="sticky top-0 hidden h-screen items-center justify-center md:flex md:px-10">
      <div
        ref={wrapRef}
        className="relative flex items-center justify-center"
        style={{ width: 380, height: 380, transition: "transform 0.4s ease" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── outermost ambient glow ── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 380, height: 380,
            background: "radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)",
            transition: "opacity 0.6s ease",
            opacity: hovered ? 1 : 0.5,
          }}
        />

        {/* ── rotating dashed ring ── */}
        <div
          className="absolute rounded-full border border-dashed pointer-events-none"
          style={{
            width: 340, height: 340,
            borderColor: "rgba(22,163,74,0.2)",
            animation: "spinSlow 24s linear infinite",
            transition: "border-color 0.4s",
            ...(hovered && { borderColor: "rgba(22,163,74,0.4)" }),
          }}
        />

        {/* ── solid ring ── */}
        <div
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: 300, height: 300,
            borderColor: "rgba(0,0,0,0.06)",
            transition: "transform 0.8s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* ── inner accent ring ── */}
        <div
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: 220, height: 220,
            borderColor: "rgba(37,99,235,0.08)",
            animation: "spinSlow 18s linear infinite reverse",
          }}
        />

        {/* ── dot grid backdrop ── */}
        <div
          className="absolute rounded-full pointer-events-none overflow-hidden"
          style={{ width: 300, height: 300, opacity: 0.35 }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        {/* ── orbiting dots ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* green */}
          <div
            className="absolute rounded-full"
            style={{
              width: 9, height: 9,
              background: "#16a34a",
              top: "50%", left: "50%",
              marginTop: -4.5, marginLeft: -4.5,
              animation: "orbit 8s linear infinite",
              boxShadow: "0 0 6px rgba(22,163,74,0.6)",
            }}
          />
          {/* blue */}
          <div
            className="absolute rounded-full"
            style={{
              width: 6, height: 6,
              background: "#2563eb",
              top: "50%", left: "50%",
              marginTop: -3, marginLeft: -3,
              animation: "orbitSlow 12s linear infinite reverse",
              boxShadow: "0 0 6px rgba(37,99,235,0.6)",
            }}
          />
          {/* pink */}
          <div
            className="absolute rounded-full"
            style={{
              width: 7, height: 7,
              background: "#db2777",
              top: "50%", left: "50%",
              marginTop: -3.5, marginLeft: -3.5,
              animation: "orbit3 16s linear infinite",
              boxShadow: "0 0 6px rgba(219,39,119,0.6)",
            }}
          />
        </div>

        {/* ── photo ── */}
        <div
          className="relative z-10 overflow-hidden rounded-full"
          style={{
            width: 200, height: 200,
            boxShadow: hovered
              ? "0 20px 60px rgba(0,0,0,0.15), 0 0 0 4px rgba(22,163,74,0.15)"
              : "0 8px 32px rgba(0,0,0,0.10), 0 0 0 2px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.5s ease, transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        >
          <Image
            src="/og-image.png"
            alt="Sabin Shrestha"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ── monogram badge ── */}
        <div
          ref={monoRef}
          className="absolute z-20 flex items-center justify-center rounded-full text-white select-none"
          style={{
            width: 44, height: 44,
            bottom: 68, right: 68,
            background: "#0f0f0f",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.8rem",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            cursor: "default",
          }}
          onMouseEnter={handleMonoEnter}
        >
          {monoText}
        </div>

      </div>
    </aside>
  );
}