"use client";

import React, { useEffect, useState } from "react";

const themeStorageKey = "pokysql-theme-v1";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.995 12c0 2.761 2.246 5.007 5.005 5.007s5.005-2.246 5.005-5.007S14.761 6.993 12 6.993 6.995 9.239 6.995 12zm13.002-.5h2v1h-2v-1zM2 11.5h2v1H2v-1zm16.95-6.364l1.414-1.414.707.707-1.414 1.414-.707-.707zM4.93 19.778l-1.414 1.414-.707-.707L4.222 19.07l.707.708zM19.364 19.07l.707-.708 1.414 1.414-.707.707-1.414-1.414zM4.222 4.848L5.636 3.434l.707.707L4.93 5.555l-.707-.707zM12 .5h1v2h-1V.5zM12 20.5h1v2h-1v-2z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      let initial: "light" | "dark";
      try {
        const saved = localStorage.getItem(themeStorageKey);
        if (saved === "light" || saved === "dark") {
          initial = saved;
        } else {
          initial = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }
      } catch {
        const prefersDark =
          window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        initial = prefersDark ? "dark" : "light";
      }

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(initial);
      setTheme(initial);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const toggle = () => {
    const current = theme ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {}
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="theme-toggle"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
