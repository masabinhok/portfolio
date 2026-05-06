'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;
    
    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = rx + 'px';
      ring!.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, .tag, .monogram, .status-badge, strong').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hovering');
        if (el.tagName === 'A') ring.classList.add('on-link');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hovering', 'on-link');
      });
    });

    // Ripple on click
    document.addEventListener('click', e => {
      const size = 120;
      const el = document.createElement('div');
      el.className = 'ripple';
      el.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - size/2) + 'px;top:' + (e.clientY - size/2) + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    });

    // Illustration parallax
    const illo = document.getElementById('illoWrap');
    document.addEventListener('mousemove', e => {
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      if (illo) illo.style.transform = 'translate(' + (dx * 10) + 'px, ' + (dy * 8) + 'px)';
    });

    // Scroll hint
    const hint = document.getElementById('scrollHint');
    window.addEventListener('scroll', () => {
      if (hint) hint.classList.toggle('hidden', window.scrollY > 60);
    }, { passive: true });

    // Email copy on ctrl+click
    const emailLink = document.getElementById('emailLink');
    const emailText = document.getElementById('emailText');
    if (emailLink && emailText) {
      emailLink.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          navigator.clipboard?.writeText('sabin.shrestha.er@gmail.com').then(() => {
            const orig = emailText.textContent;
            emailText.textContent = 'copied!';
            setTimeout(() => emailText.textContent = orig, 1800);
          });
        }
      });
    }

    // Monogram letter-cycle on hover
    const mono = document.getElementById('monogram');
    const variants = ['ss', 's.s', '∑', 'sb', 'ss'];
    if (mono) {
      mono.addEventListener('mouseenter', () => {
        let idx = 0;
        const interval = setInterval(() => {
          idx++;
          mono.textContent = variants[idx];
          if (idx >= variants.length - 1) clearInterval(interval);
        }, 180);
      });
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #16a34a;
          --green-light: #22c55e;
          --blue: #2563eb;
          --pink: #db2777;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --black: #0f0f0f;
          --bg: #fafaf8;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--black);
          cursor: none;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .cursor {
          position: fixed;
          width: 8px; height: 8px;
          background: var(--black);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: background 0.2s;
        }
        .cursor-ring {
          position: fixed;
          width: 32px; height: 32px;
          border: 1px solid rgba(0,0,0,0.25);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease, border-color 0.3s;
        }
        .cursor-ring.hovering {
          width: 52px; height: 52px;
          border-color: var(--green);
        }
        .cursor-ring.on-link {
          border-color: var(--blue);
        }

        .page-grid {
          display: grid;
          max-width: 1100px;
          margin: 0 auto;
          min-height: 100vh;
          grid-template-columns: 1fr 480px;
          position: relative;
          z-index: 1;
          text-transform: lowercase;
        }

        .content {
          padding: 48px 32px 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 64px;
          max-width: 560px;
        }

        .greeting { display: flex; flex-direction: column; gap: 20px; }

        .hello-line {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--gray-600);
          opacity: 0;
          animation: fadeUp 0.5s 0.1s ease forwards;
          transition: color 0.4s;
        }
        .content:hover .hello-line { color: var(--green); }

        h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 300;
          line-height: 1.2;
          color: var(--black);
          opacity: 0;
          animation: fadeUp 0.6s 0.2s ease forwards;
        }
        h1 strong {
          font-weight: 500;
          position: relative;
          display: inline-block;
        }
        h1 strong::after {
          content: '';
          position: absolute;
          left: 0; bottom: 2px;
          height: 2px; width: 0;
          background: var(--green);
          transition: width 0.6s ease;
          border-radius: 2px;
        }
        h1 strong:hover::after { width: 100%; }

        .bio {
          display: flex; flex-direction: column; gap: 10px;
          opacity: 0;
          animation: fadeUp 0.6s 0.35s ease forwards;
        }
        .bio p { font-size: 0.98rem; line-height: 1.75; color: var(--gray-600); }
        .bio p.accent { color: var(--gray-700); font-weight: 400; }
        .highlight { color: var(--black); font-weight: 500; }

        .tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          opacity: 0;
          animation: fadeUp 0.6s 0.5s ease forwards;
        }
        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          padding: 3px 9px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 100px;
          color: var(--gray-600);
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.6);
          transition: border-color 0.25s, color 0.25s, transform 0.2s, background 0.25s;
          cursor: default;
        }
        .tag:hover {
          border-color: var(--green);
          color: var(--green);
          background: rgba(22,163,74,0.06);
          transform: translateY(-2px);
        }

        .links {
          display: flex; flex-wrap: wrap; gap: 16px;
          opacity: 0;
          animation: fadeUp 0.6s 0.6s ease forwards;
        }
        .link-item {
          position: relative;
          font-size: 0.95rem;
          text-decoration: none;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .link-item.green { color: var(--green); }
        .link-item.blue  { color: var(--blue);  }
        .link-item::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 1px;
          background: currentColor;
          transform: scaleX(1);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .link-item:hover::after { transform: scaleX(0); transform-origin: right; }
        .link-item:hover { opacity: 0.7; }
        .link-item[target="_blank"]::before {
          content: '↗';
          font-size: 0.7em;
          margin-right: 2px;
          opacity: 0;
          display: inline-block;
          transform: translateY(2px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .link-item[target="_blank"]:hover::before {
          opacity: 1;
          transform: translateY(0);
        }

        .contact {
          display: flex; flex-direction: column; gap: 12px;
          border-top: 1px solid rgba(0,0,0,0.07);
          padding-top: 32px;
          opacity: 0;
          animation: fadeUp 0.6s 0.75s ease forwards;
        }
        .contact h2 { font-family: 'DM Sans', sans-serif; font-size: 1.2rem; font-weight: 400; }
        .contact p { font-size: 0.95rem; line-height: 1.7; color: var(--gray-700); }

        .email-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.82rem;
          color: var(--pink);
          text-decoration: none;
          padding: 8px 14px;
          border: 1px solid rgba(219,39,119,0.2);
          border-radius: 6px;
          margin-top: 4px;
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .email-link::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--pink);
          opacity: 0;
          transition: opacity 0.25s;
          z-index: 0;
        }
        .email-link span { position: relative; z-index: 1; transition: color 0.25s; }
        .email-link:hover::before { opacity: 0.06; }
        .email-link:hover {
          border-color: var(--pink);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(219,39,119,0.12);
        }

        aside.illo-aside {
          position: sticky; top: 0;
          height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 32px;
        }

        .illustration-wrap {
          position: relative;
          width: 360px; height: 360px;
          transition: transform 0.3s ease;
        }
        .illo-bg {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px);
          background-size: 20px 20px;
          border-radius: 50%;
          opacity: 0.4;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.8s ease;
        }
        .ring:nth-child(2) { width: 340px; height: 340px; }
        .ring:nth-child(3) { width: 260px; height: 260px; border-color: rgba(22,163,74,0.12); }
        .ring:nth-child(4) { width: 180px; height: 180px; border-color: rgba(37,99,235,0.08); }
        .ring:nth-child(5) { width: 100px; height: 100px; border-color: rgba(219,39,119,0.1); }
        .illustration-wrap:hover .ring:nth-child(2) { transform: rotate(8deg) scale(1.02); }
        .illustration-wrap:hover .ring:nth-child(3) { transform: rotate(-5deg) scale(1.05); }
        .illustration-wrap:hover .ring:nth-child(4) { transform: rotate(12deg) scale(1.08); }
        .illustration-wrap:hover .ring:nth-child(5) { transform: rotate(-15deg) scale(1.12); }

        .monogram {
          position: relative; z-index: 2;
          width: 96px; height: 96px;
          border-radius: 50%;
          background: var(--black);
          color: white;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 1.6rem; font-weight: 300;
          letter-spacing: -0.04em;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: default;
        }
        .illustration-wrap:hover .monogram {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(130px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(130px) rotate(-360deg); }
        }
        @keyframes orbitSlow {
          from { transform: rotate(180deg) translateX(90px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(90px) rotate(-540deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(90deg) translateX(160px) rotate(-90deg); }
          to   { transform: rotate(450deg) translateX(160px) rotate(-450deg); }
        }
        .orbit-dot {
          position: absolute; top: 50%; left: 50%;
          width: 8px; height: 8px; margin: -4px;
          border-radius: 50%;
          animation: orbit 8s linear infinite;
          background: var(--green);
        }
        .orbit-dot-2 {
          position: absolute; top: 50%; left: 50%;
          width: 5px; height: 5px; margin: -2.5px;
          border-radius: 50%;
          animation: orbitSlow 12s linear infinite reverse;
          background: var(--blue);
        }
        .orbit-dot-3 {
          position: absolute; top: 50%; left: 50%;
          width: 6px; height: 6px; margin: -3px;
          border-radius: 50%;
          animation: orbit3 16s linear infinite;
          background: var(--pink);
        }

        .status-badge {
          position: absolute; bottom: 24px; left: 50%;
          transform: translateX(-50%);
          display: flex; align-items: center; gap: 7px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.06em;
          color: var(--gray-600);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,0.08);
          padding: 6px 14px;
          border-radius: 100px;
          white-space: nowrap;
          transition: transform 0.3s ease;
          cursor: default;
        }
        .status-badge:hover { transform: translateX(-50%) translateY(-3px); }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2s ease infinite;
        }

        .scroll-hint {
          position: fixed; bottom: 20px; left: 32px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.1em;
          color: rgba(0,0,0,0.25);
          pointer-events: none;
          transition: opacity 0.4s;
          z-index: 50;
        }
        .scroll-hint.hidden { opacity: 0; }
        .scroll-line {
          width: 24px; height: 1px;
          background: rgba(0,0,0,0.2);
          position: relative; overflow: hidden;
        }
        .scroll-line::after {
          content: '';
          position: absolute; left: -100%; top: 0;
          width: 100%; height: 100%;
          background: var(--black);
          animation: scanLine 2s ease infinite;
        }

        .ripple {
          position: fixed;
          border-radius: 50%;
          transform: scale(0);
          animation: rippleOut 0.6s ease-out forwards;
          pointer-events: none;
          z-index: 100;
          background: rgba(22,163,74,0.15);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes scanLine {
          from { left: -100%; }
          to   { left: 100%; }
        }
        @keyframes rippleOut {
          to { transform: scale(1); opacity: 0; }
        }

        @media (max-width: 768px) {
          .page-grid { grid-template-columns: 1fr; }
          aside.illo-aside { display: none; }
          .content { padding: 36px 20px; }
        }
      `}</style>

      {/* Cursor */}
      <div className="cursor" id="cursor" style={{ left: "-100px", top: "-100px" }} />
      <div className="cursor-ring" id="cursorRing" style={{ left: "-100px", top: "-100px" }} />

      {/* Scroll hint */}
      <div className="scroll-hint" id="scrollHint">
        <div className="scroll-line" />
        scroll
      </div>

      <main className="page-grid">
        <section className="content">
          <div className="greeting">
            <span className="hello-line">// portfolio.tsx</span>

            <h1>hi, i am <strong>sabin shrestha</strong></h1>

            <div className="bio">
              <p>
                a computer science student from nepal who enjoys{" "}
                <span className="highlight">designing systems</span>, working with{" "}
                <span className="highlight">databases</span>, and building products
                that are simple to use and reliable underneath.
              </p>
              <p className="accent">i build software applications.</p>
              <p>
                currently exploring <span className="highlight">sql</span>,{" "}
                <span className="highlight">multi-tenant saas</span>, and{" "}
                <span className="highlight">event-driven systems</span>.
              </p>
            </div>

            <div className="tags">
              {["typescript", "postgresql", "next.js", "node.js", "systems design", "saas"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="links">
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://github.com/masabinhok">github</a>
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://github.com/masabinhok">resume</a>
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sabinshresthaa/">linkedin</a>
              <Link className="link-item blue" href="/projects">projects</Link>
              <Link className="link-item blue" href="/blogs">blogs</Link>
            </div>
          </div>

          <section className="contact">
            <h2>get in touch</h2>
            <p>for internships, collaboration, freelance work, or just to talk about systems and product ideas.</p>
            <a href="mailto:sabin.shrestha.er@gmail.com" className="email-link" id="emailLink" title="click to open • ctrl+click to copy">
              <span>✉</span>
              <span id="emailText">sabin.shrestha.er@gmail.com</span>
            </a>
          </section>
        </section>

        <aside className="illo-aside">
          <div className="illustration-wrap" id="illoWrap">
            <div className="illo-bg">
              <div className="orbit-dot" />
              <div className="orbit-dot-2" />
              <div className="orbit-dot-3" />
              <img src="/fl-cut-2.png" alt="" />
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}