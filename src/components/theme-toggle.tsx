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

  const isDark = resolvedTheme === "dark";

  return (
    <label className={styles.switch} suppressHydrationWarning>
      {!mounted ? (
        <div className="w-full h-full bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" />
      ) : (
        <>
          <input 
            type="checkbox" 
            checked={isDark}
            onChange={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          />
          <span className={styles.slider}></span>
          <span className={styles.tooltip}>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </>
      )}
    </label>
  );
}
