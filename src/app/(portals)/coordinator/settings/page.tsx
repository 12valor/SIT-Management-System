import React from "react";
import { Settings } from "lucide-react";
import { SettingsTabs } from "./SettingsTabs";

export default function SystemControlPage() {
  return (
    <div className="flex-1 space-y-12">
      {/* 1. Header Section */}
      <div className="pb-8 border-b border-border/40">
        <h2 className="text-2xl font-light text-foreground tracking-tight">
          System Control
        </h2>
        <p className="text-[13px] text-foreground/40 mt-2 font-light tracking-wide">
          Administrative terminal for the SIT Management System
        </p>
      </div>

      {/* Generalized Tabbed Interface */}
      <SettingsTabs />
    </div>
  );
}
