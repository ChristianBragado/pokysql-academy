"use client";

import React, { useEffect, useState } from "react";

const themeStorageKey = "pokysql-theme-v1";

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
      {isDark ? "☾" : "☀"}
    </button>
  );
}
