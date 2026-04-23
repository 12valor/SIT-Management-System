"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";

export function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] hidden sm:block">
      <ThemeToggle />
    </div>
  );
}
