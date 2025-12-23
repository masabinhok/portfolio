'use client';
import React, { useEffect, useRef } from "react";

// Lightweight snowfall animation using canvas
const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      d: Math.random() * 1 + 0.5,
    }));

    function draw() {
      if (ctx == null) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      for (const flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }

    function update() {
      for (const flake of snowflakes) {
        flake.y += flake.d;
        if (flake.y > height) {
          flake.x = Math.random() * width;
          flake.y = 0;
        }
      }
    }

    let animationId: number;
    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
        if(canvas == null) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default Snowfall;
