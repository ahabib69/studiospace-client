"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState("studioDark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "studioDark");
  }, []);
  function toggle() {
    const next = theme === "studioDark" ? "studioLight" : "studioDark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme =
      next === "studioDark" ? "dark" : "light";
    try {
      localStorage.setItem("studio-theme", next);
    } catch {}
    setTheme(next);
  }
  return (
    <button
      className="btn btn-ghost btn-circle btn-sm"
      onClick={toggle}
      aria-label={`Switch to ${theme === "studioDark" ? "light" : "dark"} theme`}
    >
      {theme === "studioDark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
