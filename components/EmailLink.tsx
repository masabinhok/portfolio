"use client";

import { useRef } from "react";

export default function EmailLink() {
  const textRef = useRef<HTMLSpanElement>(null);
  const EMAIL   = "sabin.shrestha.er@gmail.com";

  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      navigator.clipboard?.writeText(EMAIL).then(() => {
        if (!textRef.current) return;
        textRef.current.textContent = "copied!";
        setTimeout(() => { if (textRef.current) textRef.current.textContent = EMAIL; }, 1800);
      });
    }
  };

  return (
    <a href={`mailto:${EMAIL}`} className="email-link" title="click to open • ctrl+click to copy" onClick={handleClick}>
      <span>✉</span>
      <span ref={textRef}>{EMAIL}</span>
    </a>
  );
}