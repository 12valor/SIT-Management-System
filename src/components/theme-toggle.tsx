"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[3.5em] h-[2em] bg-muted rounded-full animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      />
      <span className={styles.slider}></span>
      <span className={styles.tooltip}>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </label>
  );
}
