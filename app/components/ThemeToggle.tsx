"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        document.documentElement.classList.remove(saved === "light" ? "dark" : "light");
        document.documentElement.classList.add(saved);
        setTheme(saved);
      } else {
        const prefersDark =
          window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        document.documentElement.classList.add(initial);
        setTheme(initial);
      }
    } catch (e) {
      // localStorage might be unavailable in some environments — fall back to prefers-color-scheme
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      document.documentElement.classList.add(initial);
      setTheme(initial);
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (theme) {
      document.documentElement.classList.remove(theme);
    }
    document.documentElement.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch (_) {
      // ignore
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggle}
      className="theme-toggle"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
