"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[84px] h-[34px] bg-muted border border-border" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-[84px] h-[34px] bg-white border border-white overflow-hidden transition-all group"
      aria-label="Toggle Theme"
    >
      {/* Track Background Color Block */}
      <div 
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          isDark ? "translate-x-0" : "-translate-x-full"
        }`}
      />
      
      {/* Sliding Knob (Sharp Rect) */}
      <div 
        className={`absolute top-0 bottom-0 w-1/2 bg-primary transition-transform duration-300 ease-out z-10 ${
          isDark ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Sun Label */}
      <div className={`relative z-20 flex-1 flex items-center justify-center transition-colors duration-300 ${
        isDark ? "text-primary" : "text-white"
      }`}>
        <Sun className="w-3.5 h-3.5" />
      </div>

      {/* Moon Label */}
      <div className={`relative z-20 flex-1 flex items-center justify-center transition-colors duration-300 ${
        isDark ? "text-white" : "text-primary"
      }`}>
        <Moon className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}
