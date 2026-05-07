"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.documentElement.classList.add("theme-transitioning");

    const transition = document.startViewTransition(() => {
      // Force Next Themes update to happen synchronously within the transition
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
  };

  return (
    <label className={styles.switch} suppressHydrationWarning>
      {!mounted ? (
        <div className="w-full h-full bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" />
      ) : (
        <>
          <input 
            type="checkbox" 
            checked={isDark}
            onChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <span className={styles.slider}></span>
          <span className={styles.tooltip}>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </>
      )}
    </label>
  );
}
